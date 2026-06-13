import { describe, expect, it } from 'vitest'
import { buildMetadata } from '@/lib/seo'
import type { Media } from '@/payload-types'

// vitest.setup.ts loads .env via dotenv/config, so NEXT_PUBLIC_SITE_URL is
// already set to http://localhost:3000 before this file is imported.

const baseImg = { id: 1, url: 'https://cdn.example.com/og.jpg' } as Media

describe('buildMetadata', () => {
  describe('title fallback chain', () => {
    it('uses seo.metaTitle when present', () => {
      expect(buildMetadata({ seo: { metaTitle: 'Custom' } }).title).toBe('Custom')
    })
    it('falls back to fallbackTitle when seo.metaTitle is empty', () => {
      expect(buildMetadata({ seo: { metaTitle: '' }, fallbackTitle: 'Default' }).title).toBe(
        'Default',
      )
    })
    it('falls back to fallbackTitle when seo is null', () => {
      expect(buildMetadata({ seo: null, fallbackTitle: 'Default' }).title).toBe('Default')
    })
    it('returns undefined title when neither seo.metaTitle nor fallbackTitle is set', () => {
      expect(buildMetadata({}).title).toBeUndefined()
    })
  })

  describe('brand-suffix stripping (prevents `· Maria Levi Photography · Maria Levi Photography`)', () => {
    it('strips the long suffix from seo.metaTitle', () => {
      expect(buildMetadata({ seo: { metaTitle: 'About · Maria Levi Photography' } }).title).toBe(
        'About',
      )
    })
    it('strips the short suffix from fallbackTitle', () => {
      expect(buildMetadata({ fallbackTitle: 'About · Maria Levi' }).title).toBe('About')
    })
    it('prefers the long suffix when both could match', () => {
      // " · Maria Levi" is also a substring, but the long form is checked first.
      expect(buildMetadata({ fallbackTitle: 'About · Maria Levi Photography' }).title).toBe('About')
    })
    it('leaves titles without the brand suffix untouched', () => {
      expect(buildMetadata({ fallbackTitle: 'About the Studio' }).title).toBe('About the Studio')
    })
  })

  describe('description', () => {
    it('uses seo.metaDescription', () => {
      expect(buildMetadata({ seo: { metaDescription: 'Custom desc' } }).description).toBe(
        'Custom desc',
      )
    })
    it('falls back to fallbackDescription', () => {
      expect(buildMetadata({ fallbackDescription: 'Default desc' }).description).toBe(
        'Default desc',
      )
    })
    it('returns undefined description when neither is set', () => {
      expect(buildMetadata({}).description).toBeUndefined()
    })
  })

  describe('canonical / alternates', () => {
    it('builds canonical from path when seo.canonical is absent', () => {
      expect(buildMetadata({ path: '/about' }).alternates?.canonical).toBe(
        'http://localhost:3000/about',
      )
    })
    it('uses seo.canonical verbatim when present', () => {
      expect(
        buildMetadata({ seo: { canonical: 'https://example.com/x' } }).alternates?.canonical,
      ).toBe('https://example.com/x')
    })
    it('omits alternates entirely when neither path nor seo.canonical is provided', () => {
      expect(buildMetadata({}).alternates).toBeUndefined()
    })
  })

  describe('robots / noIndex', () => {
    it('sets index:false / follow:false when seo.noIndex is true', () => {
      expect(buildMetadata({ seo: { noIndex: true } }).robots).toEqual({
        index: false,
        follow: false,
      })
    })
    it('omits robots when noIndex is false', () => {
      expect(buildMetadata({ seo: { noIndex: false } }).robots).toBeUndefined()
    })
    it('omits robots when noIndex is unset', () => {
      expect(buildMetadata({}).robots).toBeUndefined()
    })
  })

  describe('og + twitter image resolution', () => {
    it('uses seo.ogImage when populated as Media', () => {
      const md = buildMetadata({ seo: { ogImage: baseImg } })
      expect(md.openGraph?.images).toEqual([{ url: 'https://cdn.example.com/og.jpg' }])
      expect(md.twitter?.images).toEqual(['https://cdn.example.com/og.jpg'])
    })
    it('falls back to fallbackImage when seo.ogImage is just a numeric id (unpopulated)', () => {
      const md = buildMetadata({ seo: { ogImage: 42 }, fallbackImage: baseImg })
      expect(md.openGraph?.images).toEqual([{ url: 'https://cdn.example.com/og.jpg' }])
    })
    it('omits twitter card entirely when no image resolves', () => {
      expect(buildMetadata({}).twitter).toBeUndefined()
    })
  })

  describe('keywords', () => {
    it('passes seo.keywords through verbatim', () => {
      expect(buildMetadata({ seo: { keywords: 'a, b, c' } }).keywords).toBe('a, b, c')
    })
    it('returns undefined when keywords is empty', () => {
      expect(buildMetadata({ seo: { keywords: '' } }).keywords).toBeUndefined()
    })
  })
})
