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
  services?: (number | Service)[] | null
  displayMode?: 'grid' | 'list' | null
}

function lowestPrice(svc: Service): number | null {
  if (!svc.hasPackages || !svc.packages) return null
  const prices = svc.packages
    .map((p) => p.priceFrom)
    .filter((p): p is number => typeof p === 'number')
  return prices.length > 0 ? Math.min(...prices) : null
}

export function ServicesTeaser({ eyebrow, headline, services }: Props) {
  const items = (services ?? []).filter((s): s is Service => typeof s === 'object')
  if (items.length === 0) return null

  return (
    <Section padding="md" className="bg-bg-subtle">
      <Container size="content">
        <div className="text-center mb-12">
          {eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              {eyebrow}
            </p>
          )}
          {headline && (
            <Heading level={2} size="xl">
              {headline}
            </Heading>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((svc) => {
            const price = lowestPrice(svc)
            return (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group block bg-bg p-8 border border-line hover:border-ink transition-colors"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-bg-subtle">
                  {svc.heroImage && (
                    <Image
                      media={svc.heroImage}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <Heading level={3} size="md">
                  {svc.name}
                </Heading>
                {svc.tagline && (
                  <Text tone="soft" size="sm" className="mt-2">
                    {svc.tagline}
                  </Text>
                )}
                {price && (
                  <p className="mt-4 font-body uppercase text-xs tracking-[0.18em] text-muted">
                    From ${price}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
