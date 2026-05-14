import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import type { FaqEntry, PortfolioSery, Testimonial } from '@/payload-types'

export const revalidate = 60

const TITLE_BY_NICHE: Record<string, string> = {
  'personal-brand': 'Personal Brand Photographer NYC & New Jersey · Maria Levi',
  portrait: "Women's Portrait Photographer New Jersey · Maria Levi",
  'model-tests': 'Model Test Photographer NYC · Maria Levi',
  commercial: 'Commercial & Brand Photographer New Jersey · Maria Levi',
}

const getService = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const [serviceResult, siteSettings] = await Promise.all([
    payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      draft: false,
    }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])
  return { service: serviceResult.docs[0] ?? null, siteSettings }
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: 'services',
    limit: 50,
    select: { slug: true },
    depth: 0,
  })
  return services.docs
    .map((s) => (s.slug ? { niche: s.slug } : null))
    .filter((p): p is { niche: string } => p !== null)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>
}): Promise<Metadata> {
  const { niche } = await params
  const { service } = await getService(niche)
  if (!service) return {}

  const fallbackTitle = service.nicheKey
    ? (TITLE_BY_NICHE[service.nicheKey] ?? `${service.name} · Maria Levi`)
    : `${service.name} · Maria Levi`

  return buildMetadata({
    seo: service.seo,
    fallbackTitle,
    fallbackDescription: service.tagline ?? undefined,
    fallbackImage: service.heroImage,
    path: `/services/${niche}`,
  })
}

function isPopulated<T extends { id: string | number }>(
  value: T | string | number | undefined | null,
): value is T {
  return typeof value === 'object' && value !== null
}

export default async function NicheServicePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params
  const { service, siteSettings } = await getService(niche)
  if (!service) notFound()

  const taxNote = siteSettings?.taxNote ?? null
  const travelNote = siteSettings?.travelNote ?? null
  const additionalNote = siteSettings?.additionalNote ?? null

  const inquireHref = `/contact?session_type=${service.nicheKey}`

  const relatedSeries: PortfolioSery[] = (service.relatedSeries ?? []).filter(isPopulated)
  const relatedTestimonials: Testimonial[] = (service.relatedTestimonials ?? []).filter(isPopulated)
  const relatedFaqs: FaqEntry[] = (service.faqs ?? []).filter(isPopulated)

  const offers =
    service.hasPackages && service.packages?.length
      ? service.packages.map((pkg) => ({
          '@type': 'Offer',
          name: pkg.name,
          price: pkg.priceFrom,
          priceCurrency: 'USD',
          url: `https://marialeviphoto.com/services/${service.slug}`,
        }))
      : []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.tagline ?? undefined,
    provider: {
      '@type': 'Photographer',
      name: 'Maria Levi',
      url: 'https://marialeviphoto.com',
    },
    ...(offers.length > 0 && {
      offers: {
        '@type': 'OfferCatalog',
        name: `${service.name} packages`,
        itemListElement: offers,
      },
    }),
  }

  return (
    <article>
      {/* Hero */}
      <Section padding="lg">
        <Container size="prose">
          {service.eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              {service.eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-center">
            {service.name}
          </Heading>
          {service.tagline && (
            <Text tone="soft" className="mt-8 text-center max-w-prose mx-auto text-lg">
              {service.tagline}
            </Text>
          )}
        </Container>

        {service.heroImage && typeof service.heroImage === 'object' && (
          <Container size="content" className="mt-16">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                media={service.heroImage}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        )}
      </Section>

      {/* Description */}
      {service.description && (
        <Section padding="md">
          <Container size="prose">
            <RichText data={service.description} className="prose" />
          </Container>
        </Section>
      )}

      {/* Process steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              How it works
            </Heading>
            <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {service.processSteps.map((step, i) => (
                <li key={step.id ?? `step-${i}`}>
                  <p className="font-display text-5xl font-light text-muted leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <Heading level={3} size="md" className="mt-6">
                    {step.title}
                  </Heading>
                  {step.description && (
                    <Text tone="soft" className="mt-3 text-sm">
                      {step.description}
                    </Text>
                  )}
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* Packages OR commercialNote */}
      <Section padding="md" className="border-t border-line">
        <Container size="content">
          <Heading level={2} size="xl" className="text-center">
            Investment
          </Heading>

          {service.hasPackages && service.packages?.length ? (
            <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {service.packages.map((pkg) => (
                <article
                  key={pkg.id ?? pkg.name}
                  className={`relative flex flex-col border ${
                    pkg.popular ? 'border-ink' : 'border-line'
                  } p-8`}
                >
                  {pkg.popular && (
                    <p className="absolute -top-3 left-8 bg-bg px-3 font-body uppercase text-[10px] tracking-[0.18em] text-ink">
                      Most popular
                    </p>
                  )}
                  {pkg.image && typeof pkg.image === 'object' && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle -m-8 mb-8">
                      <Image
                        media={pkg.image}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Heading level={3} size="lg">
                    {pkg.name}
                  </Heading>
                  <p className="mt-4 font-display text-3xl font-light text-ink">
                    {pkg.priceLabel ?? `Starting at $${pkg.priceFrom?.toLocaleString('en-US')}`}
                  </p>
                  {pkg.subtitle && (
                    <Text tone="soft" className="mt-3 text-sm">
                      {pkg.subtitle}
                    </Text>
                  )}
                  {pkg.features && pkg.features.length > 0 && (
                    <ul className="mt-8 space-y-3 font-body text-sm text-soft flex-1">
                      {pkg.features.map((feat, i) => (
                        <li key={feat.id ?? `feat-${i}`} className="flex">
                          <span aria-hidden="true" className="mr-3 text-muted">
                            —
                          </span>
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={inquireHref}
                    className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
                  >
                    {pkg.ctaLabel ?? 'Inquire'}
                  </Link>
                </article>
              ))}
            </div>
          ) : service.commercialNote ? (
            <Container size="prose" className="mt-12">
              <RichText data={service.commercialNote} className="prose" />
              <div className="mt-10 text-center">
                <Link
                  href={inquireHref}
                  className="inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
                >
                  Request a quote
                </Link>
              </div>
            </Container>
          ) : (
            <Text tone="soft" className="mt-12 text-center">
              Custom quotes — get in touch to discuss your project.
            </Text>
          )}

          {(taxNote || travelNote || additionalNote) && (
            <Container size="prose" className="mt-16">
              <ul className="font-body text-xs text-muted text-center space-y-2">
                {taxNote && <li>{taxNote}</li>}
                {travelNote && <li>{travelNote}</li>}
                {additionalNote && <li>{additionalNote}</li>}
              </ul>
            </Container>
          )}
        </Container>
      </Section>

      {/* What to wear tip */}
      {service.whatToWearTip && (
        <Section padding="md" className="border-t border-line bg-bg-subtle">
          <Container size="prose">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              Preparation
            </p>
            <Heading level={2} size="xl" className="text-center">
              What to wear
            </Heading>
            <div className="mt-10">
              <RichText data={service.whatToWearTip} className="prose" />
            </div>
          </Container>
        </Section>
      )}

      {/* Related portfolio series */}
      {relatedSeries.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              Selected work
            </Heading>
            <div className="mt-16 grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {relatedSeries.slice(0, 6).map((s) => (
                <Link
                  key={s.id}
                  href={`/portfolio/${isPopulated(s.category) ? s.category.slug : ''}/${s.slug}`}
                  className="group block"
                >
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
                  <p className="mt-4 font-display text-xl font-light tracking-tight text-ink group-hover:text-soft transition-colors">
                    {s.title}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related testimonials */}
      {relatedTestimonials.length > 0 && (
        <Section padding="md" className="border-t border-line bg-bg-subtle">
          <Container size="content">
            <Heading level={2} size="xl" className="text-center">
              In their words
            </Heading>
            <div className="mt-16 space-y-16">
              {relatedTestimonials.slice(0, 3).map((t) => (
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

      {/* Related FAQs */}
      {relatedFaqs.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="prose">
            <Heading level={2} size="xl" className="text-center">
              Frequently asked
            </Heading>
            <div className="mt-16 space-y-4">
              {relatedFaqs.map((faq) => (
                <details key={faq.id} className="group border-b border-line py-6">
                  <summary className="cursor-pointer list-none font-display text-xl font-light text-ink flex items-start justify-between gap-6">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="font-body text-2xl text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-4">
                    <RichText data={faq.answer} className="prose prose--sm" />
                  </div>
                </details>
              ))}
            </div>
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
              Ready to plan a {service.name.toLowerCase()} session?
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </article>
  )
}
