import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Sitemap is regenerated hourly on prod — content changes also broadcast
// /api/revalidate which clears this route's ISR cache immediately.
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

function toDate(value: string | Date | null | undefined): Date | undefined {
  if (!value) return undefined
  const d = value instanceof Date ? value : new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

function entry(
  path: string,
  lastMod: Date | undefined,
  priority: number,
  changeFrequency: Entry['changeFrequency'] = 'weekly',
): Entry {
  return {
    url: `${SITE_URL}${path}`,
    ...(lastMod && { lastModified: lastMod }),
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  // Static routes — hand-curated because they don't sit in a collection.
  const now = new Date()
  const staticEntries: Entry[] = [
    entry('/', now, 1.0, 'weekly'),
    entry('/portfolio', now, 0.9, 'weekly'),
    entry('/services', now, 0.9, 'weekly'),
    entry('/about', now, 0.7, 'monthly'),
    entry('/journal', now, 0.7, 'daily'),
    entry('/contact', now, 0.7, 'monthly'),
    entry('/faq', now, 0.6, 'monthly'),
    entry('/testimonials', now, 0.6, 'monthly'),
    entry('/nyc', now, 0.8, 'weekly'),
    entry('/new-jersey', now, 0.8, 'weekly'),
  ]

  const [
    pagesRes,
    portfolioCategoriesRes,
    portfolioSeriesRes,
    servicesRes,
    blogPostsRes,
    cityPagesRes,
  ] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { isHomepage: { not_equals: true } },
      limit: 500,
      draft: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'portfolio-categories',
      limit: 100,
      draft: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'portfolio-series',
      limit: 1000,
      draft: false,
      depth: 1,
      select: { slug: true, category: true, updatedAt: true },
    }),
    payload.find({
      collection: 'services',
      limit: 100,
      draft: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'blog-posts',
      limit: 1000,
      draft: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'local-landing-pages',
      limit: 100,
      draft: false,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
  ])

  // Build a slug-id → slug map for portfolio categories so we can resolve
  // series URLs without a second depth=2 fetch.
  const categorySlugById = new Map<number | string, string>()
  for (const c of portfolioCategoriesRes.docs) {
    if (c.slug) categorySlugById.set(c.id, c.slug)
  }

  const dynamicEntries: Entry[] = []

  for (const p of pagesRes.docs) {
    if (!p.slug) continue
    dynamicEntries.push(entry(`/${p.slug}`, toDate(p.updatedAt), 0.5, 'monthly'))
  }

  for (const c of portfolioCategoriesRes.docs) {
    if (!c.slug) continue
    dynamicEntries.push(entry(`/portfolio/${c.slug}`, toDate(c.updatedAt), 0.8, 'weekly'))
  }

  for (const s of portfolioSeriesRes.docs) {
    if (!s.slug) continue
    const categoryId = typeof s.category === 'object' && s.category ? s.category.id : s.category
    const categorySlug = categoryId ? categorySlugById.get(categoryId) : undefined
    if (!categorySlug) continue
    dynamicEntries.push(
      entry(`/portfolio/${categorySlug}/${s.slug}`, toDate(s.updatedAt), 0.7, 'monthly'),
    )
  }

  for (const s of servicesRes.docs) {
    if (!s.slug) continue
    dynamicEntries.push(entry(`/services/${s.slug}`, toDate(s.updatedAt), 0.8, 'monthly'))
  }

  for (const p of blogPostsRes.docs) {
    if (!p.slug) continue
    dynamicEntries.push(entry(`/journal/${p.slug}`, toDate(p.updatedAt), 0.6, 'weekly'))
  }

  for (const c of cityPagesRes.docs) {
    if (!c.slug) continue
    dynamicEntries.push(entry(`/photographer-in/${c.slug}`, toDate(c.updatedAt), 0.8, 'weekly'))
  }

  return [...staticEntries, ...dynamicEntries]
}
