// Connection-level failures worth retrying. Neon Free-tier scale-to-zero suspends
// the prod compute after 5 min idle; the first query after a suspend can time out
// while the compute wakes (`Connection terminated due to connection timeout`) or
// have its socket dropped mid-flight (`Connection terminated unexpectedly`),
// failing an in-flight read (Sentry MARIA-LEVI-17/18). ECONNRESET is the same
// class. Query/logic errors must NOT match — we only retry the transport dying.
const TRANSIENT_DB_ERROR = /Connection terminated|connection timeout|ECONNRESET/i

// Drizzle wraps the driver error in a `DrizzleQueryError` whose message is
// "Failed query: …" and stashes the real pg error on `.cause`, so we walk the
// cause chain rather than testing the top-level message alone.
export function isTransientDbError(err: unknown): boolean {
  let current: unknown = err
  for (let depth = 0; depth < 5 && current instanceof Error; depth++) {
    if (TRANSIENT_DB_ERROR.test(current.message)) return true
    current = (current as { cause?: unknown }).cause
  }
  return false
}

/**
 * Retry an idempotent read through a transient Neon connection failure. The
 * failed first attempt is what triggers the compute wake, so a short backoff
 * and a re-run almost always lands on the now-awake pool — turning a cold-start
 * error into a slightly slower success. Read-only by contract: never wrap a
 * write, and only pass functions safe to run more than once.
 *
 * `connectionTimeoutMillis` (payload.config) stays at 15s deliberately: with up
 * to 3 attempts, a longer per-attempt timeout could push a truly-dead-DB request
 * past Vercel's function limit. Bounded retries beat one long timeout here.
 */
export async function withDbRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt >= retries || !isTransientDbError(err)) throw err
      await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)))
    }
  }
}
