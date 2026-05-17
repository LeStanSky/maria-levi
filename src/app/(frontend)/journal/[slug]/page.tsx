import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { BlogBlocks } from '@/components/blocks/BlogBlocks'
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { BlogPost, PortfolioSery } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 60

const getPost = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0]
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    limit: 200,
    draft: false,
    select: { slug: true },
  })
  return result.docs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return buildMetadata({
    seo: post.seo,
    fallbackTitle: `${post.title} · Maria Levi Photography`,
    fallbackDescription: post.excerpt ?? undefined,
    fallbackImage: post.coverImage,
    path: `/journal/${post.slug}`,
  })
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const relatedPosts = (post.relatedPosts ?? []).filter((p): p is BlogPost => typeof p === 'object')
  const relatedSeries = (post.relatedSeries ?? []).filter(
    (s): s is PortfolioSery => typeof s === 'object',
  )

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          <Breadcrumbs items={[{ label: 'Journal', href: '/journal' }, { label: post.title }]} />
          <p className="mt-10 font-body uppercase text-xs tracking-[0.18em] text-muted">
            {formatDate(post.publishDate)}
            {post.author ? ` · ${post.author}` : ''}
          </p>
          <Heading level={1} size="display" className="mt-4">
            {post.title}
          </Heading>
          {post.excerpt && (
            <Text tone="soft" className="mt-6 text-lg">
              {post.excerpt}
            </Text>
          )}
        </Container>
      </Section>

      {post.coverImage && (
        <Section padding="sm">
          <Container size="content">
            <div className="relative aspect-[16/9] overflow-hidden bg-bg-subtle">
              <Image
                media={post.coverImage}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </Section>
      )}

      <BlogBlocks blocks={post.body} />

      {(relatedPosts.length > 0 || relatedSeries.length > 0) && (
        <Section padding="lg">
          <Container size="content">
            <div className="border-t border-line pt-12">
              {relatedPosts.length > 0 && (
                <div>
                  <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-8">
                    Keep reading
                  </p>
                  <div className="grid gap-8 md:grid-cols-3">
                    {relatedPosts.map((p) => (
                      <Link key={p.id} href={`/journal/${p.slug}`} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                          {p.coverImage && (
                            <Image
                              media={p.coverImage}
                              fill
                              sizes="(min-width: 768px) 33vw, 100vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          )}
                        </div>
                        <Heading
                          level={3}
                          size="md"
                          className="mt-4 group-hover:text-soft transition-colors"
                        >
                          {p.title}
                        </Heading>
                        {p.excerpt && (
                          <Text tone="soft" size="sm" className="mt-2 line-clamp-2">
                            {p.excerpt}
                          </Text>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedSeries.length > 0 && (
                <div className={relatedPosts.length > 0 ? 'mt-16' : ''}>
                  <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-8">
                    Related work
                  </p>
                  <div className="grid gap-8 md:grid-cols-2">
                    {relatedSeries.map((s) => {
                      const category =
                        s.category && typeof s.category === 'object' ? s.category : null
                      const href = category
                        ? `/portfolio/${category.slug}/${s.slug}`
                        : `/portfolio/${s.slug}`
                      return (
                        <Link key={s.id} href={href} className="group block">
                          <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
                            {s.coverImage && (
                              <Image
                                media={s.coverImage}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            )}
                          </div>
                          <Heading
                            level={3}
                            size="md"
                            className="mt-4 group-hover:text-soft transition-colors"
                          >
                            {s.title}
                          </Heading>
                          {s.tagline && (
                            <Text tone="soft" size="sm" className="mt-2">
                              {s.tagline}
                            </Text>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}
    </article>
  )
}
