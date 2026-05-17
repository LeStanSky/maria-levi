import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { RichText } from '@/lib/richtext'
import type { Service } from '@/payload-types'

type RichTextData = Parameters<typeof RichText>[0]['data']

function isService(value: number | Service | null | undefined): value is Service {
  return typeof value === 'object' && value !== null
}

export function ServiceForCity({
  service,
  localHeadline,
  localDescription,
}: {
  service?: number | Service | null
  localHeadline?: string | null
  localDescription?: RichTextData
}) {
  if (!isService(service)) return null

  const headline = localHeadline ?? service.name
  const slug = service.slug

  return (
    <Section padding="md" className="border-t border-line">
      <Container size="content">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:items-start">
          <div>
            {service.eyebrow && (
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-4">
                {service.eyebrow}
              </p>
            )}
            <Heading level={2} size="xl">
              {headline}
            </Heading>
            {service.tagline && !localDescription && (
              <Text tone="soft" className="mt-6">
                {service.tagline}
              </Text>
            )}
          </div>
          <div>
            {localDescription ? (
              <div className="prose prose--sm">
                <RichText data={localDescription} />
              </div>
            ) : service.tagline ? (
              <Text tone="soft">{service.tagline}</Text>
            ) : null}
            {slug && (
              <Link
                href={`/services/${slug}`}
                className="mt-8 inline-flex items-center font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
              >
                Explore {service.name}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
