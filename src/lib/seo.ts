import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { isMedia, type MediaLike, mediaUrl } from './media'

type SeoFields = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: number | Media | null
  keywords?: string | null
  noIndex?: boolean | null
  canonical?: string | null
}

type BuildMetadataArgs = {
  seo?: SeoFields | null
  /** Used when seo.metaTitle is empty. */
  fallbackTitle?: string
  /** Used when seo.metaDescription is empty. */
  fallbackDescription?: string
  /** Used when seo.ogImage is empty. */
  fallbackImage?: MediaLike
  /** Path of the page (e.g. "/about"); appended to NEXT_PUBLIC_SITE_URL for canonical. */
  path?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Layout sets `template: '%s · Maria Levi Photography'`, so any page-level
// title that already ends with the brand has it duplicated when the template
// applies. Strip the trailing suffix here so the template adds it exactly
// once — handles both code-set fallbacks and Maria-set CMS `metaTitle` values.
// Order matters: longer suffix must win.
const BRAND_SUFFIXES = [' · Maria Levi Photography', ' · Maria Levi']

function stripBrandSuffix(input: string | undefined): string | undefined {
  if (!input) return input
  for (const sfx of BRAND_SUFFIXES) {
    if (input.endsWith(sfx)) return input.slice(0, -sfx.length)
  }
  return input
}

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  path,
}: BuildMetadataArgs): Metadata {
  const title = stripBrandSuffix(seo?.metaTitle || fallbackTitle)
  const description = seo?.metaDescription || fallbackDescription || undefined

  const ogImageMedia: MediaLike = isMedia(seo?.ogImage) ? seo?.ogImage : fallbackImage
  const ogImage = mediaUrl(ogImageMedia)

  const canonical = seo?.canonical || (path ? `${SITE_URL}${path}` : undefined)

  return {
    title,
    description,
    keywords: seo?.keywords || undefined,
    alternates: canonical ? { canonical } : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title ?? undefined,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: ogImage
      ? {
          card: 'summary_large_image',
          title: title ?? undefined,
          description,
          images: [ogImage],
        }
      : undefined,
  }
}
