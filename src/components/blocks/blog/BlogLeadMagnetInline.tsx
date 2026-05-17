import { cache } from 'react'
import { isMedia, type MediaLike } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { BlogLeadMagnetInline as InlineForm } from './BlogLeadMagnetInline.client'

type BlockProps = {
  title?: string | null
  subtitle?: string | null
  image?: MediaLike
  pdfFile?: MediaLike
  flodeskTag?: string | null
}

const getLeadMagnetSettings = cache(async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'lead-magnet-settings', draft: false })
  } catch {
    return null
  }
})

function slugify(value: string | null | undefined): string | null {
  if (!value) return null
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || null
}

export async function BlogLeadMagnetInline(block: BlockProps) {
  const settings = await getLeadMagnetSettings()
  if (!settings?.enabled) return null

  const placements = (settings.placement ?? []) as string[]
  if (!placements.includes('blog-inline')) return null

  // Per-post override > global fallback. pdfFile resolved server-side just to
  // validate the magnet is configured — the actual delivery uses settings.pdfFile
  // via the /api/lead-magnet route (which is the source of truth).
  const title = block.title || settings.title
  if (!title) return null

  const pdfResolved =
    isMedia(block.pdfFile) || typeof block.pdfFile === 'number' ? block.pdfFile : settings.pdfFile
  if (!pdfResolved) return null

  const subtitle = block.subtitle || settings.subtitle || null

  const imageSource: MediaLike = isMedia(block.image)
    ? block.image
    : isMedia(settings.image)
      ? settings.image
      : null
  const imageUrl = isMedia(imageSource) ? (imageSource.url ?? null) : null
  const imageAlt = isMedia(imageSource) ? (imageSource.alt ?? null) : null

  return (
    <InlineForm
      title={title}
      subtitle={subtitle}
      successMessage={settings.successMessage ?? null}
      consentText={settings.consentText ?? null}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      leadMagnetSlug={slugify(title)}
    />
  )
}
