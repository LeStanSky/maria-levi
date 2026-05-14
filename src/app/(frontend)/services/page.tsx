import type { Metadata } from 'next'
import Link from 'next/link'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import type { Service } from '@/payload-types'

export const revalidate = 60

const getServicesIndex = cache(async () => {
  const payload = await getPayloadClient()
  const [page, siteSettings, allServices] = await Promise.all([
    payload.findGlobal({ slug: 'services-index', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'services',
      sort: 'displayOrder',
      limit: 50,
      depth: 2,
      draft: false,
    }),
  ])

  const orderedFromGlobal =
    page?.niches
      ?.map((n) => (typeof n === 'object' ? n : null))
      .filter((n): n is Service => n !== null) ?? []

  const services = orderedFromGlobal.length > 0 ? orderedFromGlobal : allServices.docs

  return { page, siteSettings, services }
})

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getServicesIndex()
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'Services · Photography Investment · Maria Levi',
    fallbackDescription:
      'Personal brand, portrait, model test, and commercial photography across New York & New Jersey.',
    path: '/services',
  })
}

function priceHint(service: Service): string {
  if (!service.hasPackages || !service.packages?.length) return 'Custom quotes'
  const min = Math.min(
    ...service.packages.map((p) => p.priceFrom).filter((n): n is number => typeof n === 'number'),
  )
  if (!Number.isFinite(min)) return 'Custom quotes'
  return `from $${min.toLocaleString('en-US')}`
}

export default async function ServicesIndexPage() {
  const { page, siteSettings, services } = await getServicesIndex()

  const headline = page?.headline ?? 'Services & Investment'
  const eyebrow = page?.eyebrow
  const taxNote = page?.taxNoteOverride?.trim() || siteSettings?.taxNote || null
  const travelNote = siteSettings?.travelNote || null

  const offers = services.flatMap((s) => {
    if (!s.hasPackages || !s.packages?.length) return []
    return s.packages.map((pkg) => ({
      '@type': 'Offer',
      name: `${s.name} — ${pkg.name}`,
      price: pkg.priceFrom,
      priceCurrency: 'USD',
      url: `https://marialeviphoto.com/services/${s.slug}`,
    }))
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: headline,
    itemListElement: offers,
  }

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          {eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              {eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-center">
            {headline}
          </Heading>
          {page?.subtitle && (
            <div className="mt-10">
              <RichText data={page.subtitle} className="prose text-center mx-auto" />
            </div>
          )}
        </Container>
      </Section>

      <Section padding="md">
        <Container size="content">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group block"
                aria-label={`Learn more about ${s.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle">
                  {s.coverImage && typeof s.coverImage === 'object' && (
                    <Image
                      media={s.coverImage}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-6">
                  <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-2">
                    {priceHint(s)}
                  </p>
                  <Heading level={2} size="lg" className="group-hover:text-soft transition-colors">
                    {s.name}
                  </Heading>
                  {s.tagline && (
                    <Text tone="soft" className="mt-3">
                      {s.tagline}
                    </Text>
                  )}
                  <p className="mt-6 font-body uppercase text-xs tracking-[0.18em] text-ink underline-offset-4 group-hover:underline">
                    Learn more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {(taxNote || travelNote) && (
        <Section padding="sm" className="border-t border-line">
          <Container size="prose">
            <ul className="font-body text-xs text-muted text-center space-y-2">
              {taxNote && <li>{taxNote}</li>}
              {travelNote && <li>{travelNote}</li>}
            </ul>
          </Container>
        </Section>
      )}

      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              Let&apos;s work together
            </p>
            <Heading level={2} size="xl">
              Ready to plan a session?
            </Heading>
            <Link
              href="/contact"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </article>
  )
}
