import { describe, expect, it } from 'vitest'
import { signDownloadToken, verifyDownloadToken } from '@/lib/lead-magnet/token'

// PAYLOAD_SECRET is loaded by vitest.setup.ts via dotenv. The token lib falls
// back to it when LEAD_MAGNET_TOKEN_SECRET is unset, so the suite runs in any
// env that already has PAYLOAD_SECRET configured.

describe('lead-magnet token', () => {
  it('round-trips a valid token', () => {
    const token = signDownloadToken({ sub: 42, m: 7 })
    const result = verifyDownloadToken(token)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.payload.sub).toBe(42)
      expect(result.payload.m).toBe(7)
      expect(result.payload.exp).toBeGreaterThan(Date.now())
    }
  })

  it('rejects an expired token', () => {
    const past = Date.now() - 1_000
    const token = signDownloadToken({ sub: 1, m: 2 }, { ttlMs: 500, now: past - 1000 })
    const result = verifyDownloadToken(token, past + 1000)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('expired')
  })

  it('rejects a tampered payload', () => {
    const token = signDownloadToken({ sub: 1, m: 2 })
    const [, sig] = token.split('.')
    // Re-encode a different payload, reuse the original signature.
    const forged = `${Buffer.from(
      JSON.stringify({ sub: 999, m: 999, exp: Date.now() + 60_000 }),
    ).toString('base64url')}.${sig}`
    const result = verifyDownloadToken(forged)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('bad-signature')
  })

  it('rejects a malformed token (missing dot)', () => {
    const result = verifyDownloadToken('not-a-valid-token')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('malformed')
  })

  it('rejects empty token parts', () => {
    const result = verifyDownloadToken('.')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('malformed')
  })
})
