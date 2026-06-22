import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import type { Service } from '@/payload-types'

type Props = {
  eyebrow?: string | null
  headline?: string | null
  service?: number | Service | null
  note?: string | null
}

// CTA target for this landing. `source` flows into the Lead's pageSubmittedFrom
// for ad attribution; `session_type` pre-selects the contact-form dropdown.
const CTA_LINK = '/contact?session_type=personal-brand&source=personal-branding'

export function PricingCards({ eyebrow, headline, service, note }: Props) {
  // Relationship is populated at the page query depth; bail if not.
  if (typeof service !== 'object' || service === null) return null

  const packages = service.packages ?? []
  if (packages.length === 0) return null

  const gridClass =
    packages.length >= 3
      ? 'md:grid-cols-2 lg:grid-cols-3'
      : packages.length === 2
        ? 'mx-auto max-w-3xl md:grid-cols-2'
        : 'mx-auto max-w-sm'

  return (
    <Section padding="sm" className="border-t border-line">
      <Container size="content">
        {eyebrow && (
          <p className="mb-6 text-center font-body text-xs uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        )}
        {headline && (
          <Heading level={2} size="xl" className="text-center">
            {headline}
          </Heading>
        )}

        <div className={`mt-10 grid justify-center gap-10 md:gap-8 ${gridClass}`}>
          {packages.map((pkg) => (
            <article
              key={pkg.id ?? pkg.name}
              className={`relative flex flex-col border ${pkg.popular ? 'border-ink' : 'border-line'} p-8`}
            >
              {pkg.popular && (
                <p className="absolute -top-3 left-8 bg-bg px-3 font-body text-[10px] uppercase tracking-[0.18em] text-ink">
                  Most popular
                </p>
              )}
              {pkg.image && typeof pkg.image === 'object' && (
                <div className="relative -m-8 mb-8 aspect-[4/5] overflow-hidden bg-bg-subtle">
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
                <ul className="mt-8 flex-1 space-y-3 font-body text-sm text-soft">
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
                href={CTA_LINK}
                className="mt-10 inline-flex items-center justify-center rounded-[2px] bg-ink px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:tracking-[0.28em]"
              >
                {pkg.ctaLabel ?? 'Book a Session'}
              </Link>
            </article>
          ))}
        </div>

        {note && (
          <Container size="prose" className="mt-10">
            <p className="text-center font-body text-xs text-muted">{note}</p>
          </Container>
        )}
      </Container>
    </Section>
  )
}
