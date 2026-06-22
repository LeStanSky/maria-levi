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
        {/* Headline sits across the top (full width) on desktop rather than
            beside the photo — tighter leading + balanced wrapping keep it dense. */}
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="mb-5 font-body text-xs uppercase tracking-[0.18em] text-muted">
              {eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-balance lg:leading-[1.02]">
            {headline}
          </Heading>
        </div>

        {/* Supporting details beside the photo, below the headline. */}
        <div className="mt-8 grid items-center gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {subheadline && (
              <Text tone="soft" className="max-w-prose text-lg">
                {subheadline}
              </Text>
            )}
            {priceText && (
              <p className="mt-6 font-display text-2xl font-light text-ink">{priceText}</p>
            )}
            <Link
              href={ctaLink}
              className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-ink px-11 py-4.5 font-body text-xs font-medium uppercase tracking-[0.18em] text-bg transition-all duration-300 hover:tracking-[0.28em] hover:bg-[#2c2a26]"
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
