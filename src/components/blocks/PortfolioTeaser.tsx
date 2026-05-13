import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { isMedia } from '@/lib/media'
import type { PortfolioCategory, PortfolioSery } from '@/payload-types'

type Props = {
  eyebrow?: string | null
  headline?: string | null
  subtitle?: string | null
  series?: (number | PortfolioSery)[] | null
  viewAllLink?: string | null
}

function seriesHref(s: PortfolioSery) {
  const cat = s.category as PortfolioCategory | number
  const catSlug = typeof cat === 'object' ? cat.slug : ''
  return `/portfolio/${catSlug}/${s.slug}`
}

export function PortfolioTeaser({ eyebrow, headline, subtitle, series, viewAllLink }: Props) {
  const items = (series ?? []).filter((s): s is PortfolioSery => typeof s === 'object')
  if (items.length === 0) return null

  return (
    <Section padding="md">
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
          {subtitle && (
            <Text tone="soft" className="mt-4 max-w-prose mx-auto">
              {subtitle}
            </Text>
          )}
        </div>

        <div className="grid gap-6 md:gap-10 md:grid-cols-3">
          {items.map((s) => (
            <Link key={s.id} href={seriesHref(s)} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
                {isMedia(s.coverImage) && (
                  <Image
                    media={s.coverImage}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-4">
                {s.eyebrow && (
                  <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-2">
                    {s.eyebrow}
                  </p>
                )}
                <Heading level={3} size="md" className="group-hover:text-soft transition-colors">
                  {s.title}
                </Heading>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={viewAllLink ?? '/portfolio'}
            className="inline-flex items-center font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
          >
            View all work →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
