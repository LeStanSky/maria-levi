import type { NextRequest } from 'next/server'
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { sendInquiryNotification } from '@/lib/email/resend'
import config from '@/payload.config'

type SendInquiryArgs = Parameters<typeof sendInquiryNotification>[0]

const sendInquiryMock = vi.fn<(args: SendInquiryArgs) => Promise<void>>(async () => undefined)
vi.mock('@/lib/email/resend', () => ({
  sendInquiryNotification: sendInquiryMock,
  FROM_EMAIL: 'Maria Levi <hello@marialeviphoto.com>',
}))

// Import POST after the mock is registered.
const routeImport = import('@/app/(frontend)/api/contact/route')

let payload: Payload
let POST: (req: NextRequest) => Promise<Response>

const TEST_INBOX = 'tests-int-contact@example.test'

let originalInquiriesEmail: string | null | undefined
let originalHeadline: string | null | undefined

async function callRoute(body: unknown): Promise<{ status: number; json: unknown }> {
  const req = new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'vitest' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
  const res = await POST(req as unknown as NextRequest)
  return { status: res.status, json: await res.json() }
}

async function cleanupTestLeads() {
  await payload.delete({
    collection: 'leads',
    where: { email: { contains: 'integration-test' } },
  })
}

describe('POST /api/contact', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    // Snapshot the original ContactPage state so we can restore it after the run.
    // Headline is required, so we set a placeholder if the global is fresh.
    const current = await payload.findGlobal({ slug: 'contact-page', draft: false })
    originalInquiriesEmail = current.inquiriesEmail
    originalHeadline = current.headline
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        inquiriesEmail: TEST_INBOX,
        headline: current.headline ?? 'Test Contact',
      },
    })

    const mod = (await routeImport) as unknown as { POST: typeof POST }
    POST = mod.POST
  })

  beforeEach(async () => {
    sendInquiryMock.mockClear()
    await cleanupTestLeads()
  })

  afterAll(async () => {
    await cleanupTestLeads()
    if (originalInquiriesEmail || originalHeadline) {
      await payload.updateGlobal({
        slug: 'contact-page',
        data: {
          inquiriesEmail: originalInquiriesEmail ?? undefined,
          headline: originalHeadline ?? undefined,
        },
      })
    }
  })

  it('rejects missing name and invalid email with 400 + field errors', async () => {
    const { status, json } = await callRoute({ name: '', email: 'not-an-email' })
    expect(status).toBe(400)
    expect(json).toMatchObject({ ok: false })
    const fields = ((json as { errors: Array<{ field: string }> }).errors ?? []).map((e) => e.field)
    expect(fields).toContain('name')
    expect(fields).toContain('email')
    expect(sendInquiryMock).not.toHaveBeenCalled()
  })

  it('rejects malformed JSON with 400', async () => {
    const { status, json } = await callRoute('{ not json')
    expect(status).toBe(400)
    expect(json).toMatchObject({ ok: false, error: 'Invalid JSON' })
  })

  it('accepts a valid submission, persists Lead, and sends notification', async () => {
    const submission = {
      name: 'Integration Test',
      email: 'integration-test+ok@example.test',
      phone: '+1 555 0100',
      sessionType: 'Personal Brand Photography',
      preferredDate: '2026-08-15',
      location: 'Hoboken, NJ',
      budget: '1000-2000',
      referralSource: 'instagram',
      message: 'Looking for a personal brand session in late summer.',
      pageSubmittedFrom: '/contact',
    }

    const { status, json } = await callRoute(submission)
    expect(status).toBe(200)
    expect(json).toEqual({ ok: true })

    const leads = await payload.find({
      collection: 'leads',
      where: { email: { equals: submission.email } },
    })
    expect(leads.totalDocs).toBe(1)
    const lead = leads.docs[0]
    expect(lead.name).toBe(submission.name)
    expect(lead.budget).toBe('1000-2000')
    expect(lead.referralSource).toBe('instagram')
    expect(lead.userAgent).toBe('vitest')
    expect(lead.status).toBe('new')

    expect(sendInquiryMock).toHaveBeenCalledTimes(1)
    const arg = sendInquiryMock.mock.calls[0]?.[0]
    expect(arg?.to).toBe(TEST_INBOX)
    expect(arg?.lead.email).toBe(submission.email)
  })

  it('silently drops honeypot submissions without persisting or notifying', async () => {
    const { status, json } = await callRoute({
      name: 'Bot',
      email: 'integration-test+bot@example.test',
      website: 'https://spammy.example',
      message: 'buy cheap stuff',
    })
    expect(status).toBe(200)
    expect(json).toEqual({ ok: true })

    const leads = await payload.find({
      collection: 'leads',
      where: { email: { equals: 'integration-test+bot@example.test' } },
    })
    expect(leads.totalDocs).toBe(0)
    expect(sendInquiryMock).not.toHaveBeenCalled()
  })

  it('rejects invalid preferredDate with field error', async () => {
    const { status, json } = await callRoute({
      name: 'Date Tester',
      email: 'integration-test+date@example.test',
      preferredDate: 'not-a-date',
    })
    expect(status).toBe(400)
    const fields = ((json as { errors: Array<{ field: string }> }).errors ?? []).map((e) => e.field)
    expect(fields).toContain('preferredDate')
    expect(sendInquiryMock).not.toHaveBeenCalled()
  })

  it('normalises email to lowercase before persisting', async () => {
    const { status } = await callRoute({
      name: 'Case Tester',
      email: 'Integration-Test+CASE@Example.TEST',
    })
    expect(status).toBe(200)

    const leads = await payload.find({
      collection: 'leads',
      where: { email: { equals: 'integration-test+case@example.test' } },
    })
    expect(leads.totalDocs).toBe(1)
  })
})
