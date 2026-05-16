import { getPayloadClient } from '@/lib/payload'
import { LeadMagnetPopup, type LeadMagnetPopupProps } from './LeadMagnetPopup.client'

type Trigger = LeadMagnetPopupProps['trigger']

const VALID_TRIGGERS: readonly Trigger[] = ['delay-30s', 'exit-intent', 'scroll-50pct']

function isTrigger(value: unknown): value is Trigger {
  return typeof value === 'string' && (VALID_TRIGGERS as readonly string[]).includes(value)
}

function slugify(value: string | null | undefined): string | null {
  if (!value) return null
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || null
}

export async function LeadMagnetMount() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'lead-magnet-settings', draft: false })

    if (!settings.enabled) return null

    const placements = (settings.placement ?? []) as string[]
    if (!placements.includes('popup')) return null

    if (!settings.title || !settings.pdfFile) return null

    const trigger = isTrigger(settings.trigger) ? settings.trigger : 'delay-30s'

    let imageUrl: string | null = null
    let imageAlt: string | null = null
    if (settings.image && typeof settings.image !== 'number') {
      imageUrl = settings.image.url ?? null
      imageAlt = settings.image.alt ?? null
    }

    return (
      <LeadMagnetPopup
        title={settings.title}
        subtitle={settings.subtitle ?? null}
        successMessage={settings.successMessage ?? null}
        consentText={settings.consentText ?? null}
        trigger={trigger}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        leadMagnetSlug={slugify(settings.title)}
      />
    )
  } catch {
    // Lead magnet is non-critical — never break the layout if Payload is down.
    return null
  }
}
