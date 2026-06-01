import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography — service'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ niche: string }> }

const getServiceForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { name: true, eyebrow: true, tagline: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { niche } = await params
  const s = await getServiceForOg(niche)
  if (!s) {
    return renderOgCard({ eyebrow: 'Services', title: 'Photography services' })
  }
  return renderOgCard({
    eyebrow: s.eyebrow ?? 'Services',
    title: s.name,
    subhead: s.tagline ?? undefined,
  })
}
