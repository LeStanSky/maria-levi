import type { Metadata } from 'next'
import { NYC_CONFIG, StateLandingPage } from '@/components/state/StateLandingPage'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  fallbackTitle: `${NYC_CONFIG.headline} · Maria Levi Photography`,
  fallbackDescription: NYC_CONFIG.subhead,
  path: `/${NYC_CONFIG.pathSlug}`,
})

export default function NYCStatePage() {
  return <StateLandingPage config={NYC_CONFIG} />
}
