import type { Media } from '@/payload-types'

export type MediaLike = number | Media | null | undefined

export function isMedia(value: MediaLike): value is Media {
  return typeof value === 'object' && value !== null
}

export function mediaUrl(value: MediaLike): string | undefined {
  if (!isMedia(value)) return undefined
  return value.url ?? undefined
}

export function mediaAlt(value: MediaLike, fallback = ''): string {
  if (!isMedia(value)) return fallback
  return value.alt || fallback
}

export function mediaDimensions(value: MediaLike): { width: number; height: number } | undefined {
  if (!isMedia(value) || !value.width || !value.height) return undefined
  return { width: value.width, height: value.height }
}
