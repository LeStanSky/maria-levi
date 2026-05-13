import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

export default function NotFound() {
  return (
    <Section padding="lg">
      <Container size="prose">
        <div className="text-center">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">404</p>
          <Heading level={1} size="2xl">
            This page wandered off.
          </Heading>
          <Text tone="soft" className="mt-6">
            Let&apos;s get you back to something interesting.
          </Text>
          <div className="mt-10 flex flex-wrap justify-center gap-6 font-body uppercase text-xs tracking-[0.18em]">
            <Link href="/" className="text-ink underline underline-offset-4 hover:no-underline">
              Home
            </Link>
            <Link
              href="/portfolio"
              className="text-ink underline underline-offset-4 hover:no-underline"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-ink underline underline-offset-4 hover:no-underline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-ink underline underline-offset-4 hover:no-underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
