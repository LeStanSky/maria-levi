import type { MetadataRoute } from 'next'

// Crawlers that scrape for SEO competitor data, content theft, or generic bot
// noise. Maria's site has nothing to gain from being in their indexes and they
// add noise to analytics + Sentry. Block unconditionally — even after launch.
const BAD_BOTS = [
  'SemrushBot',
  'AhrefsBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'MauiBot',
  'PetalBot',
  'DataForSeoBot',
  'SeznamBot',
  'serpstatbot',
]

export default function robots(): MetadataRoute.Robots {
  // Read at request time so a Vercel env-var flip (Phase 6 launch) takes effect
  // on the next ISR revalidation without a redeploy. Tests also rely on this.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const allowIndexing = process.env.INDEX_SITE === 'true'

  const rules: MetadataRoute.Robots['rules'] = [
    allowIndexing
      ? {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/admin/', '/api/', '/logout'],
        }
      : {
          // Pre-launch: block everything. Sitemap is still emitted so once
          // INDEX_SITE flips, crawlers know where to look immediately.
          userAgent: '*',
          disallow: '/',
        },
    ...BAD_BOTS.map((userAgent) => ({ userAgent, disallow: '/' })),
  ]

  return {
    rules,
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
