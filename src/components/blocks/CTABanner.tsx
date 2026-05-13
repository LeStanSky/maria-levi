import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { isMedia, type MediaLike } from '@/lib/media'
import { RichText } from '@/lib/richtext'

type Props = {
  headline: string
  body?: Parameters<typeof RichText>[0]['data']
  ctaLabel: string
  ctaLink: string
  backgroundImage?: MediaLike
}

export function CTABanner({ headline, body, ctaLabel, ctaLink, backgroundImage }: Props) {
  const hasBg = isMedia(backgroundImage)

  return (
    <Section padding="lg" className={hasBg ? 'relative overflow-hidden' : 'border-t border-line'}>
      {hasBg && (
        <>
          <Image media={backgroundImage} fill sizes="100vw" className="object-cover -z-10" />
          <div className="absolute inset-0 bg-ink/60 -z-10" />
        </>
      )}
      <Container size="prose">
        <div className={`text-center ${hasBg ? 'text-bg' : 'text-ink'}`}>
          <Heading level={2} size="2xl">
            {headline}
          </Heading>
          {body && (
            <div className={`prose mt-6 mx-auto ${hasBg ? 'text-bg/80' : ''}`}>
              <RichText data={body} />
            </div>
          )}
          <Link
            href={ctaLink}
            className={`mt-10 inline-flex items-center justify-center px-11 py-4.5 font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em] ${
              hasBg ? 'bg-bg text-ink hover:bg-bg-subtle' : 'bg-ink text-bg hover:bg-[#2c2a26]'
            }`}
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </Section>
  )
}
