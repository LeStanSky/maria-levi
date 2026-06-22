import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import type { MediaLike } from '@/lib/media'

type Props = {
  eyebrow?: string | null
  headline: string
  subheadline?: string | null
  priceText?: string | null
  image?: MediaLike
  ctaLabel: string
  ctaLink: string
}

export function CampaignHero({
  eyebrow,
  headline,
  subheadline,
  priceText,
  image,
  ctaLabel,
  ctaLink,
}: Props) {
  return (
    <Section padding="lg">
      <Container size="content">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {eyebrow && (
              <p className="mb-6 font-body text-xs uppercase tracking-[0.18em] text-muted">
                {eyebrow}
              </p>
            )}
            <Heading level={1} size="display">
              {headline}
            </Heading>
            {subheadline && (
              <Text tone="soft" className="mt-8 max-w-prose text-lg">
                {subheadline}
              </Text>
            )}
            {priceText && (
              <p className="mt-8 font-display text-2xl font-light text-ink">{priceText}</p>
            )}
            <Link
              href={ctaLink}
              className="mt-10 inline-flex items-center justify-center rounded-[2px] bg-ink px-11 py-4.5 font-body text-xs font-medium uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:tracking-[0.28em] hover:bg-[#2c2a26]"
            >
              {ctaLabel}
            </Link>
          </div>
          {image && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                media={image}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
