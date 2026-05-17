// @vitest-environment node
import type { NextRequest } from 'next/server'
import { getPayload, type Payload } from 'payload'
import sharp from 'sharp'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { sendLeadMagnetDelivery } from '@/lib/email/resend'
import config from '@/payload.config'

type SendArgs = Parameters<typeof sendLeadMagnetDelivery>[0]

const sendMock = vi.fn<(args: SendArgs) => Promise<void>>(async () => undefined)
vi.mock('@/lib/email/resend', () => ({
  sendLeadMagnetDelivery: sendMock,
  sendInquiryNotification: vi.fn(async () => undefined),
  FROM_EMAIL: 'Maria Levi <hello@marialeviphoto.com>',
}))

const flodeskMock = vi.fn(async () => ({ status: 'skipped' as const, reason: 'test' }))
vi.mock('@/lib/marketing/flodesk', () => ({
  syncSubscriber: flodeskMock,
}))

const routeImport = import('@/app/(frontend)/api/lead-magnet/route')

let payload: Payload
let POST: (req: NextRequest) => Promise<Response>
let pdfMediaId: number
let createdMediaForTest = false

let originalEnabled: boolean | null | undefined
let originalTitle: string | null | undefined
let originalPdf: number | { id: number } | null | undefined

async function callRoute(body: unknown): Promise<{ status: number; json: unknown }> {
  const req = new Request('http://localhost:3000/api/lead-magnet', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'vitest' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
  const res = await POST(req as unknown as NextRequest)
  return { status: res.status, json: await res.json() }
}

async function cleanupTestSubscribers() {
  await payload.delete({
    collection: 'subscribers',
    where: { email: { contains: 'lead-magnet-test' } },
  })
}

describe('POST /api/lead-magnet', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    // The route only consumes media.id from settings.pdfFile (the download
    // route, which would read media.url, isn't exercised here). Reuse an
    // existing seeded Media doc if available; otherwise synthesise a tiny PNG
    // through Sharp so Payload's upload pipeline accepts it.
    const existingMedia = await payload.find({ collection: 'media', limit: 1 })
    if (existingMedia.totalDocs > 0 && existingMedia.docs[0]) {
      pdfMediaId = existingMedia.docs[0].id
    } else {
      // Source must satisfy all 3 imageSizes (largest is hero 2000×1200) — Sharp
      // refuses to upscale by default, so generate a 2500×1500 white canvas.
      const pngBuffer = await sharp({
        create: { width: 2500, height: 1500, channels: 3, background: '#ffffff' },
      })
        .png()
        .toBuffer()
      const created = await payload.create({
        collection: 'media',
        data: { alt: 'Test lead magnet placeholder (integration)' },
        file: {
          data: pngBuffer,
          mimetype: 'image/png',
          name: 'lead-magnet-test.png',
          size: pngBuffer.length,
        },
      })
      pdfMediaId = created.id
      createdMediaForTest = true
    }

    // Snapshot + configure LeadMagnetSettings for the run.
    const current = await payload.findGlobal({ slug: 'lead-magnet-settings', draft: false })
    originalEnabled = current.enabled
    originalTitle = current.title
    originalPdf =
      typeof current.pdfFile === 'object' && current.pdfFile !== null
        ? { id: current.pdfFile.id }
        : (current.pdfFile ?? null)

    await payload.updateGlobal({
      slug: 'lead-magnet-settings',
      data: {
        enabled: true,
        title: 'What to Wear for Your Branding Shoot (test)',
        subtitle: 'Test subtitle',
        pdfFile: pdfMediaId,
        placement: ['popup'],
        trigger: 'delay-30s',
        successMessage: 'Check your email for the guide',
      },
    })

    const mod = (await routeImport) as unknown as { POST: typeof POST }
    POST = mod.POST
  })

  beforeEach(async () => {
    sendMock.mockClear()
    flodeskMock.mockClear()
    await cleanupTestSubscribers()
  })

  afterAll(async () => {
    await cleanupTestSubscribers()
    // Restore the original global so we don't leave the dev DB in a weird state.
    await payload.updateGlobal({
      slug: 'lead-magnet-settings',
      data: {
        enabled: originalEnabled ?? false,
        title: originalTitle ?? undefined,
        pdfFile:
          typeof originalPdf === 'object' && originalPdf !== null
            ? originalPdf.id
            : (originalPdf ?? null),
      },
    })
    if (createdMediaForTest && pdfMediaId) {
      await payload.delete({ collection: 'media', id: pdfMediaId }).catch(() => undefined)
    }
  })

  it('rejects missing email with 400 + field errors', async () => {
    const { status, json } = await callRoute({ email: '' })
    expect(status).toBe(400)
    const fields = ((json as { errors: Array<{ field: string }> }).errors ?? []).map((e) => e.field)
    expect(fields).toContain('email')
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects malformed JSON with 400', async () => {
    const { status, json } = await callRoute('{ not json')
    expect(status).toBe(400)
    expect(json).toMatchObject({ ok: false, error: 'Invalid JSON' })
  })

  it('accepts a valid submission, persists Subscriber, fires delivery email', async () => {
    const { status, json } = await callRoute({
      email: 'lead-magnet-test+ok@example.test',
      firstName: 'Tester',
      pageSubmittedFrom: '/about',
    })
    expect(status).toBe(200)
    expect(json).toMatchObject({ ok: true })

    const subs = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: 'lead-magnet-test+ok@example.test' } },
    })
    expect(subs.totalDocs).toBe(1)
    const sub = subs.docs[0]
    expect(sub.status).toBe('confirmed')
    expect(sub.source).toBe('lead-magnet')
    expect(sub.deliveryCount).toBe(1)
    expect(sub.flodeskSyncStatus).toBe('skipped')
    expect(sub.confirmedAt).toBeTruthy()
    expect(sub.lastDeliveryAt).toBeTruthy()
    expect(sub.pageSubmittedFrom).toBe('/about')
    expect(sub.userAgent).toBe('vitest')

    expect(sendMock).toHaveBeenCalledTimes(1)
    const arg = sendMock.mock.calls[0]?.[0]
    expect(arg?.to).toBe('lead-magnet-test+ok@example.test')
    expect(arg?.firstName).toBe('Tester')
    expect(arg?.downloadUrl).toMatch(/\/api\/lead-magnet\/download\?token=/)
    expect(arg?.expiresAt.getTime()).toBeGreaterThan(Date.now())

    expect(flodeskMock).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'lead-magnet-test+ok@example.test' }),
    )
  })

  it('silently drops honeypot submissions', async () => {
    const { status, json } = await callRoute({
      email: 'lead-magnet-test+bot@example.test',
      website: 'https://spammy.example',
    })
    expect(status).toBe(200)
    expect(json).toMatchObject({ ok: true })

    const subs = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: 'lead-magnet-test+bot@example.test' } },
    })
    expect(subs.totalDocs).toBe(0)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('upserts an existing subscriber and increments deliveryCount', async () => {
    const email = 'lead-magnet-test+upsert@example.test'
    const first = await callRoute({ email, firstName: 'First' })
    expect(first.status).toBe(200)
    const second = await callRoute({ email, firstName: 'Second' })
    expect(second.status).toBe(200)

    const subs = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
    })
    expect(subs.totalDocs).toBe(1)
    expect(subs.docs[0].deliveryCount).toBe(2)
    expect(sendMock).toHaveBeenCalledTimes(2)
  }, 15_000)

  it('returns 503 when lead magnet is disabled', async () => {
    await payload.updateGlobal({
      slug: 'lead-magnet-settings',
      data: { enabled: false },
    })
    try {
      const { status, json } = await callRoute({ email: 'lead-magnet-test+off@example.test' })
      expect(status).toBe(503)
      expect(json).toMatchObject({ ok: false })
    } finally {
      await payload.updateGlobal({
        slug: 'lead-magnet-settings',
        data: { enabled: true },
      })
    }
  })

  it('normalises email to lowercase', async () => {
    const { status } = await callRoute({ email: 'LEAD-MAGNET-test+CASE@Example.TEST' })
    expect(status).toBe(200)
    const subs = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: 'lead-magnet-test+case@example.test' } },
    })
    expect(subs.totalDocs).toBe(1)
  })
})
