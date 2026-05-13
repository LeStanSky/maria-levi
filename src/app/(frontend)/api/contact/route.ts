import * as Sentry from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { sendInquiryNotification } from '@/lib/email/resend'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

const BUDGET_VALUES = ['under-500', '500-1000', '1000-2000', '2000-plus', 'not-sure'] as const
const REFERRAL_VALUES = ['google', 'instagram', 'pinterest', 'referral', 'other'] as const

type SubmissionInput = {
  name: string
  email: string
  phone?: string
  sessionType?: string
  preferredDate?: string
  location?: string
  budget?: (typeof BUDGET_VALUES)[number]
  referralSource?: (typeof REFERRAL_VALUES)[number]
  message?: string
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

  const name = str(body.name)
  if (!name) errors.push({ field: 'name', message: 'Name is required' })
  else if (name.length > 120) errors.push({ field: 'name', message: 'Name is too long' })

  const email = str(body.email).toLowerCase()
  if (!email) errors.push({ field: 'email', message: 'Email is required' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push({ field: 'email', message: 'Invalid email' })
  else if (email.length > 254) errors.push({ field: 'email', message: 'Email is too long' })

  const message = optStr(body.message)
  if (message && message.length > 5000)
    errors.push({ field: 'message', message: 'Message is too long' })

  const phone = optStr(body.phone)
  if (phone && phone.length > 40) errors.push({ field: 'phone', message: 'Phone is too long' })

  const budgetRaw = optStr(body.budget)
  const budget =
    budgetRaw && (BUDGET_VALUES as readonly string[]).includes(budgetRaw)
      ? (budgetRaw as (typeof BUDGET_VALUES)[number])
      : undefined

  const referralRaw = optStr(body.referralSource)
  const referralSource =
    referralRaw && (REFERRAL_VALUES as readonly string[]).includes(referralRaw)
      ? (referralRaw as (typeof REFERRAL_VALUES)[number])
      : undefined

  const preferredDateRaw = optStr(body.preferredDate)
  let preferredDate: string | undefined
  if (preferredDateRaw) {
    const d = new Date(preferredDateRaw)
    if (Number.isNaN(d.getTime())) {
      errors.push({ field: 'preferredDate', message: 'Invalid date' })
    } else {
      preferredDate = d.toISOString()
    }
  }

  return {
    data: {
      name,
      email,
      phone,
      sessionType: optStr(body.sessionType),
      preferredDate,
      location: optStr(body.location),
      budget,
      referralSource,
      message,
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
    return NextResponse.json({ ok: true })
  }

  const submittedAt = new Date().toISOString()
  const userAgent = req.headers.get('user-agent') ?? undefined

  try {
    const payload = await getPayloadClient()
    const contactPage = await payload.findGlobal({ slug: 'contact-page', draft: false })
    const inquiriesEmail = contactPage.inquiriesEmail

    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        sessionType: data.sessionType,
        preferredDate: data.preferredDate,
        location: data.location,
        budget: data.budget,
        referralSource: data.referralSource,
        message: data.message,
        pageSubmittedFrom: data.pageSubmittedFrom,
        userAgent,
        submittedAt,
        status: 'new',
      },
    })

    if (inquiriesEmail) {
      await sendInquiryNotification({
        lead,
        to: inquiriesEmail,
        submittedAt,
      })
    } else {
      console.warn('[contact] ContactPage.inquiriesEmail not set — no notification sent')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'contact-submission' } })
    console.error('[contact] submission failed', err)
    return NextResponse.json(
      { ok: false, error: 'Submission failed. Please try again or email directly.' },
      { status: 500 },
    )
  }
}
