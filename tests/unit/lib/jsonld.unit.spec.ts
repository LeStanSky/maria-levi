import { describe, expect, it } from 'vitest'
import { breadcrumbListJsonLd, localBusinessJsonLd } from '@/lib/jsonld'
import type { LocalLandingPage, Media, SiteSetting } from '@/payload-types'

// Mirror lib/jsonld.ts:4 — same fallback chain. The src module reads this at
// module-load time, so the test reads it the same way (stubbing later would
// have no effect on the captured constant). CI sets this to
// `https://example.com` via .github/workflows/pull_request.yml; local .env
// sets it to `http://localhost:3000` via dotenv/config in vitest.setup.ts.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const baseImg = { id: 1, url: 'https://cdn.example.com/hero.jpg' } as Media

type PageArg = Parameters<typeof localBusinessJsonLd>[0]['page']

const basePage: PageArg = {
  cityName: 'Manhattan',
  cityState: 'NY',
  slug: 'manhattan',
  headline: 'Manhattan headline',
  subhead: 'Subhead text',
  heroImage: baseImg,
  nearbyAreas: null,
} as PageArg

describe('breadcrumbListJsonLd', () => {
  it('returns a well-formed BreadcrumbList for an empty input', () => {
    const ld = breadcrumbListJsonLd([])
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('BreadcrumbList')
    expect((ld.itemListElement as unknown[]).length).toBe(0)
  })
  it('positions items starting at 1', () => {
    const ld = breadcrumbListJsonLd([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ])
    const items = ld.itemListElement as Array<Record<string, unknown>>
    expect(items[0].position).toBe(1)
    expect(items[1].position).toBe(2)
  })
  it('absolutises path under NEXT_PUBLIC_SITE_URL', () => {
    const ld = breadcrumbListJsonLd([{ name: 'About', path: '/about' }])
    expect((ld.itemListElement as Array<Record<string, unknown>>)[0].item).toBe(`${SITE_URL}/about`)
  })
  it('omits item URL when crumb has no path (current page)', () => {
    const ld = breadcrumbListJsonLd([{ name: 'Active page' }])
    const item = (ld.itemListElement as Array<Record<string, unknown>>)[0]
    expect(item.item).toBeUndefined()
    expect(item.name).toBe('Active page')
  })
})

describe('localBusinessJsonLd', () => {
  it('uses the default brand when siteSettings.brandName is missing', () => {
    expect(localBusinessJsonLd({ page: basePage }).name).toBe('Maria Levi Photography — Manhattan')
  })
  it('uses siteSettings.brandName when present', () => {
    const ld = localBusinessJsonLd({
      page: basePage,
      siteSettings: { brandName: 'ML Studio' } as SiteSetting,
    })
    expect(ld.name).toBe('ML Studio Photography — Manhattan')
  })
  it('builds URL + @id from slug', () => {
    const ld = localBusinessJsonLd({ page: basePage })
    expect(ld.url).toBe(`${SITE_URL}/photographer-in/manhattan`)
    expect(ld['@id']).toBe(`${SITE_URL}/photographer-in/manhattan#business`)
  })
  it('falls back to siteSettings.defaultOgImage when page.heroImage is empty', () => {
    const ld = localBusinessJsonLd({
      page: { ...basePage, heroImage: null } as PageArg,
      siteSettings: { defaultOgImage: baseImg } as SiteSetting,
    })
    expect(ld.image).toBe('https://cdn.example.com/hero.jpg')
  })
  it('omits image entirely when neither heroImage nor defaultOgImage resolves', () => {
    const ld = localBusinessJsonLd({ page: { ...basePage, heroImage: null } as PageArg })
    expect(ld.image).toBeUndefined()
  })
  it('uses subhead as description and falls back to headline', () => {
    expect(localBusinessJsonLd({ page: basePage }).description).toBe('Subhead text')
    expect(
      localBusinessJsonLd({ page: { ...basePage, subhead: null } as PageArg }).description,
    ).toBe('Manhattan headline')
  })
  it('always includes the city as the primary areaServed', () => {
    expect(localBusinessJsonLd({ page: basePage }).areaServed).toEqual([
      { '@type': 'City', name: 'Manhattan' },
    ])
  })
  it('appends nearbyAreas with valid names to areaServed and skips entries with null name', () => {
    const ld = localBusinessJsonLd({
      page: {
        ...basePage,
        nearbyAreas: [
          { name: 'Brooklyn', id: 'a' },
          { name: null, id: 'b' },
          { name: 'Queens', id: 'c' },
        ],
      } as unknown as PageArg,
    })
    expect(ld.areaServed).toEqual([
      { '@type': 'City', name: 'Manhattan' },
      { '@type': 'City', name: 'Brooklyn' },
      { '@type': 'City', name: 'Queens' },
    ])
  })
  it('builds sameAs from siteSettings.socials and drops entries with missing url', () => {
    const ld = localBusinessJsonLd({
      page: basePage,
      siteSettings: {
        socials: [
          { platform: 'instagram', url: 'https://instagram.com/x', id: '1' },
          { platform: 'tiktok', url: null, id: '2' },
        ],
      } as unknown as SiteSetting,
    })
    expect(ld.sameAs).toEqual(['https://instagram.com/x'])
  })
  it('omits sameAs entirely when there are no valid socials', () => {
    expect(localBusinessJsonLd({ page: basePage }).sameAs).toBeUndefined()
  })
  it('always includes a US PostalAddress with city + region', () => {
    expect(localBusinessJsonLd({ page: basePage }).address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Manhattan',
      addressRegion: 'NY',
      addressCountry: 'US',
    })
  })
  it('omits addressRegion when cityState is null', () => {
    const ld = localBusinessJsonLd({ page: { ...basePage, cityState: null } as PageArg })
    expect(ld.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Manhattan',
      addressCountry: 'US',
    })
  })
})
