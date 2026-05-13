import { Container } from '@/components/primitives/Container'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { isMedia, type MediaLike } from '@/lib/media'
import { RichText } from '@/lib/richtext'

export function RichTextBlock({ content }: { content: Parameters<typeof RichText>[0]['data'] }) {
  return (
    <Section padding="sm">
      <Container size="prose">
        <div className="prose">
          <RichText data={content} />
        </div>
      </Container>
    </Section>
  )
}

const MEDIA_WIDTH = {
  narrow: 'prose',
  wide: 'content',
  full: 'wide',
} as const

export function MediaBlock({
  image,
  caption,
  width,
}: {
  image: MediaLike
  caption?: string | null
  width?: 'narrow' | 'wide' | 'full' | null
}) {
  const size = MEDIA_WIDTH[width ?? 'wide']
  if (!isMedia(image)) return null

  return (
    <Section padding="sm">
      <Container size={size}>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              media={image}
              fill
              sizes={size === 'prose' ? '640px' : size === 'content' ? '1280px' : '100vw'}
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-4 font-body text-sm text-muted text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      </Container>
    </Section>
  )
}

export function PullQuote({
  quote,
  attribution,
  style,
}: {
  quote: string
  attribution?: string | null
  style?: 'bordered' | 'plain' | null
}) {
  const bordered = (style ?? 'bordered') === 'bordered'
  return (
    <Section padding="sm">
      <Container size="prose">
        <figure className={`text-center ${bordered ? 'py-12 border-y border-line' : ''}`}>
          <blockquote className="font-display text-2xl md:text-3xl font-light italic leading-snug tracking-tight text-ink">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {attribution && (
            <figcaption className="mt-6 font-body uppercase text-xs tracking-[0.18em] text-muted">
              {attribution}
            </figcaption>
          )}
        </figure>
      </Container>
    </Section>
  )
}

export function Spacer({ size }: { size?: 'small' | 'medium' | 'large' | 'xl' | null }) {
  const heights = { small: 'h-12', medium: 'h-24', large: 'h-40', xl: 'h-64' }
  return <div aria-hidden="true" className={heights[size ?? 'medium']} />
}

export function ImagePair({
  images,
  caption,
}: {
  images?: Array<{ image: MediaLike; id?: string | null }> | null
  caption?: string | null
}) {
  const pair = (images ?? []).filter((i) => isMedia(i.image))
  if (pair.length === 0) return null

  return (
    <Section padding="sm">
      <Container size="content">
        <div className="grid gap-6 md:grid-cols-2">
          {pair.map((item, i) => (
            <div key={item.id ?? `pair-${i}`} className="relative aspect-[3/4] overflow-hidden">
              <Image
                media={item.image}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {caption && <p className="mt-6 font-body text-sm text-muted text-center">{caption}</p>}
      </Container>
    </Section>
  )
}
