import * as Sentry from '@sentry/nextjs'

export type FlodeskSyncInput = {
  email: string
  firstName?: string
  tag?: string
  source?: string
}

export type FlodeskSyncResult =
  | { status: 'synced'; externalId?: string }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string }

const FLODESK_API_BASE = 'https://api.flodesk.com/v1'

/**
 * Upsert a subscriber in Flodesk and optionally apply a tag.
 *
 * No-op when FLODESK_API_KEY is unset — returns `skipped`. When the key is set,
 * call Flodesk's Subscribers API (basic auth, base64 of `key:`) and tag the
 * subscriber if `tag` is provided.
 *
 * Failures are captured to Sentry and returned as `failed` — the caller decides
 * whether to surface this to the user. The Payload Subscribers collection is the
 * authoritative store; Flodesk is the marketing destination.
 */
export async function syncSubscriber(input: FlodeskSyncInput): Promise<FlodeskSyncResult> {
  const apiKey = process.env.FLODESK_API_KEY
  if (!apiKey) {
    return { status: 'skipped', reason: 'FLODESK_API_KEY not set' }
  }

  const auth = Buffer.from(`${apiKey}:`).toString('base64')
  const headers = {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
    'User-Agent': 'marialeviphoto.com (Subscribers sync)',
  }

  try {
    const upsertRes = await fetch(`${FLODESK_API_BASE}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: input.email,
        first_name: input.firstName,
        source: input.source ?? 'marialeviphoto.com',
      }),
    })

    if (!upsertRes.ok) {
      const text = await safeText(upsertRes)
      throw new Error(`Flodesk subscribe ${upsertRes.status}: ${text}`)
    }

    const data = (await upsertRes.json().catch(() => null)) as { data?: { id?: string } } | null
    const externalId = data?.data?.id

    if (input.tag && externalId) {
      const segmentsRes = await fetch(
        `${FLODESK_API_BASE}/subscribers/${encodeURIComponent(input.email)}/segments`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ segment_ids: [input.tag] }),
        },
      )
      if (!segmentsRes.ok) {
        const text = await safeText(segmentsRes)
        // Tag failure is non-fatal — the subscriber is already created.
        Sentry.captureMessage(`Flodesk tag failed ${segmentsRes.status}: ${text}`, {
          level: 'warning',
          tags: { feature: 'lead-magnet-flodesk' },
        })
      }
    }

    return { status: 'synced', externalId }
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'lead-magnet-flodesk' } })
    return { status: 'failed', reason: err instanceof Error ? err.message : String(err) }
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text()
  } catch {
    return '<no body>'
  }
}
