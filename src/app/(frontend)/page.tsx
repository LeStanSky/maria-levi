import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

export default function HomePage() {
  return (
    <>
      <Section>
        <Container size="narrow">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
            Maria Levi · Photography
          </p>
          <Heading level={1} size="display">
            I don&apos;t just create photos.
            <br />I care about the woman behind them.
          </Heading>
          <Text className="mt-8 max-w-prose text-soft">
            Editorial · Personal brand · Commercial photography. Based in New Jersey — serving
            Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.
          </Text>
        </Container>
      </Section>
      <Section>
        <Container size="narrow">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-4">
            Phase 0 · Foundation
          </p>
          <Heading level={2} size="lg">
            Type system check
          </Heading>
          <div className="mt-8 space-y-4">
            <p className="font-display text-4xl font-light tracking-tight">
              Fraunces variable — display
            </p>
            <p className="font-body text-base">
              Inter variable — body. The quick brown fox jumps over the lazy dog. 1234567890.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
