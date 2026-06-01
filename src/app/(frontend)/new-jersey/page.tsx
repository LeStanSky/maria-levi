import type { Metadata } from 'next'
import { NJ_CONFIG, StateLandingPage } from '@/components/state/StateLandingPage'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  fallbackTitle: `${NJ_CONFIG.headline} · Maria Levi Photography`,
  fallbackDescription: NJ_CONFIG.subhead,
  path: `/${NJ_CONFIG.pathSlug}`,
})

export default function NewJerseyStatePage() {
  return <StateLandingPage config={NJ_CONFIG} />
}
