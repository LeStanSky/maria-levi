import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography — portfolio category'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ category: string }> }

const getCategoryForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-categories',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { name: true, eyebrow: true, subtitle: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { category } = await params
  const cat = await getCategoryForOg(category)
  if (!cat) {
    return renderOgCard({ eyebrow: 'Portfolio', title: 'Selected work' })
  }
  return renderOgCard({
    eyebrow: cat.eyebrow ?? 'Portfolio',
    title: cat.name,
    subhead: cat.subtitle ?? undefined,
  })
}
