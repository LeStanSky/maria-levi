/**
 * Runs `payload migrate` *only* during Vercel production deploys.
 *
 * Why this is conditional:
 * - Production deploys: apply pending migrations against the prod Neon branch
 *   so schema lands before the new bundle starts serving requests.
 * - Preview deploys: today they share the prod `DATABASE_URL` (no per-branch
 *   override yet — techdebt). Running migrate from a preview build would
 *   trigger schema changes that the prod runtime isn't ready for. Skip.
 * - Local `pnpm build`: would clobber whichever DB the developer is connected
 *   to with no warning. Skip.
 * - CI builds: CI workflow runs `pnpm payload:migrate` explicitly against its
 *   own Postgres service container before invoking `pnpm build`, so the
 *   prebuild hook is a no-op there. Skip.
 *
 * Override with `FORCE_MIGRATE=true` if you really need to run it from another
 * env (rare).
 *
 * On the prod DB, the first time `payload migrate` runs after the baseline
 * marker is inserted, Payload detects "dev push drift" and asks
 *   "...data loss will occur. Would you like to proceed? (y/N)"
 * even when there's nothing pending. The `--forceAcceptWarning` flag silences
 * this in some Payload v3 versions but is unreliable in 3.84 — pipe `y\n` to
 * stdin as a belt-and-braces fix that works regardless of the flag's status.
 */
import { spawn } from 'node:child_process'

const env = process.env.VERCEL_ENV
const force = process.env.FORCE_MIGRATE === 'true'

if (env !== 'production' && !force) {
  console.info(
    `[prebuild] VERCEL_ENV=${env ?? '<unset>'} — skipping payload migrate (only runs for production deploys, or FORCE_MIGRATE=true).`,
  )
  process.exit(0)
}

console.info(
  `[prebuild] VERCEL_ENV=${env ?? '<unset>'}${force ? ' (forced)' : ''} — running payload migrate...`,
)

const child = spawn('pnpm', ['payload:migrate'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
  env: { ...process.env, PAYLOAD_DB_PUSH: 'false' },
})

// Auto-accept the dev-push drift warning if Payload still asks despite the
// flag (3.84 prompts even on no-op runs immediately after baseline-mark).
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
