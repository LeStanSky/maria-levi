import { NYC_CONFIG } from '@/components/state/StateLandingPage'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'

export const alt = `${NYC_CONFIG.headline} · Maria Levi Photography`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OpengraphImage() {
  return renderOgCard({
    eyebrow: NYC_CONFIG.eyebrow,
    title: NYC_CONFIG.headline,
    subhead: NYC_CONFIG.subhead,
  })
}
