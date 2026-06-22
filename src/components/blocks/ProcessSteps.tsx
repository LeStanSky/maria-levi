import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

type Step = { title: string; description?: string | null; id?: string | null }

type Props = {
  eyebrow?: string | null
  headline?: string | null
  steps: Step[]
}

export function ProcessSteps({ eyebrow, headline, steps }: Props) {
  if (!steps || steps.length === 0) return null

  return (
    <Section padding="sm" className="border-t border-line">
      <Container size="content">
        {eyebrow && (
          <p className="mb-6 text-center font-body text-xs uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        )}
        {headline && (
          <Heading level={2} size="xl" className="text-center">
            {headline}
          </Heading>
        )}
        <ol className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.id ?? `step-${i}`}>
              <p className="font-display text-5xl font-light leading-none text-muted">
                {String(i + 1).padStart(2, '0')}
              </p>
              <Heading level={3} size="md" className="mt-6">
                {step.title}
              </Heading>
              {step.description && (
                <Text tone="soft" className="mt-3 text-sm">
                  {step.description}
                </Text>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
