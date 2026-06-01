import { cache } from 'react'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og/render'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Maria Levi Photography — city landing page'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ city: string }> }

const getCityForOg = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'local-landing-pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
    depth: 0,
    select: { cityName: true, cityState: true, headline: true, subhead: true },
  })
  return result.docs[0] ?? null
})

export default async function OpengraphImage({ params }: Props) {
  const { city } = await params
  const page = await getCityForOg(city)
  if (!page) {
    return renderOgCard({
      eyebrow: 'City landing',
      title: 'Photographer in your city',
    })
  }

  const stateSuffix = page.cityState ? ` · ${page.cityState}` : ''
  return renderOgCard({
    eyebrow: `Photographer in ${page.cityName}${stateSuffix}`,
    title: page.headline ?? `Photography in ${page.cityName}`,
    subhead: page.subhead ?? undefined,
  })
}
