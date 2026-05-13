import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import type { LightboxPhoto } from '@/components/sections/Lightbox.client'
import { SeriesPhotoGrid } from '@/components/sections/SeriesPhotoGrid.client'
import { isMedia } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import type { PortfolioCategory } from '@/payload-types'

type Props = { params: Promise<{ category: string; series: string }> }

async function getSeries(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-series',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0]
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-series',
    limit: 200,
    depth: 1,
    draft: false,
  })
  return result.docs
    .map((s) => {
      const cat = s.category as PortfolioCategory | number
      const categorySlug = typeof cat === 'object' ? cat.slug : null
      return categorySlug ? { category: categorySlug, series: s.slug } : null
    })
    .filter((p): p is { category: string; series: string } => p !== null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, series } = await params
  const data = await getSeries(series)
  if (!data) return {}
  const cat = data.category as PortfolioCategory
  return buildMetadata({
    seo: data.seo,
    fallbackTitle: `${data.title} · ${cat?.name ?? 'Portfolio'} · Maria Levi`,
    fallbackDescription: data.tagline ?? undefined,
    fallbackImage: data.heroImage ?? data.coverImage,
    path: `/portfolio/${category}/${series}`,
  })
}

export default async function PortfolioSeriesPage({ params }: Props) {
  const { category: categorySlug, series: seriesSlug } = await params
  const series = await getSeries(seriesSlug)
  if (!series) notFound()

  const category = series.category as PortfolioCategory
  const heroImage = series.heroImage ?? series.coverImage

  const photos: LightboxPhoto[] =
    series.photos
      ?.filter((p) => isMedia(p.image) && p.image.url)
      .map((p) => {
        const img = p.image as { url: string; alt?: string; width?: number; height?: number }
        return {
          src: img.url,
          alt: img.alt ?? series.title,
          width: img.width,
          height: img.height,
          caption: p.caption,
        }
      }) ?? []

  return (
    <article>
      <Section padding="md">
        <Container size="content">
          <Breadcrumbs
            items={[
              { label: 'Portfolio', href: '/portfolio' },
              { label: category?.name ?? 'Category', href: `/portfolio/${categorySlug}` },
              { label: series.title },
            ]}
          />
          <div className="mt-10 max-w-(--container-prose)">
            {series.eyebrow && (
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
                {series.eyebrow}
              </p>
            )}
            <Heading level={1} size="display">
              {series.title}
            </Heading>
            {series.tagline && (
              <Text tone="soft" className="mt-6 text-lg">
                {series.tagline}
              </Text>
            )}
            {series.description && (
              <div className="mt-10 prose max-w-(--container-prose)">
                <RichText data={series.description} />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {heroImage && isMedia(heroImage) && (
        <Container size="wide">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              media={heroImage}
              fill
              priority
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Section padding="md">
        <Container size="content">
          <SeriesPhotoGrid photos={photos} />
        </Container>
      </Section>

      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-4">
              Like what you see?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
            >
              Book a session
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
