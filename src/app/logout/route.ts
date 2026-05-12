import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function clearSessionAndRedirect(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin', req.nextUrl.origin))

  response.cookies.set('payload-token', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  return response
}

export function GET(req: NextRequest) {
  return clearSessionAndRedirect(req)
}

export function POST(req: NextRequest) {
  return clearSessionAndRedirect(req)
}
