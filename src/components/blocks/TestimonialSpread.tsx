import { Container } from '@/components/primitives/Container'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import type { Service, Testimonial } from '@/payload-types'

type Props = {
  testimonial?: number | Testimonial | null
}

export function TestimonialSpread({ testimonial }: Props) {
  if (!testimonial || typeof testimonial !== 'object') return null

  const session = testimonial.sessionType as Service | number | null | undefined
  const sessionLabel = session && typeof session === 'object' ? session.name : null

  return (
    <Section padding="lg">
      <Container size="content">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {testimonial.clientPhoto && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                media={testimonial.clientPhoto}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-8">
              Client Story
            </p>
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-ink">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 font-body text-sm">
              <p className="text-ink font-medium">{testimonial.clientName}</p>
              {sessionLabel && (
                <p className="text-muted uppercase text-xs tracking-[0.18em] mt-1">
                  {sessionLabel}
                </p>
              )}
            </footer>
          </div>
        </div>
      </Container>
    </Section>
  )
}
