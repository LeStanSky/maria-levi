import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Blocks } from '@/components/blocks/Blocks'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

const getPage = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug }, isHomepage: { not_equals: true } },
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0] ?? null
})

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { isHomepage: { not_equals: true } },
    limit: 100,
    depth: 0,
    draft: false,
    select: { slug: true },
  })
  return result.docs
    .map((p) => (p.slug ? { slug: p.slug } : null))
    .filter((p): p is { slug: string } => p !== null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: `${page.title} · Maria Levi`,
    path: `/${slug}`,
  })
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page?.pageBuilder || page.pageBuilder.length === 0) notFound()
  // `compactSpacing` tightens the inter-block vertical rhythm (see .page-compact
  // in styles.css) — used by conversion landings like /personal-branding.
  if (page.compactSpacing) {
    return (
      <div className="page-compact">
        <Blocks blocks={page.pageBuilder} />
      </div>
    )
  }
  return <Blocks blocks={page.pageBuilder} />
}
