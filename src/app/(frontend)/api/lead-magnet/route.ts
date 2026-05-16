import * as Sentry from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { sendLeadMagnetDelivery } from '@/lib/email/resend'
import { signDownloadToken } from '@/lib/lead-magnet/token'
import { syncSubscriber } from '@/lib/marketing/flodesk'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const runtime = 'nodejs'

const DOWNLOAD_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

type SubmissionInput = {
  email: string
  firstName?: string
  pageSubmittedFrom?: string
  source?: 'lead-magnet' | 'footer-block' | 'blog-inline'
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

  const firstName = optStr(body.firstName)
  if (firstName && firstName.length > 80)
    errors.push({ field: 'firstName', message: 'Name is too long' })

  const sourceRaw = optStr(body.source)
  const allowed = ['lead-magnet', 'footer-block', 'blog-inline'] as const
  const source = (allowed as readonly string[]).includes(sourceRaw ?? '')
    ? (sourceRaw as SubmissionInput['source'])
    : 'lead-magnet'

  return {
    data: {
      email,
      firstName,
      pageSubmittedFrom: optStr(body.pageSubmittedFrom),
      source,
      website: optStr(body.website),
    },
    errors,
  }
}

function buildDownloadUrl(token: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  return `${base}/api/lead-magnet/download?token=${encodeURIComponent(token)}`
}

function pdfRef(value: number | Media | null | undefined): { id: number } | null {
  if (!value) return null
  if (typeof value === 'number') return { id: value }
  return { id: value.id }
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
    return NextResponse.json({ ok: true })
  }

  const userAgent = req.headers.get('user-agent') ?? undefined
  const now = new Date()

  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'lead-magnet-settings', draft: false })

    if (!settings.enabled) {
      return NextResponse.json(
        { ok: false, error: 'Lead magnet is currently disabled' },
        { status: 503 },
      )
    }

    const pdf = pdfRef(settings.pdfFile)
    if (!pdf) {
      return NextResponse.json(
        { ok: false, error: 'Lead magnet is not configured (no PDF uploaded)' },
        { status: 503 },
      )
    }

    // Upsert by email. Subscribers.email is unique — if a row exists, update its
    // signup snapshot and bump deliveryCount. Otherwise create.
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: data.email } },
      limit: 1,
    })

    const tag = settings.flodeskTag || undefined
    const leadMagnetSlug = slugify(settings.title)

    let subscriberId: number
    if (existing.totalDocs > 0 && existing.docs[0]) {
      const current = existing.docs[0]
      subscriberId = current.id
      await payload.update({
        collection: 'subscribers',
        id: current.id,
        data: {
          source: data.source ?? 'lead-magnet',
          leadMagnetSlug,
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
          source: data.source ?? 'lead-magnet',
          leadMagnetSlug,
          tag,
          status: 'pending',
          pageSubmittedFrom: data.pageSubmittedFrom,
          userAgent,
        },
      })
      subscriberId = created.id
    }

    // Best-effort Flodesk sync — no-op when key is missing, captured to Sentry on
    // failure. Subscriber row in Payload is the source of truth either way.
    const flodeskResult = await syncSubscriber({
      email: data.email,
      firstName: data.firstName,
      tag,
      source: data.source ?? 'lead-magnet',
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

    const expiresAt = new Date(now.getTime() + DOWNLOAD_TTL_MS)
    const token = signDownloadToken(
      { sub: subscriberId, m: pdf.id },
      { ttlMs: DOWNLOAD_TTL_MS, now: now.getTime() },
    )
    const downloadUrl = buildDownloadUrl(token)

    try {
      await sendLeadMagnetDelivery({
        to: data.email,
        firstName: data.firstName,
        title: settings.title ?? 'Your guide',
        subtitle: settings.subtitle ?? undefined,
        downloadUrl,
        expiresAt,
      })
      await payload.update({
        collection: 'subscribers',
        id: subscriberId,
        data: {
          status: 'confirmed',
          confirmedAt: now.toISOString(),
          lastDeliveryAt: now.toISOString(),
          deliveryCount: (existing.docs[0]?.deliveryCount ?? 0) + 1,
        },
      })
    } catch (emailErr) {
      Sentry.captureException(emailErr, { tags: { feature: 'lead-magnet-email' } })
      // Subscriber row exists — Maria can resend manually from admin. Surface a
      // soft failure to the popup so the user knows to check spam / retry.
      return NextResponse.json(
        {
          ok: false,
          error:
            'We saved your subscription but the delivery email failed. We will resend shortly.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      message: settings.successMessage ?? 'Check your email for the guide',
    })
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'lead-magnet-submit' } })
    console.error('[lead-magnet] submission failed', err)
    return NextResponse.json(
      { ok: false, error: 'Subscription failed. Please try again.' },
      { status: 500 },
    )
  }
}

function slugify(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || undefined
  )
}
