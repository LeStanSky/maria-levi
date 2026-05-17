import { getLeadMagnetSettings, slugifyLeadMagnetTitle } from '@/lib/lead-magnet/settings'
import { isMedia, type MediaLike } from '@/lib/media'
import { BlogLeadMagnetInline as InlineForm } from './BlogLeadMagnetInline.client'

type BlockProps = {
  title?: string | null
  subtitle?: string | null
  image?: MediaLike
  pdfFile?: MediaLike
  flodeskTag?: string | null
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
      leadMagnetSlug={slugifyLeadMagnetTitle(title)}
    />
  )
}
