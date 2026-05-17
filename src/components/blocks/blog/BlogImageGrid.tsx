import { Container } from '@/components/primitives/Container'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { isMedia, type MediaLike } from '@/lib/media'

type GridImage = {
  image: MediaLike
  caption?: string | null
  id?: string | null
}

export function BlogImageGrid({ images }: { images?: GridImage[] | null }) {
  const items = (images ?? []).filter((i) => isMedia(i.image))
  if (items.length === 0) return null

  const cols = items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <Section padding="sm">
      <Container size="content">
        <div className={`grid gap-4 ${cols}`}>
          {items.map((item, i) => (
            <figure key={item.id ?? `grid-${i}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
                <Image
                  media={item.image}
                  fill
                  sizes={
                    items.length === 2
                      ? '(min-width: 768px) 50vw, 100vw'
                      : '(min-width: 768px) 33vw, 100vw'
                  }
                  className="object-cover"
                />
              </div>
              {item.caption && (
                <figcaption className="mt-3 font-body text-xs text-muted">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}
