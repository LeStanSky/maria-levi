import type { Metadata } from 'next'
import Link from 'next/link'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { Service, Testimonial } from '@/payload-types'

export const revalidate = 60

const getTestimonials = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: ['displayOrder', '-dateReceived'],
    depth: 1,
  })
  return result.docs
})

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    fallbackTitle: 'Testimonials · Maria Levi Photography',
    fallbackDescription:
      'In their own words — clients on what it’s like to be photographed by Maria.',
    path: '/testimonials',
  })
}

function sessionTypeLabel(testimonial: Testimonial): string | null {
  const value = testimonial.sessionType
  if (!value) return null
  if (typeof value === 'object') return (value as Service).name ?? null
  return null
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
            Words from the studio
          </p>
          <Heading level={1} size="display" className="text-center">
            In their own words.
          </Heading>
          <p className="mt-10 font-body text-base lg:text-lg text-soft leading-relaxed text-center">
            What it’s like to work together — straight from the people who have stood in front of
            the camera.
          </p>
        </Container>
      </Section>

      {testimonials.length === 0 ? (
        <Section padding="md" className="border-t border-line">
          <Container size="prose">
            <p className="font-body text-sm text-muted text-center">New stories are on the way.</p>
          </Container>
        </Section>
      ) : (
        testimonials.map((t, index) => {
          const flip = index % 2 === 1
          const label = sessionTypeLabel(t)
          return (
            <Section key={t.id} padding="md" className="border-t border-line">
              <Container size="content">
                <div
                  className={`grid gap-12 lg:gap-20 lg:grid-cols-2 items-center ${
                    flip ? 'lg:[&>figure]:order-2' : ''
                  }`}
                >
                  {t.clientPhoto ? (
                    <figure className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        media={t.clientPhoto}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </figure>
                  ) : (
                    <figure aria-hidden="true" className="hidden lg:block" />
                  )}

                  <blockquote>
                    {label && (
                      <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
                        {label}
                      </p>
                    )}
                    {t.quoteHeadline && (
                      <Heading level={2} size="lg" className="mb-8">
                        &ldquo;{t.quoteHeadline}&rdquo;
                      </Heading>
                    )}
                    <p className="font-body text-base lg:text-lg text-soft leading-relaxed">
                      {t.quote}
                    </p>
                    <footer className="mt-10 flex items-center gap-4">
                      <hr className="border-line w-10" />
                      <cite className="not-italic font-body uppercase text-xs tracking-[0.18em] text-ink">
                        {t.clientName}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </Container>
            </Section>
          )
        })
      )}

      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              Your story next
            </p>
            <Heading level={2} size="xl">
              Let’s create something together.
            </Heading>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
            >
              Start the conversation
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
