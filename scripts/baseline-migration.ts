/**
 * One-shot script to mark the initial migration as "applied" on a DB that
 * already has the full schema (because it was previously synced via
 * `PAYLOAD_DB_PUSH=true`). Use this when bootstrapping migrations against the
 * production Neon branch (or the dev Neon branch) — both of those were
 * push-managed before this PR landed.
 *
 * Idempotent: if `payload_migrations` already has a row for the initial
 * migration, the script is a no-op.
 *
 * Optional cleanup: pass `--drop-orphan-subscribers` to also drop the
 * `subscribers` table and `subscribers_id` column the failed PR-B deploy
 * created on the dev DB. Production push silently no-oped during that deploy,
 * so the orphans never landed in production — but they do exist on dev from
 * local PAYLOAD_DB_PUSH=true runs.
 *
 * Usage:
 *   DATABASE_URL=<target-url> tsx scripts/baseline-migration.ts
 *   DATABASE_URL=<dev-url>    tsx scripts/baseline-migration.ts --drop-orphan-subscribers
 */
import 'dotenv/config'
import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'
import { migrations } from '../src/migrations'
import config from '../src/payload.config'

const INITIAL_MIGRATION_NAME = '20260516_202037_initial'

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required')
    process.exit(1)
  }

  // Sanity check: confirm the migration file we're about to mark-as-applied
  // actually exists in the bundle. Cheap guard against renames.
  const known = migrations.find((m) => m.name === INITIAL_MIGRATION_NAME)
  if (!known) {
    console.error(
      `Initial migration '${INITIAL_MIGRATION_NAME}' is not in src/migrations/index.ts. Refusing to baseline against an unknown name — open the script and update INITIAL_MIGRATION_NAME if the file was renamed.`,
    )
    process.exit(1)
  }

  const dropOrphans = process.argv.includes('--drop-orphan-subscribers')

  const payload = await getPayload({ config })
  const drizzle = (
    payload.db as unknown as { drizzle: { execute: (q: unknown) => Promise<unknown> } }
  ).drizzle

  console.info('[baseline] ensuring payload_migrations table exists...')
  await drizzle.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)
  await drizzle.execute(
    sql`CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at")`,
  )
  await drizzle.execute(
    sql`CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at")`,
  )

  const existing = (await drizzle.execute(
    sql`SELECT name FROM payload_migrations WHERE name = ${INITIAL_MIGRATION_NAME} LIMIT 1`,
  )) as { rows?: unknown[] }

  const rowCount = existing.rows?.length ?? 0

  if (rowCount > 0) {
    console.info(
      `[baseline] migration '${INITIAL_MIGRATION_NAME}' is already marked applied — nothing to do.`,
    )
  } else {
    console.info(`[baseline] inserting baseline row for '${INITIAL_MIGRATION_NAME}'...`)
    await drizzle.execute(
      sql`INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES (${INITIAL_MIGRATION_NAME}, 1, now(), now())`,
    )
    console.info('[baseline] inserted.')
  }

  if (dropOrphans) {
    console.info('[baseline] --drop-orphan-subscribers: cleaning up PR-B leftovers...')
    await drizzle.execute(
      sql`ALTER TABLE IF EXISTS payload_locked_documents_rels DROP COLUMN IF EXISTS subscribers_id`,
    )
    await drizzle.execute(sql`DROP TABLE IF EXISTS subscribers CASCADE`)
    console.info('[baseline] orphan cleanup complete.')
  }

  console.info('\n[baseline] done. Verify with `pnpm payload:migrate:status`.')
  process.exit(0)
}

main().catch((err) => {
  console.error('[baseline] failed:', err)
  process.exit(1)
})
