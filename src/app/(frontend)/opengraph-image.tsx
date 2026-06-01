import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'

export const alt = 'Maria Levi · Fashion & Personal Brand Photographer in NYC and New Jersey'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OpengraphImage() {
  return renderOgCard({
    eyebrow: 'NYC · New Jersey',
    title: 'Editorial portraits with quiet confidence.',
    subhead: 'Personal brand and commercial photography for founders, creators, and brands.',
  })
}
