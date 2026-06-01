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
 * Also unconditionally clears the `(name='dev', batch=-1)` marker that
 * `pushDevSchema` inserts when a DB was previously synced via PAYLOAD_DB_PUSH.
 * Payload's `migrate()` (which runs on Postgres adapter connect in
 * NODE_ENV=production when `prodMigrations` is set) sees that row and asks
 * "It looks like you've run Payload in dev mode... data loss will occur.
 * Would you like to proceed?" — hanging `next build` on Vercel preview deploys
 * that share the prod DATABASE_URL. After the baseline INSERT below the DB has
 * "graduated" from push-managed to migration-managed, so the dev marker is
 * stale and safe to drop.
 *
 * Usage:
 *   DATABASE_URL=<target-url> tsx scripts/baseline-migration.ts
 *
 * Note: a `--drop-orphan-subscribers` flag lived here during the v0.9.0
 * lead-magnet rollout to clean up a stale `subscribers` table left by a
 * failed deploy. Subscribers is now a fully-migrated active collection
 * (migration `20260517_122022_lead_magnet_subscribers`), so the flag was
 * removed — running it today would drop the production subscribers table.
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

  // Drop the stale dev-push marker so Payload's migrate() doesn't prompt
  // "It looks like you've run Payload in dev mode..." on production-mode
  // connects (Vercel build, prod deploy). Idempotent.
  const devMarker = (await drizzle.execute(
    sql`DELETE FROM payload_migrations WHERE name = 'dev' AND batch = -1 RETURNING id`,
  )) as { rows?: unknown[] }
  const droppedDevMarker = devMarker.rows?.length ?? 0
  if (droppedDevMarker > 0) {
    console.info(`[baseline] removed stale dev-push marker (${droppedDevMarker} row).`)
  } else {
    console.info('[baseline] no dev-push marker found — nothing to remove.')
  }

  console.info('\n[baseline] done. Verify with `pnpm payload:migrate:status`.')
  process.exit(0)
}

main().catch((err) => {
  console.error('[baseline] failed:', err)
  process.exit(1)
})
