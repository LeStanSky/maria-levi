import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

export default function HomePage() {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
          Maria Levi · Photography
        </p>
        <Heading level={1} size="display">
          I don&apos;t just create photos.
          <br />I care about the woman behind them.
        </Heading>
        <Text tone="soft" className="mt-8 max-w-prose text-lg">
          Editorial · Personal brand · Commercial photography. Based in New Jersey — serving
          Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.
        </Text>
        <div className="mt-12 flex flex-wrap gap-6 font-body uppercase text-xs tracking-[0.18em]">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
          >
            View portfolio
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-11 py-4.5 border border-ink text-ink rounded-[2px] transition-all duration-300 hover:bg-ink hover:text-bg"
          >
            About Maria
          </Link>
        </div>
      </Container>
    </Section>
  )
}
