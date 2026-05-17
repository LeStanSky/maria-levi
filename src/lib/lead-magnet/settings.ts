import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'

/**
 * React-cached loader for LeadMagnetSettings global.
 *
 * Shared by every lead-magnet surface (popup mount, inline block, footer
 * banner) so a single render only hits Payload once even when multiple
 * surfaces render in the same tree. Errors are swallowed — lead-magnet is
 * non-critical, never break the layout if Payload is unreachable.
 */
export const getLeadMagnetSettings = cache(async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'lead-magnet-settings', draft: false })
  } catch {
    return null
  }
})

export function slugifyLeadMagnetTitle(value: string | null | undefined): string | null {
  if (!value) return null
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || null
}
