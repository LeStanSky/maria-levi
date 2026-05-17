import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'
import type { BlogPost, PortfolioSery } from '@/payload-types'

/**
 * Find PortfolioSeries tagged with this city slug. Used by city landing pages
 * to auto-populate Featured Series in addition to admin-curated `featuredSeries`.
 */
export const getSeriesByCity = cache(
  async (citySlug: string, limit = 6): Promise<PortfolioSery[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'portfolio-series',
      where: { 'cityTags.city': { equals: citySlug } },
      sort: '-publishedAt',
      limit,
      depth: 2,
      draft: false,
    })
    return result.docs
  },
)

export const getJournalByCity = cache(async (citySlug: string, limit = 3): Promise<BlogPost[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { 'cityTags.city': { equals: citySlug } },
    sort: '-publishDate',
    limit,
    depth: 1,
    draft: false,
  })
  return result.docs
})

/**
 * Merge admin-curated featuredSeries with cityTags-derived auto matches.
 * Dedups by series id; preserves admin order first.
 */
export function mergeFeaturedSeries(
  curated: (number | PortfolioSery)[] | null | undefined,
  auto: PortfolioSery[],
  limit = 6,
): PortfolioSery[] {
  const populated = (curated ?? []).filter(
    (s): s is PortfolioSery => typeof s === 'object' && s !== null,
  )
  const seen = new Set<number>(populated.map((s) => s.id))
  const extras = auto.filter((s) => !seen.has(s.id))
  return [...populated, ...extras].slice(0, limit)
}
