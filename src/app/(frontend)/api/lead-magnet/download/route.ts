import * as Sentry from '@sentry/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { verifyDownloadToken } from '@/lib/lead-magnet/token'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token' }, { status: 400 })
  }

  const verified = verifyDownloadToken(token)
  if (!verified.ok) {
    const status = verified.reason === 'expired' ? 410 : 400
    return NextResponse.json(
      {
        ok: false,
        error:
          verified.reason === 'expired'
            ? 'This download link has expired. Subscribe again or reply to your delivery email and we will resend it.'
            : 'Invalid download link.',
      },
      { status },
    )
  }

  try {
    const payload = await getPayloadClient()
    const media = await payload.findByID({
      collection: 'media',
      id: verified.payload.m,
      overrideAccess: true,
    })

    if (!media?.url) {
      return NextResponse.json({ ok: false, error: 'File unavailable' }, { status: 404 })
    }

    // Resolve relative Payload URLs against NEXT_PUBLIC_SITE_URL so server-side
    // fetch has an absolute URL. Local + S3/R2 storage both work via this path.
    const base = (process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')
    const fileUrl = media.url.startsWith('http') ? media.url : `${base}${media.url}`

    const upstream = await fetch(fileUrl)
    if (!upstream.ok || !upstream.body) {
      throw new Error(`Upstream media fetch failed: ${upstream.status}`)
    }

    const filename = media.filename ?? 'guide.pdf'

    const headers = new Headers()
    headers.set('Content-Type', upstream.headers.get('content-type') ?? 'application/pdf')
    const len = upstream.headers.get('content-length')
    if (len) headers.set('Content-Length', len)
    headers.set('Content-Disposition', `attachment; filename="${encodeFilename(filename)}"`)
    headers.set('Cache-Control', 'private, no-store')

    return new Response(upstream.body, { status: 200, headers })
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'lead-magnet-download' } })
    console.error('[lead-magnet] download failed', err)
    return NextResponse.json({ ok: false, error: 'Download failed' }, { status: 500 })
  }
}

function encodeFilename(name: string): string {
  // Strip CR/LF to avoid header injection; let the browser handle non-ASCII via
  // RFC 5987 filename* if needed (most browsers handle UTF-8 in filename= today).
  return name.replace(/["\r\n]/g, '')
}
