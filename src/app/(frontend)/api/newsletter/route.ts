import * as Sentry from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { syncSubscriber } from '@/lib/marketing/flodesk'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

type SubmissionInput = {
  email: string
  pageSubmittedFrom?: string
  /** Honeypot — must be empty. */
  website?: string
}

type ValidationError = { field: string; message: string }

function validate(raw: unknown): { data: SubmissionInput; errors: ValidationError[] } {
  const errors: ValidationError[] = []
  const body = (raw ?? {}) as Record<string, unknown>

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const optStr = (v: unknown) => {
    const s = str(v)
    return s.length === 0 ? undefined : s
  }

  const email = str(body.email).toLowerCase()
  if (!email) errors.push({ field: 'email', message: 'Email is required' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push({ field: 'email', message: 'Invalid email' })
  else if (email.length > 254) errors.push({ field: 'email', message: 'Email is too long' })

  return {
    data: {
      email,
      pageSubmittedFrom: optStr(body.pageSubmittedFrom),
      website: optStr(body.website),
    },
    errors,
  }
}

export async function POST(req: NextRequest) {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { data, errors } = validate(raw)
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // Honeypot — pretend success so bots don't retry, but never persist.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true, message: 'Subscribed.' })
  }

  const userAgent = req.headers.get('user-agent') ?? undefined
  const tag = process.env.FLODESK_NEWSLETTER_TAG || undefined

  try {
    const payload = await getPayloadClient()

    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: data.email } },
      limit: 1,
    })

    let subscriberId: number
    if (existing.totalDocs > 0 && existing.docs[0]) {
      const current = existing.docs[0]
      subscriberId = current.id
      await payload.update({
        collection: 'subscribers',
        id: current.id,
        data: {
          source: 'newsletter',
          tag,
          pageSubmittedFrom: data.pageSubmittedFrom ?? current.pageSubmittedFrom ?? undefined,
          userAgent: userAgent ?? current.userAgent ?? undefined,
        },
      })
    } else {
      const created = await payload.create({
        collection: 'subscribers',
        data: {
          email: data.email,
          source: 'newsletter',
          tag,
          status: 'pending',
          pageSubmittedFrom: data.pageSubmittedFrom,
          userAgent,
        },
      })
      subscriberId = created.id
    }

    // Flodesk handles double opt-in itself. We just sync the contact + tag.
    const flodeskResult = await syncSubscriber({
      email: data.email,
      tag,
      source: 'newsletter',
    })
    await payload.update({
      collection: 'subscribers',
      id: subscriberId,
      data: {
        flodeskSyncStatus:
          flodeskResult.status === 'synced'
            ? 'synced'
            : flodeskResult.status === 'skipped'
              ? 'skipped'
              : 'failed',
        flodeskExternalId: flodeskResult.status === 'synced' ? flodeskResult.externalId : undefined,
      },
    })

    return NextResponse.json({ ok: true, message: 'Subscribed.' })
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'newsletter-submit' } })
    console.error('[newsletter] submission failed', err)
    return NextResponse.json(
      { ok: false, error: 'Subscription failed. Please try again.' },
      { status: 500 },
    )
  }
}
