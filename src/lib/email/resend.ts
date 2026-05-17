import * as Sentry from '@sentry/nextjs'
import { Resend } from 'resend'
import type { Lead } from '@/payload-types'

export const FROM_EMAIL = 'Maria Levi <hello@marialeviphoto.com>'

let client: Resend | null = null

function getClient(): Resend | null {
  if (client) return client
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  client = new Resend(key)
  return client
}

type InquiryEmailInput = {
  lead: Pick<
    Lead,
    | 'name'
    | 'email'
    | 'phone'
    | 'sessionType'
    | 'preferredDate'
    | 'location'
    | 'budget'
    | 'referralSource'
    | 'message'
    | 'pageSubmittedFrom'
  >
  to: string
  submittedAt: string
}

export async function sendInquiryNotification(input: InquiryEmailInput): Promise<void> {
  const resend = getClient()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY missing — skipping notification')
    return
  }

  const { lead, to, submittedAt } = input
  const subject = `New inquiry from ${lead.name}`

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: lead.email,
      subject,
      html: renderInquiryHtml(lead, submittedAt),
      text: renderInquiryText(lead, submittedAt),
    })
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.message}`)
    }
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'contact-email' } })
    console.error('[email] sendInquiryNotification failed', err)
  }
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return ''
  return `<tr><td style="padding:6px 12px 6px 0;color:#8e8b83;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#131311;font-size:14px;">${escapeHtml(value)}</td></tr>`
}

function renderInquiryHtml(lead: InquiryEmailInput['lead'], submittedAt: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f7f6f3;font-family:'Inter',Helvetica,Arial,sans-serif;color:#131311;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #eae8e2;max-width:560px;width:100%;">
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 24px;font-family:'Fraunces',Georgia,serif;font-weight:300;font-size:24px;letter-spacing:-0.02em;color:#131311;">New inquiry from ${escapeHtml(lead.name)}</h1>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${row('Email', lead.email)}
            ${row('Phone', lead.phone)}
            ${row('Session type', lead.sessionType)}
            ${row('Preferred date', lead.preferredDate ? formatDate(lead.preferredDate) : null)}
            ${row('Location', lead.location)}
            ${row('Budget', lead.budget)}
            ${row('Referral source', lead.referralSource)}
            ${row('Submitted from', lead.pageSubmittedFrom)}
            ${row('Submitted at', formatDate(submittedAt))}
          </table>
          ${
            lead.message
              ? `<div style="margin-top:24px;padding-top:24px;border-top:1px solid #eae8e2;">
                  <div style="color:#8e8b83;font-size:13px;margin-bottom:8px;">Message</div>
                  <div style="color:#131311;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</div>
                </div>`
              : ''
          }
          <p style="margin:32px 0 0;color:#8e8b83;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(lead.name)}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function renderInquiryText(lead: InquiryEmailInput['lead'], submittedAt: string): string {
  const lines = [
    `New inquiry from ${lead.name}`,
    '',
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.sessionType ? `Session type: ${lead.sessionType}` : null,
    lead.preferredDate ? `Preferred date: ${formatDate(lead.preferredDate)}` : null,
    lead.location ? `Location: ${lead.location}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.referralSource ? `Referral source: ${lead.referralSource}` : null,
    lead.pageSubmittedFrom ? `Submitted from: ${lead.pageSubmittedFrom}` : null,
    `Submitted at: ${formatDate(submittedAt)}`,
  ].filter(Boolean)

  if (lead.message) {
    lines.push('', 'Message:', lead.message)
  }
  lines.push('', `Reply directly to this email to respond to ${lead.name}.`)
  return lines.join('\n')
}

function formatDate(value: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  })
}

type LeadMagnetEmailInput = {
  to: string
  firstName?: string
  title: string
  subtitle?: string
  downloadUrl: string
  expiresAt: Date
}

export async function sendLeadMagnetDelivery(input: LeadMagnetEmailInput): Promise<void> {
  const resend = getClient()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY missing — skipping lead-magnet delivery')
    return
  }

  const subject = input.title ? `Your guide: ${input.title}` : 'Your guide is ready'

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: input.to,
      replyTo: FROM_EMAIL,
      subject,
      html: renderLeadMagnetHtml(input),
      text: renderLeadMagnetText(input),
    })
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.message}`)
    }
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'lead-magnet-email' } })
    console.error('[email] sendLeadMagnetDelivery failed', err)
    throw err
  }
}

function renderLeadMagnetHtml(input: LeadMagnetEmailInput): string {
  const greeting = input.firstName ? `Hi ${escapeHtml(input.firstName)},` : 'Hi,'
  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f7f6f3;font-family:'Inter',Helvetica,Arial,sans-serif;color:#131311;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #eae8e2;max-width:560px;width:100%;">
        <tr><td style="padding:40px 32px;">
          <h1 style="margin:0 0 24px;font-family:'Fraunces',Georgia,serif;font-weight:300;font-size:24px;letter-spacing:-0.02em;color:#131311;">${escapeHtml(input.title)}</h1>
          <p style="margin:0 0 16px;color:#4f4d48;font-size:15px;line-height:1.6;">${greeting}</p>
          <p style="margin:0 0 24px;color:#4f4d48;font-size:15px;line-height:1.6;">${
            input.subtitle
              ? escapeHtml(input.subtitle)
              : 'Thanks for subscribing — your guide is ready to download.'
          }</p>
          <p style="margin:0 0 32px;">
            <a href="${escapeAttr(input.downloadUrl)}" style="display:inline-block;background:#131311;color:#ffffff;padding:14px 28px;text-decoration:none;font-size:14px;letter-spacing:0.04em;">Download the guide</a>
          </p>
          <p style="margin:0;color:#8e8b83;font-size:12px;line-height:1.5;">This link expires on ${escapeHtml(formatDate(input.expiresAt.toISOString()))}. If you need it again, just reply to this email.</p>
          <p style="margin:24px 0 0;color:#8e8b83;font-size:12px;line-height:1.5;">— Maria</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function renderLeadMagnetText(input: LeadMagnetEmailInput): string {
  const greeting = input.firstName ? `Hi ${input.firstName},` : 'Hi,'
  return [
    input.title,
    '',
    greeting,
    input.subtitle ?? 'Thanks for subscribing — your guide is ready to download.',
    '',
    `Download: ${input.downloadUrl}`,
    `Link expires: ${formatDate(input.expiresAt.toISOString())}`,
    '',
    '— Maria',
  ].join('\n')
}

function escapeAttr(value: string): string {
  return escapeHtml(value)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
