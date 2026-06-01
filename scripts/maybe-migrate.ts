/**
 * Runs `payload migrate` during Vercel production AND preview deploys.
 *
 * Why this is conditional:
 * - Production deploys: apply pending migrations against the prod Neon branch
 *   so schema lands before the new bundle starts serving requests.
 * - Preview deploys: run migrate against the preview Neon branch (separate
 *   from prod since the preview-DB split) — exercises the exact migrate flow
 *   prod will run, on a branch where breakage is recoverable. This is what
 *   makes preview an honest rehearsal for prod.
 * - Local `pnpm build`: would clobber whichever DB the developer is connected
 *   to with no warning. Skip.
 * - CI builds: CI workflow runs `pnpm payload:migrate` explicitly against its
 *   own Postgres service container before invoking `pnpm build`, so the
 *   prebuild hook is a no-op there. Skip.
 *
 * Override with `FORCE_MIGRATE=true` if you really need to run it from another
 * env (rare).
 *
 * On a DB that was previously push-managed, Payload 3.84 may detect "dev push
 * drift" and prompt "...data loss will occur. Would you like to proceed?"
 * even when there's nothing pending. Pipe `y\n` to stdin as a belt-and-braces
 * fix; `scripts/baseline-migration.ts` removes the underlying marker for any
 * DB graduating from push to migrations.
 */
import 'dotenv/config'
import { spawn } from 'node:child_process'
import { Client } from 'pg'

const env = process.env.VERCEL_ENV
const force = process.env.FORCE_MIGRATE === 'true'
const runsMigrate = env === 'production' || env === 'preview' || force

if (!runsMigrate) {
  // Local `pnpm build` against a push-managed dev DB hits Payload's
  // "It looks like you've run Payload in dev mode..." prompt during static
  // generation — `next build` sets NODE_ENV=production which triggers
  // migrate() inside payload init, and migrate() sees the
  // `(name='dev', batch=-1)` marker that `pushDevSchema` left behind.
  // Drop it here so the build proceeds without a 21-worker prompt jam.
  await dropDevMarker()

  console.info(
    `[prebuild] VERCEL_ENV=${env ?? '<unset>'} — skipping payload migrate (only runs for production/preview deploys, or FORCE_MIGRATE=true).`,
  )
  process.exit(0)
}

async function dropDevMarker() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.info('[prebuild] no DATABASE_URL — skipping dev-marker check.')
    return
  }
  const client = new Client({ connectionString: url })
  try {
    await client.connect()
    // Skip on a DB that doesn't have the table yet — first run.
    const tbl = await client.query(
      `SELECT 1 FROM information_schema.tables WHERE table_name = 'payload_migrations' LIMIT 1`,
    )
    if (tbl.rowCount === 0) return
    const res = await client.query(
      `DELETE FROM payload_migrations WHERE name = 'dev' AND batch = -1`,
    )
    if (res.rowCount && res.rowCount > 0) {
      console.info(`[prebuild] dropped ${res.rowCount} stale dev-push marker(s).`)
    }
  } catch (err) {
    // Network / auth issues shouldn't block dev builds — log and move on.
    console.warn(`[prebuild] dev-marker cleanup skipped: ${(err as Error).message}`)
  } finally {
    await client.end().catch(() => {})
  }
}

console.info(
  `[prebuild] VERCEL_ENV=${env ?? '<unset>'}${force ? ' (forced)' : ''} — running payload migrate...`,
)

const child = spawn('pnpm', ['payload:migrate'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
  env: { ...process.env, PAYLOAD_DB_PUSH: 'false' },
})

child.stdin?.write('y\n')
child.stdin?.end()

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`[prebuild] payload migrate failed with exit code ${code}`)
    process.exit(code ?? 1)
  }
  console.info('[prebuild] payload migrate succeeded.')
  process.exit(0)
})
