import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import type { MediaLike } from '@/lib/media'
import { RichText } from '@/lib/richtext'

type Props = {
  eyebrow?: string | null
  headline?: string | null
  body?: Parameters<typeof RichText>[0]['data']
  image?: MediaLike
  ctaLabel?: string | null
  ctaLink?: string | null
  imagePosition?: 'left' | 'right' | null
}

export function IntroBlock({
  eyebrow,
  headline,
  body,
  image,
  ctaLabel,
  ctaLink,
  imagePosition,
}: Props) {
  const reverse = imagePosition === 'left'
  return (
    <Section padding="md">
      <Container size="content">
        <div
          className={`grid gap-12 lg:gap-20 lg:grid-cols-2 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          <div>
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
            {body && (
              <div className="prose mt-8">
                <RichText data={body} />
              </div>
            )}
            {ctaLabel && ctaLink && (
              <Link
                href={ctaLink}
                className="mt-10 inline-flex items-center font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
              >
                {ctaLabel} →
              </Link>
            )}
          </div>
          {image && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                media={image}
                fill
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
