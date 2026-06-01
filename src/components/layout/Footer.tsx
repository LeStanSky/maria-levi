import Link from 'next/link'
import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'
import { NewsletterSignup } from './NewsletterSignup.client'

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

// Service-area column is rendered separately (NOT via `nav.footerColumns`) so
// Maria customising footer columns in /admin can never accidentally remove
// these internal links to city + state landings — they're load-bearing for
// local SEO and the sitemap-internal-link signal.
const SERVICE_AREA_LINKS = [
  { label: 'NYC', url: '/nyc' },
  { label: 'New Jersey', url: '/new-jersey' },
  { label: 'Manhattan', url: '/photographer-in/manhattan' },
  { label: 'Hoboken', url: '/photographer-in/hoboken' },
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
      {/* Default layout = 5 children on lg: brand + 2 CMS columns
          (Explore / Connect) + Service area + Newsletter. If Maria adds a
          3rd CMS column via /admin, the grid wraps to 2 rows on lg — that's
          a deliberate trade-off to keep the default tight. */}
      <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
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

        {/* Service-area column — always rendered, never overridable via CMS. */}
        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">Service area</h5>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICE_AREA_LINKS.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className="text-soft hover:text-ink transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">
            Receive updates
          </h5>
          <NewsletterSignup />
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
