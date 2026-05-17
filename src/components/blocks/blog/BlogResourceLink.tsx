import { Container } from '@/components/primitives/Container'
import { Section } from '@/components/primitives/Section'

export function BlogResourceLink({
  title,
  description,
  url,
  label,
}: {
  title: string
  description?: string | null
  url: string
  label?: string | null
}) {
  const isExternal = /^https?:\/\//i.test(url)

  return (
    <Section padding="sm">
      <Container size="prose">
        <a
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="block border border-line p-6 md:p-8 hover:border-ink transition-colors group"
        >
          <p className="font-body uppercase text-[11px] tracking-[0.18em] text-muted mb-2">
            Resource
          </p>
          <h3 className="font-display text-xl md:text-2xl font-light tracking-tight leading-snug text-ink">
            {title}
          </h3>
          {description && (
            <p className="mt-3 font-body text-sm leading-relaxed text-soft">{description}</p>
          )}
          <p className="mt-5 font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 group-hover:no-underline">
            {label ?? 'Visit →'}
          </p>
        </a>
      </Container>
    </Section>
  )
}
