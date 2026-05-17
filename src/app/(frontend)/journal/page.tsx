import type { Metadata } from 'next'
import Link from 'next/link'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { BlogCategory } from '@/payload-types'

export const revalidate = 60

type Props = { searchParams: Promise<{ category?: string }> }

const getCategories = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-categories',
    sort: 'name',
    limit: 100,
    draft: false,
  })
  return result.docs
})

const getPosts = cache(async (categorySlug?: string) => {
  const payload = await getPayloadClient()

  let categoryId: number | undefined
  if (categorySlug) {
    const catResult = await payload.find({
      collection: 'blog-categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
      draft: false,
    })
    categoryId = catResult.docs[0]?.id
    if (!categoryId) return []
  }

  const result = await payload.find({
    collection: 'blog-posts',
    where: categoryId ? { categories: { in: [categoryId] } } : undefined,
    sort: '-publishDate',
    limit: 100,
    draft: false,
  })
  return result.docs
})

export const metadata: Metadata = buildMetadata({
  fallbackTitle: 'Journal · Maria Levi Photography',
  fallbackDescription:
    'Behind-the-scenes notes, branding shoot guides, and reflections on photographing the woman behind the frame.',
  path: '/journal',
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function JournalIndexPage({ searchParams }: Props) {
  const { category: activeCategory } = await searchParams
  const [categories, posts] = await Promise.all([getCategories(), getPosts(activeCategory)])

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
            Journal
          </p>
          <Heading level={1} size="display" className="text-center">
            Notes from the studio
          </Heading>
          <Text tone="soft" className="mt-8 text-center max-w-prose mx-auto">
            Branding guides, on-set reflections, and the small craft details behind every shoot.
          </Text>
        </Container>
      </Section>

      {categories.length > 0 && (
        <Section padding="sm">
          <Container size="content">
            <nav aria-label="Categories" className="border-y border-line py-4">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 font-body uppercase text-xs tracking-[0.18em]">
                <li>
                  <Link
                    href="/journal"
                    className={
                      !activeCategory
                        ? 'text-ink underline underline-offset-4'
                        : 'text-soft hover:text-ink transition-colors'
                    }
                  >
                    All
                  </Link>
                </li>
                {categories.map((cat: BlogCategory) => (
                  <li key={cat.id}>
                    <Link
                      href={`/journal?category=${cat.slug}`}
                      className={
                        activeCategory === cat.slug
                          ? 'text-ink underline underline-offset-4'
                          : 'text-soft hover:text-ink transition-colors'
                      }
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </Section>
      )}

      <Section padding="md">
        <Container size="content">
          {posts.length === 0 ? (
            <Text tone="muted" className="text-center">
              {activeCategory ? 'No entries in this category yet.' : 'New entries coming soon.'}
            </Text>
          ) : (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                    {post.coverImage && (
                      <Image
                        media={post.coverImage}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-body uppercase text-[11px] tracking-[0.18em] text-muted mb-2">
                      {formatDate(post.publishDate)}
                    </p>
                    <Heading
                      level={2}
                      size="md"
                      className="group-hover:text-soft transition-colors"
                    >
                      {post.title}
                    </Heading>
                    {post.excerpt && (
                      <Text tone="soft" size="sm" className="mt-2 line-clamp-2">
                        {post.excerpt}
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
