import type { LocalLandingPage, SiteSetting } from '@/payload-types'
import { mediaUrl } from './media'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type JsonLd = Record<string, unknown>

type Crumb = { name: string; path?: string }

export function breadcrumbListJsonLd(items: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path && { item: `${SITE_URL}${c.path}` }),
    })),
  }
}

type LocalBusinessArgs = {
  page: Pick<
    LocalLandingPage,
    'cityName' | 'cityState' | 'slug' | 'headline' | 'subhead' | 'heroImage' | 'nearbyAreas'
  >
  siteSettings?: Pick<SiteSetting, 'brandName' | 'email' | 'phone' | 'socials' | 'defaultOgImage'>
}

export function localBusinessJsonLd({ page, siteSettings }: LocalBusinessArgs): JsonLd {
  const name = siteSettings?.brandName
    ? `${siteSettings.brandName} Photography — ${page.cityName}`
    : `Maria Levi Photography — ${page.cityName}`

  const image = mediaUrl(page.heroImage) ?? mediaUrl(siteSettings?.defaultOgImage)
  const url = `${SITE_URL}/photographer-in/${page.slug}`

  const sameAs = (siteSettings?.socials ?? [])
    .map((s) => s.url)
    .filter((u): u is string => Boolean(u))

  const areaServed = [
    { '@type': 'City' as const, name: page.cityName },
    ...(page.nearbyAreas ?? [])
      .map((a) => a.name)
      .filter((n): n is string => Boolean(n))
      .map((n) => ({ '@type': 'City' as const, name: n })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name,
    description: page.subhead ?? page.headline,
    url,
    ...(image && { image }),
    ...(siteSettings?.email && { email: siteSettings.email }),
    ...(siteSettings?.phone && { telephone: siteSettings.phone }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: page.cityName,
      ...(page.cityState && { addressRegion: page.cityState }),
      addressCountry: 'US',
    },
    areaServed,
    priceRange: '$$',
    ...(sameAs.length > 0 && { sameAs }),
  }
}
