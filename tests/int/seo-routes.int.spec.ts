import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import config from '@/payload.config'

describe('robots.ts', () => {
  it('emits a sitemap URL pointing at SITE_URL', () => {
    const r = robots()
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/)
  })

  it('always disallows bad bots regardless of INDEX_SITE flag', () => {
    const r = robots()
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
    const badBotRules = rules.filter((rule) =>
      typeof rule.userAgent === 'string'
        ? ['SemrushBot', 'AhrefsBot', 'MJ12bot'].includes(rule.userAgent)
        : false,
    )
    // 3 we asserted on + others — but at minimum all three named must exist.
    expect(badBotRules.length).toBeGreaterThanOrEqual(3)
    for (const rule of badBotRules) {
      expect(rule.disallow).toBe('/')
    }
  })

  it('blocks all crawlers by default (pre-launch noindex)', () => {
    const prev = process.env.INDEX_SITE
    delete process.env.INDEX_SITE
    try {
      const r = robots()
      const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
      const universalRule = rules.find((rule) => rule.userAgent === '*')
      expect(universalRule).toBeDefined()
      expect(universalRule?.disallow).toBe('/')
    } finally {
      if (prev !== undefined) process.env.INDEX_SITE = prev
    }
  })

  it('flips to allow-all when INDEX_SITE=true', () => {
    const prev = process.env.INDEX_SITE
    process.env.INDEX_SITE = 'true'
    try {
      const r = robots()
      const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
      const universalRule = rules.find((rule) => rule.userAgent === '*')
      expect(universalRule?.allow).toBe('/')
      // Admin / API still off-limits even when public.
      expect(universalRule?.disallow).toEqual(expect.arrayContaining(['/admin', '/api/']))
    } finally {
      if (prev === undefined) delete process.env.INDEX_SITE
      else process.env.INDEX_SITE = prev
    }
  })
})

// Sitemap hits Payload (Postgres dev branch) — generous timeout for cold starts.
describe('sitemap.ts', { timeout: 60_000 }, () => {
  // CI runs against a freshly-pushed schema with no LocalLandingPages, so we
  // seed one before the suite to assert sitemap picks city routes up. The
  // unique slug avoids colliding with `seed:cities` on a dev DB.
  const testCitySlug = `sitemap-test-${Date.now()}`
  let payload: Payload
  let testCityId: number | string | null = null

  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    const created = await payload.create({
      collection: 'local-landing-pages',
      data: {
        cityName: 'Sitemap Test City',
        slug: testCitySlug,
        cityState: 'NY',
        headline: 'Sitemap test',
      },
      draft: false,
    })
    testCityId = created.id
  })

  afterAll(async () => {
    if (testCityId != null) {
      await payload.delete({ collection: 'local-landing-pages', id: testCityId })
    }
  })

  it('includes the homepage and core static routes', async () => {
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    // Every URL should be absolute (includes the host).
    for (const u of urls) {
      expect(u).toMatch(/^https?:\/\//)
    }
    // Spot-check that we cover the static set.
    const paths = urls.map((u) => new URL(u).pathname)
    expect(paths).toEqual(
      expect.arrayContaining(['/', '/portfolio', '/services', '/journal', '/nyc', '/new-jersey']),
    )
  })

  it('includes a city URL for every LocalLandingPage', async () => {
    const entries = await sitemap()
    const paths = entries.map((e) => new URL(e.url).pathname)
    // The city we seeded in beforeAll must surface — that's the contract.
    expect(paths).toContain(`/photographer-in/${testCitySlug}`)
  })

  it('sets priority and changeFrequency on every entry', async () => {
    const entries = await sitemap()
    for (const e of entries) {
      expect(typeof e.priority).toBe('number')
      expect(e.changeFrequency).toBeDefined()
    }
  })
})
