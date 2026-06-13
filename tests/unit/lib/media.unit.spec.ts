import { describe, expect, it } from 'vitest'
import { isMedia, mediaAlt, mediaDimensions, mediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

const sample = {
  id: 1,
  alt: 'Sample alt',
  url: 'https://cdn.example.com/img.jpg',
  width: 1200,
  height: 800,
  updatedAt: '2026-01-01T00:00:00Z',
  createdAt: '2026-01-01T00:00:00Z',
} as Media

describe('isMedia', () => {
  it('returns false for null', () => expect(isMedia(null)).toBe(false))
  it('returns false for undefined', () => expect(isMedia(undefined)).toBe(false))
  it('returns false for a numeric id (Payload not populated)', () =>
    expect(isMedia(42)).toBe(false))
  it('returns true for a populated Media object', () => expect(isMedia(sample)).toBe(true))
})

describe('mediaUrl', () => {
  it('returns undefined for a numeric id', () => expect(mediaUrl(7)).toBeUndefined())
  it('returns undefined for null', () => expect(mediaUrl(null)).toBeUndefined())
  it('returns the url from a populated Media', () =>
    expect(mediaUrl(sample)).toBe('https://cdn.example.com/img.jpg'))
  it('returns undefined when populated Media has no url', () =>
    expect(mediaUrl({ ...sample, url: null } as Media)).toBeUndefined())
})

describe('mediaAlt', () => {
  it('returns the default fallback (empty string) when value is unpopulated', () =>
    expect(mediaAlt(null)).toBe(''))
  it('returns the custom fallback when value is unpopulated', () =>
    expect(mediaAlt(null, 'Custom fallback')).toBe('Custom fallback'))
  it('returns alt from populated Media', () => expect(mediaAlt(sample)).toBe('Sample alt'))
  it('falls back to fallback when alt is an empty string', () =>
    expect(mediaAlt({ ...sample, alt: '' } as Media, 'fb')).toBe('fb'))
})

describe('mediaDimensions', () => {
  it('returns undefined for null', () => expect(mediaDimensions(null)).toBeUndefined())
  it('returns undefined when width is missing', () =>
    expect(mediaDimensions({ ...sample, width: null } as Media)).toBeUndefined())
  it('returns undefined when height is missing', () =>
    expect(mediaDimensions({ ...sample, height: null } as Media)).toBeUndefined())
  it('returns width + height for populated Media', () =>
    expect(mediaDimensions(sample)).toEqual({ width: 1200, height: 800 }))
})
