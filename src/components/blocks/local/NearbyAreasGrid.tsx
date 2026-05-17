import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { isMedia, type MediaLike } from '@/lib/media'

type Area = {
  name: string
  link?: string | null
  image?: MediaLike
  id?: string | null
}

export function NearbyAreasGrid({
  headline,
  areas,
}: {
  headline?: string | null
  areas?: Area[] | null
}) {
  const items = areas ?? []
  if (items.length === 0) return null

  return (
    <Section padding="md" className="border-t border-line">
      <Container size="content">
        {headline && (
          <Heading level={2} size="xl" className="text-center">
            {headline}
          </Heading>
        )}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((area, i) => {
            const inner = (
              <>
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle">
                  {isMedia(area.image) && (
                    <Image
                      media={area.image}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <Heading
                  level={3}
                  size="md"
                  className="mt-4 group-hover:text-soft transition-colors"
                >
                  {area.name}
                </Heading>
              </>
            )

            return area.link ? (
              <Link key={area.id ?? `${area.name}-${i}`} href={area.link} className="group block">
                {inner}
              </Link>
            ) : (
              <div key={area.id ?? `${area.name}-${i}`} className="group block">
                {inner}
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
