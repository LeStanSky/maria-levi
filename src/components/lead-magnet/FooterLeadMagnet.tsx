import { getLeadMagnetSettings, slugifyLeadMagnetTitle } from '@/lib/lead-magnet/settings'
import { isMedia } from '@/lib/media'
import { FooterLeadMagnet as Form } from './FooterLeadMagnet.client'

export async function FooterLeadMagnet() {
  const settings = await getLeadMagnetSettings()
  if (!settings?.enabled) return null

  const placements = (settings.placement ?? []) as string[]
  if (!placements.includes('footer-block')) return null

  if (!settings.title || !settings.pdfFile) return null

  let imageUrl: string | null = null
  let imageAlt: string | null = null
  if (isMedia(settings.image)) {
    imageUrl = settings.image.url ?? null
    imageAlt = settings.image.alt ?? null
  }

  return (
    <Form
      title={settings.title}
      subtitle={settings.subtitle ?? null}
      successMessage={settings.successMessage ?? null}
      consentText={settings.consentText ?? null}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      leadMagnetSlug={slugifyLeadMagnetTitle(settings.title)}
    />
  )
}
