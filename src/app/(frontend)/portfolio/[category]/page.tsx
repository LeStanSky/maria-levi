import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ category: string }> }

export const revalidate = 60

const getCategory = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-categories',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: false,
  })
  return result.docs[0]
})

const getSeriesForCategory = cache(async (categoryId: number) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-series',
    where: { category: { equals: categoryId } },
    sort: 'displayOrder',
    limit: 100,
    draft: false,
  })
  return result.docs
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'portfolio-categories',
    limit: 100,
    draft: false,
  })
  return result.docs.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const data = await getCategory(category)
  if (!data) return {}
  return buildMetadata({
    seo: data.seo,
    fallbackTitle: `${data.name} Portfolio · Maria Levi`,
    fallbackDescription: data.subtitle ?? undefined,
    fallbackImage: data.coverImage,
    path: `/portfolio/${data.slug}`,
  })
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category: categorySlug } = await params
  const category = await getCategory(categorySlug)
  if (!category) notFound()

  const series = await getSeriesForCategory(category.id)

  return (
    <article>
      <Section padding="lg">
        <Container size="content">
          <Breadcrumbs
            items={[{ label: 'Portfolio', href: '/portfolio' }, { label: category.name }]}
          />
          <div className="mt-10 max-w-(--container-prose)">
            {category.eyebrow && (
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
                {category.eyebrow}
              </p>
            )}
            <Heading level={1} size="display">
              {category.name}
            </Heading>
            {category.subtitle && (
              <Text tone="soft" className="mt-6 text-lg">
                {category.subtitle}
              </Text>
            )}
            {category.description && (
              <div className="mt-10 prose max-w-(--container-prose)">
                <RichText data={category.description} />
              </div>
            )}
          </div>

          {category.hasSubcategories &&
            category.subcategories &&
            category.subcategories.length > 0 && (
              <nav className="mt-12 border-t border-line pt-6">
                <ul className="flex flex-wrap gap-x-8 gap-y-3 font-body uppercase text-xs tracking-[0.18em]">
                  <li>
                    <Link
                      href={`/portfolio/${category.slug}`}
                      className="text-ink underline underline-offset-4"
                    >
                      All
                    </Link>
                  </li>
                  {category.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/portfolio/${category.slug}/${sub.slug}`}
                        className="text-soft hover:text-ink transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
        </Container>
      </Section>

      <Section padding="md">
        <Container size="content">
          {series.length === 0 ? (
            <Text tone="muted" className="text-center">
              Series for this category are coming soon.
            </Text>
          ) : (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {series.map((s) => (
                <Link
                  key={s.id}
                  href={`/portfolio/${category.slug}/${s.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
                    {s.coverImage && (
                      <Image
                        media={s.coverImage}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    {s.eyebrow && (
                      <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-2">
                        {s.eyebrow}
                      </p>
                    )}
                    <Heading
                      level={3}
                      size="md"
                      className="group-hover:text-soft transition-colors"
                    >
                      {s.title}
                    </Heading>
                    {s.tagline && (
                      <Text tone="soft" size="sm" className="mt-2">
                        {s.tagline}
                      </Text>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </article>
  )
}
