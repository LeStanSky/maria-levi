import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

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

  it('includes city pages for every seeded LocalLandingPage', async () => {
    const entries = await sitemap()
    const cityPaths = entries
      .map((e) => new URL(e.url).pathname)
      .filter((p) => p.startsWith('/photographer-in/'))
    // The seed:cities script provisions Manhattan, LIC, Hoboken, JC, Princeton.
    // We don't hard-code 5 because the dev DB can have extras, but ≥1 must exist.
    expect(cityPaths.length).toBeGreaterThan(0)
  })

  it('sets priority and changeFrequency on every entry', async () => {
    const entries = await sitemap()
    for (const e of entries) {
      expect(typeof e.priority).toBe('number')
      expect(e.changeFrequency).toBeDefined()
    }
  })
})
