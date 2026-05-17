import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { LocalBlocks } from '@/components/blocks/LocalBlocks'
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { breadcrumbListJsonLd, localBusinessJsonLd } from '@/lib/jsonld'
import { getJournalByCity, getSeriesByCity, mergeFeaturedSeries } from '@/lib/local/series-by-city'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import type { Service, Testimonial } from '@/payload-types'

type Props = { params: Promise<{ city: string }> }

export const revalidate = 60

const getCityPage = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const [pageResult, siteSettings] = await Promise.all([
    payload.find({
      collection: 'local-landing-pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      draft: false,
    }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])
  return { page: pageResult.docs[0] ?? null, siteSettings }
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'local-landing-pages',
    limit: 50,
    draft: false,
    select: { slug: true },
  })
  return result.docs.map((p) => ({ city: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const { page } = await getCityPage(city)
  if (!page) return {}

  const fallbackTitle = `${page.headline} · Maria Levi Photography`
  const fallbackDescription =
    page.subhead ?? `Editorial personal brand & portrait photography in ${page.cityName}.`

  return buildMetadata({
    seo: page.seo,
    fallbackTitle,
    fallbackDescription,
    fallbackImage: page.heroImage,
    path: `/photographer-in/${page.slug}`,
  })
}

function isPopulated<T extends { id: string | number }>(
  value: T | string | number | undefined | null,
): value is T {
  return typeof value === 'object' && value !== null
}

export default async function CityLandingPage({ params }: Props) {
  const { city } = await params
  const { page, siteSettings } = await getCityPage(city)
  if (!page) notFound()

  const [autoSeries, journalForCity] = await Promise.all([
    getSeriesByCity(page.slug, 8),
    getJournalByCity(page.slug, 3),
  ])

  const featuredSeries = mergeFeaturedSeries(page.featuredSeries, autoSeries, 6)
  const localTestimonials: Testimonial[] = (page.localTestimonials ?? []).filter(isPopulated)
  const localServices: Service[] = (page.localServices ?? []).filter(isPopulated)

  const inquireHref = `/contact?city=${page.slug}`

  const businessSchema = localBusinessJsonLd({ page, siteSettings: siteSettings ?? undefined })
  const breadcrumbsSchema = breadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: page.cityName, path: `/photographer-in/${page.slug}` },
  ])

  return (
    <article>
      {/* Hero */}
      <Section padding="lg">
        <Container size="prose">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: page.cityName }]} />
          {page.cityState && (
            <p className="mt-10 font-body uppercase text-xs tracking-[0.18em] text-muted text-center">
              {page.cityState}
            </p>
          )}
          <Heading level={1} size="display" className="mt-4 text-center">
            {page.headline}
          </Heading>
          {page.subhead && (
            <Text tone="soft" className="mt-8 text-center max-w-prose mx-auto text-lg">
              {page.subhead}
            </Text>
          )}
        </Container>

        {page.heroImage && typeof page.heroImage === 'object' && (
          <Container size="content" className="mt-16">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                media={page.heroImage}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        )}
      </Section>

      {/* Intro */}
      {page.intro && (
        <Section padding="md">
          <Container size="prose">
            <RichText data={page.intro} className="prose" />
          </Container>
        </Section>
      )}

      {/* Custom pageBuilder blocks (CityHighlight, ServiceForCity, etc.) */}
      <LocalBlocks blocks={page.pageBuilder} />

      {/* Popular shooting locations (data on the doc, not in pageBuilder) */}
      {page.popularLocations && page.popularLocations.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              Where we shoot in {page.cityName}
            </Heading>
            <ul className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {page.popularLocations.map((loc, i) => (
                <li key={loc.id ?? `${loc.name}-${i}`} className="border-l border-line pl-6">
                  <Heading level={3} size="md">
                    {loc.name}
                  </Heading>
                  {loc.address && (
                    <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-muted">
                      {loc.address}
                    </p>
                  )}
                  {loc.description && (
                    <Text tone="soft" size="sm" className="mt-4">
                      {loc.description}
                    </Text>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Local services links */}
      {localServices.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              Sessions available in {page.cityName}
            </Heading>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {localServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group block border border-line p-6 hover:border-ink transition-colors"
                >
                  {s.eyebrow && (
                    <p className="font-body uppercase text-[10px] tracking-[0.18em] text-muted">
                      {s.eyebrow}
                    </p>
                  )}
                  <Heading level={3} size="md" className="mt-3">
                    {s.name}
                  </Heading>
                  {s.tagline && (
                    <Text tone="soft" size="sm" className="mt-3 line-clamp-3">
                      {s.tagline}
                    </Text>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Featured Series (manual + auto-cityTags) */}
      {featuredSeries.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              Selected work in {page.cityName}
            </Heading>
            <div className="mt-16 grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {featuredSeries.map((s) => {
                const category = isPopulated(s.category) ? s.category : null
                const href = category
                  ? `/portfolio/${category.slug}/${s.slug}`
                  : `/portfolio/${s.slug}`
                return (
                  <Link key={s.id} href={href} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle">
                      {s.coverImage && typeof s.coverImage === 'object' && (
                        <Image
                          media={s.coverImage}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                    <Heading
                      level={3}
                      size="md"
                      className="mt-4 group-hover:text-soft transition-colors"
                    >
                      {s.title}
                    </Heading>
                  </Link>
                )
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Local testimonials */}
      {localTestimonials.length > 0 && (
        <Section padding="md" className="border-t border-line bg-bg-subtle">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              From clients in {page.cityName}
            </Heading>
            <div className="mt-16 space-y-16">
              {localTestimonials.slice(0, 3).map((t) => (
                <figure key={t.id} className="max-w-prose mx-auto text-center">
                  <blockquote className="font-display text-2xl lg:text-3xl font-light leading-snug tracking-tight text-ink italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 font-body uppercase text-xs tracking-[0.18em] text-muted">
                    — {t.clientName}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Journal posts tagged with this city */}
      {journalForCity.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              From the journal · {page.cityName}
            </Heading>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {journalForCity.map((p) => (
                <Link key={p.id} href={`/journal/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                    {p.coverImage && typeof p.coverImage === 'object' && (
                      <Image
                        media={p.coverImage}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <Heading
                    level={3}
                    size="md"
                    className="mt-4 group-hover:text-soft transition-colors"
                  >
                    {p.title}
                  </Heading>
                  {p.excerpt && (
                    <Text tone="soft" size="sm" className="mt-2 line-clamp-2">
                      {p.excerpt}
                    </Text>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Nearby areas (data on the doc) */}
      {page.nearbyAreas && page.nearbyAreas.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              Also serving nearby
            </Heading>
            <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-body uppercase text-xs tracking-[0.18em]">
              {page.nearbyAreas.map((area, i) =>
                area.link ? (
                  <li key={area.id ?? `${area.name}-${i}`}>
                    <Link
                      href={area.link}
                      className="block py-3 border-b border-line hover:text-soft transition-colors"
                    >
                      {area.name}
                    </Link>
                  </li>
                ) : (
                  <li
                    key={area.id ?? `${area.name}-${i}`}
                    className="block py-3 border-b border-line text-muted"
                  >
                    {area.name}
                  </li>
                ),
              )}
            </ul>
          </Container>
        </Section>
      )}

      {/* CTA banner */}
      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              Let&apos;s work together
            </p>
            <Heading level={2} size="xl">
              Plan a session in {page.cityName}
            </Heading>
            <Link
              href={inquireHref}
              className="mt-10 inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
            >
              Send an inquiry
            </Link>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted server-generated JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([businessSchema, breadcrumbsSchema]),
        }}
      />
    </article>
  )
}
