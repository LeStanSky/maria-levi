import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

async function getCategories() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-categories',
    sort: 'displayOrder',
    limit: 100,
    draft: false,
  })
  return result.docs
}

export const metadata: Metadata = buildMetadata({
  fallbackTitle: 'Portfolio · Maria Levi Photography',
  fallbackDescription: 'Selected work across portrait, brand, personal brand, and model tests.',
  path: '/portfolio',
})

export default async function PortfolioIndexPage() {
  const categories = await getCategories()

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
            Selected Work
          </p>
          <Heading level={1} size="display" className="text-center">
            Portfolio
          </Heading>
          <Text tone="soft" className="mt-8 text-center max-w-prose mx-auto">
            Editorial, personal brand, portrait, and commercial work — each shoot built around the
            woman behind the frame.
          </Text>
        </Container>
      </Section>

      <Section padding="md">
        <Container size="content">
          <div className="grid gap-6 md:gap-10 md:grid-cols-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/portfolio/${cat.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-subtle">
                  {cat.coverImage && (
                    <Image
                      media={cat.coverImage}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-6">
                  <Heading level={2} size="lg" className="group-hover:text-soft transition-colors">
                    {cat.name}
                  </Heading>
                  {cat.subtitle && (
                    <Text tone="soft" className="mt-2">
                      {cat.subtitle}
                    </Text>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </article>
  )
}
