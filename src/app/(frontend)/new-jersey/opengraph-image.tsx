import { NJ_CONFIG } from '@/components/state/StateLandingPage'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'

export const alt = `${NJ_CONFIG.headline} · Maria Levi Photography`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OpengraphImage() {
  return renderOgCard({
    eyebrow: NJ_CONFIG.eyebrow,
    title: NJ_CONFIG.headline,
    subhead: NJ_CONFIG.subhead,
  })
}
