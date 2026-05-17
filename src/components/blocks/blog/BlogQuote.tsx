import { Container } from '@/components/primitives/Container'
import { Section } from '@/components/primitives/Section'

export function BlogQuote({ quote, attribution }: { quote: string; attribution?: string | null }) {
  return (
    <Section padding="sm">
      <Container size="prose">
        <figure className="border-l-2 border-ink pl-8 py-2">
          <blockquote className="font-display text-2xl md:text-3xl font-light italic leading-snug tracking-tight text-ink">
            {quote}
          </blockquote>
          {attribution && (
            <figcaption className="mt-4 font-body uppercase text-xs tracking-[0.18em] text-muted">
              — {attribution}
            </figcaption>
          )}
        </figure>
      </Container>
    </Section>
  )
}
