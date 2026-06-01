import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography — portfolio series'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ category: string; series: string }> }

const getSeriesForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-series',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { title: true, eyebrow: true, tagline: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { series } = await params
  const s = await getSeriesForOg(series)
  if (!s) {
    return renderOgCard({ eyebrow: 'Portfolio · Series', title: 'Selected work' })
  }
  return renderOgCard({
    eyebrow: s.eyebrow ?? 'Portfolio · Series',
    title: s.title,
    subhead: s.tagline ?? undefined,
  })
}
