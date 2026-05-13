import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import type { BlogPost } from '@/payload-types'

type Props = {
  eyebrow?: string | null
  headline?: string | null
  posts?: (number | BlogPost)[] | null
  viewAllLink?: string | null
}

export function BlogTeaser({ eyebrow, headline, posts, viewAllLink }: Props) {
  const items = (posts ?? []).filter((p): p is BlogPost => typeof p === 'object')
  if (items.length === 0) return null

  return (
    <Section padding="md">
      <Container size="content">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            {eyebrow && (
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
                {eyebrow}
              </p>
            )}
            {headline && (
              <Heading level={2} size="xl">
                {headline}
              </Heading>
            )}
          </div>
          <Link
            href={viewAllLink ?? '/journal'}
            className="font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
          >
            All entries →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                {post.coverImage && (
                  <Image
                    media={post.coverImage}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <Heading level={3} size="md" className="mt-4 group-hover:text-soft transition-colors">
                {post.title}
              </Heading>
              {post.excerpt && (
                <Text tone="soft" size="sm" className="mt-2 line-clamp-2">
                  {post.excerpt}
                </Text>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
