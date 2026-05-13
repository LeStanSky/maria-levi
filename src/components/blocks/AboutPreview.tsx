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
}

export function AboutPreview({ eyebrow, headline, body, image, ctaLabel, ctaLink }: Props) {
  return (
    <Section padding="md">
      <Container size="content">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
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
            <Link
              href={ctaLink ?? '/about'}
              className="mt-10 inline-flex items-center font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
            >
              {ctaLabel ?? 'Read my story'} →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
