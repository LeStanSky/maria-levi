import { createHmac, timingSafeEqual } from 'node:crypto'

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export type DownloadTokenPayload = {
  /** Numeric ID of the Subscribers doc that the link was issued to. */
  sub: number
  /** Numeric ID of the Media doc holding the PDF at issue time. */
  m: number
  /** Expiry as a Unix ms timestamp. */
  exp: number
}

export type VerifyResult =
  | { ok: true; payload: DownloadTokenPayload }
  | { ok: false; reason: 'malformed' | 'bad-signature' | 'expired' }

/**
 * Issue a signed download token. Payload is encoded base64url and signed with
 * HMAC-SHA256 over `<payload>.<expiry>` using LEAD_MAGNET_TOKEN_SECRET (falls
 * back to PAYLOAD_SECRET so the token always has *some* secret behind it in dev
 * without extra env wiring).
 */
export function signDownloadToken(
  input: Omit<DownloadTokenPayload, 'exp'>,
  options?: { ttlMs?: number; now?: number },
): string {
  const now = options?.now ?? Date.now()
  const ttl = options?.ttlMs ?? DEFAULT_TTL_MS
  const payload: DownloadTokenPayload = { ...input, exp: now + ttl }
  const body = encode(JSON.stringify(payload))
  const sig = sign(body)
  return `${body}.${sig}`
}

export function verifyDownloadToken(token: string, now: number = Date.now()): VerifyResult {
  const parts = token.split('.')
  if (parts.length !== 2) return { ok: false, reason: 'malformed' }
  const [body, providedSig] = parts
  if (!body || !providedSig) return { ok: false, reason: 'malformed' }

  const expectedSig = sign(body)
  const expectedBuf = Buffer.from(expectedSig)
  const providedBuf = Buffer.from(providedSig)
  if (expectedBuf.length !== providedBuf.length) return { ok: false, reason: 'bad-signature' }
  if (!timingSafeEqual(expectedBuf, providedBuf)) return { ok: false, reason: 'bad-signature' }

  let payload: DownloadTokenPayload
  try {
    payload = JSON.parse(decode(body)) as DownloadTokenPayload
  } catch {
    return { ok: false, reason: 'malformed' }
  }

  if (
    typeof payload.sub !== 'number' ||
    typeof payload.m !== 'number' ||
    typeof payload.exp !== 'number'
  ) {
    return { ok: false, reason: 'malformed' }
  }

  if (payload.exp < now) return { ok: false, reason: 'expired' }

  return { ok: true, payload }
}

function getSecret(): string {
  const secret = process.env.LEAD_MAGNET_TOKEN_SECRET || process.env.PAYLOAD_SECRET
  if (!secret) {
    throw new Error(
      'LEAD_MAGNET_TOKEN_SECRET (or PAYLOAD_SECRET) must be set to sign lead-magnet tokens',
    )
  }
  return secret
}

function sign(body: string): string {
  return createHmac('sha256', getSecret()).update(body).digest('base64url')
}

function encode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function decode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8')
}
