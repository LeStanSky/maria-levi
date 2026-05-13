import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strip trailing slash (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = new URL(request.url)
    url.pathname = pathname.replace(/\/+$/, '')
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match everything except API routes, Next internals, static files, sitemap/robots
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|monitoring).*)',
  ],
}
