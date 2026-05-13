import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'

async function getAboutPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'about-page', draft: false })
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage()
  return buildMetadata({
    seo: data.seo,
    fallbackTitle: 'About Maria Levi · Fashion Photographer in New Jersey',
    fallbackDescription: undefined,
    fallbackImage: data.heroImage,
    path: '/about',
  })
}

export default async function AboutPage() {
  const data = await getAboutPage()
  if (!data?.headline) notFound()

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          {data.eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              {data.eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-center">
            {data.headline}
          </Heading>
        </Container>

        {data.heroImage && (
          <Container size="content" className="mt-16">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                media={data.heroImage}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        )}
      </Section>

      <Section padding="md">
        <Container size="prose">
          <RichText data={data.bodyPart1} className="prose prose--drop-cap" />

          {data.pullQuote && (
            <figure className="my-16 text-center">
              <hr className="border-line w-12 mx-auto mb-8" />
              <blockquote className="font-display text-3xl lg:text-4xl font-light leading-snug tracking-tight text-ink">
                &ldquo;{data.pullQuote}&rdquo;
              </blockquote>
              {data.pullQuoteAttribution && (
                <figcaption className="mt-6 font-body uppercase text-xs tracking-[0.18em] text-muted">
                  {data.pullQuoteAttribution}
                </figcaption>
              )}
              <hr className="border-line w-12 mx-auto mt-8" />
            </figure>
          )}

          <RichText data={data.bodyPart2} className="prose" />
        </Container>

        {data.imagePair && data.imagePair.length > 0 && (
          <Container size="content" className="mt-16">
            <div className="grid gap-6 md:grid-cols-2">
              {data.imagePair.map((item) =>
                item.image ? (
                  <div key={item.id} className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      media={item.image}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </Container>
        )}

        {data.bodyPart3 && (
          <Container size="prose" className="mt-16">
            <RichText data={data.bodyPart3} className="prose" />
          </Container>
        )}

        {data.signoff && (
          <Container size="prose" className="mt-16">
            <p className="font-display text-2xl font-light italic text-center text-ink leading-snug">
              {data.signoff}
            </p>
          </Container>
        )}
      </Section>

      {data.credits && data.credits.length > 0 && (
        <Section padding="md" className="border-t border-line">
          <Container size="content">
            <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {data.credits.map((credit) => (
                <div key={credit.id}>
                  <dt className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-2">
                    {credit.label}
                  </dt>
                  <dd className="font-display text-lg font-light text-ink">{credit.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      )}

      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              Let&apos;s work together
            </p>
            <Heading level={2} size="xl">
              Have a project in mind?
            </Heading>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
            >
              Get in touch
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
