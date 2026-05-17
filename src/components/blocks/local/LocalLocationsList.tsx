import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

type Location = {
  name: string
  address?: string | null
  description?: string | null
  id?: string | null
}

export function LocalLocationsList({
  headline,
  locations,
}: {
  headline?: string | null
  locations?: Location[] | null
}) {
  const items = locations ?? []
  if (items.length === 0) return null

  return (
    <Section padding="md" className="border-t border-line">
      <Container size="content">
        {headline && (
          <Heading level={2} size="xl" className="text-center">
            {headline}
          </Heading>
        )}
        <ul className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((loc, i) => (
            <li key={loc.id ?? `${loc.name}-${i}`} className="border-l border-line pl-6">
              <Heading level={3} size="md">
                {loc.name}
              </Heading>
              {loc.address && (
                <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-muted">
                  {loc.address}
                </p>
              )}
              {loc.description && (
                <Text tone="soft" size="sm" className="mt-4">
                  {loc.description}
                </Text>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
