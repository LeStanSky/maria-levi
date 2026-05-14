import Link from 'next/link'
import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'

const getNavigation = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation' })
})

const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
})

const DEFAULT_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Services', url: '/services' },
      { label: 'Journal', url: '/journal' },
      { label: 'About', url: '/about' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', url: '/contact' },
      { label: 'FAQ', url: '/faq' },
      { label: 'Testimonials', url: '/testimonials' },
    ],
  },
]

export async function Footer() {
  const [nav, settings] = await Promise.all([getNavigation(), getSiteSettings()])

  const columns =
    nav?.footerColumns && nav.footerColumns.length > 0 ? nav.footerColumns : DEFAULT_COLUMNS
  const legalLinks = nav?.legalLinks ?? []
  const brandName = settings?.brandName ?? 'Maria Levi'
  const socials = settings?.socials ?? []

  return (
    <footer className="bg-bg-subtle border-t border-line mt-(--spacing-section)">
      <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-light tracking-tight text-ink">{brandName}</p>
          <p className="mt-4 text-sm text-soft max-w-xs">
            Editorial · Personal brand · Commercial photography. Based in New York & New Jersey —
            serving Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-body uppercase text-xs tracking-[0.18em]">
              {socials.map((s) => (
                <li key={s.id ?? s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-soft hover:text-ink transition-colors"
                  >
                    {s.label ?? s.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {columns.map((col, i) => (
          <div key={col.heading ?? `col-${i}`}>
            {col.heading && (
              <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">
                {col.heading}
              </h5>
            )}
            {col.links && col.links.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link, j) => (
                  <li key={link.url ?? `link-${j}`}>
                    <Link href={link.url} className="text-soft hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">
            Receive updates
          </h5>
          <form
            className="mt-4 flex flex-col gap-3"
            action="#"
            method="post"
            aria-label="Newsletter signup (coming soon)"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              disabled
              className="bg-transparent border-b border-line py-2 text-sm font-body placeholder:text-muted focus:outline-none focus:border-ink disabled:opacity-50"
            />
            <button
              type="submit"
              disabled
              className="self-start font-body uppercase text-xs tracking-[0.18em] text-soft disabled:opacity-50"
            >
              Coming soon →
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between text-xs text-muted gap-2">
          <p>
            © {new Date().getFullYear()} {brandName} Photography
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-4">
              {legalLinks.map((link, i) => (
                <li key={link.url ?? `legal-${i}`}>
                  <Link href={link.url} className="hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
