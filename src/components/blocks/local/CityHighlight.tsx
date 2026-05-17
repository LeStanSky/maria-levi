import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { isMedia, type MediaLike } from '@/lib/media'
import { RichText } from '@/lib/richtext'

type RichTextData = Parameters<typeof RichText>[0]['data']

export function CityHighlight({
  name,
  description,
  image,
}: {
  name: string
  description?: RichTextData
  image?: MediaLike
}) {
  return (
    <Section padding="md" className="border-t border-line">
      <Container size="content">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {isMedia(image) && (
            <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle">
              <Image
                media={image}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className={isMedia(image) ? undefined : 'md:col-span-2'}>
            <Heading level={3} size="xl">
              {name}
            </Heading>
            {description && (
              <div className="mt-6 prose prose--sm">
                <RichText data={description} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
