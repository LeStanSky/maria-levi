import type { Metadata } from 'next'
import Link from 'next/link'
import { cache } from 'react'
import { Blocks } from '@/components/blocks/Blocks'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const getHomepage = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { isHomepage: { equals: true } },
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0] ?? null
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage()
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'Maria Levi · Fashion & Personal Brand Photographer in NYC and New Jersey',
    fallbackDescription:
      'Editorial · Personal brand · Commercial photography. Based in New Jersey — serving Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.',
    path: '/',
  })
}

export default async function HomePage() {
  const page = await getHomepage()

  if (page?.pageBuilder && page.pageBuilder.length > 0) {
    return <Blocks blocks={page.pageBuilder} />
  }

  // Fallback: until a Pages entry with isHomepage:true exists in the CMS
  return (
    <Section padding="lg">
      <Container size="narrow">
        <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
          Maria Levi · Photography
        </p>
        <Heading level={1} size="display">
          I don&apos;t just create photos.
          <br />I care about the woman behind them.
        </Heading>
        <Text tone="soft" className="mt-8 max-w-prose text-lg">
          Editorial · Personal brand · Commercial photography. Based in New Jersey — serving
          Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.
        </Text>
        <div className="mt-12 flex flex-wrap gap-6 font-body uppercase text-xs tracking-[0.18em]">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
          >
            View portfolio
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-11 py-4.5 border border-ink text-ink rounded-[2px] transition-all duration-300 hover:bg-ink hover:text-bg"
          >
            About Maria
          </Link>
        </div>
      </Container>
    </Section>
  )
}
