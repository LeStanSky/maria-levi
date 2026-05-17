import { Container } from '@/components/primitives/Container'
import { Section } from '@/components/primitives/Section'
import { RichText } from '@/lib/richtext'

export function BlogTipCallout({ tip }: { tip: Parameters<typeof RichText>[0]['data'] }) {
  return (
    <Section padding="sm">
      <Container size="prose">
        <aside className="bg-bg-subtle border-l-2 border-ink px-6 py-5 md:px-8 md:py-6">
          <p className="font-body uppercase text-[11px] tracking-[0.18em] text-muted mb-3">
            Tip from Maria
          </p>
          <div className="prose prose-sm">
            <RichText data={tip} />
          </div>
        </aside>
      </Container>
    </Section>
  )
}
