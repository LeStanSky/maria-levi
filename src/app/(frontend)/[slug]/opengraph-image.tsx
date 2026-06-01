import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

const getPageForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { title: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params
  const page = await getPageForOg(slug)
  return renderOgCard({
    eyebrow: 'Maria Levi Photography',
    title: page?.title ?? 'Maria Levi Photography',
  })
}
