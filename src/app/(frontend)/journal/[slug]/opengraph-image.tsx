import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography — journal post'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

const getPostForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { title: true, excerpt: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params
  const post = await getPostForOg(slug)
  if (!post) {
    return renderOgCard({ eyebrow: 'Journal', title: 'Notes & stories' })
  }
  return renderOgCard({
    eyebrow: 'Journal',
    title: post.title,
    subhead: post.excerpt ?? undefined,
  })
}
