import { describe, expect, it } from 'vitest'
import { slugify } from '@/fields/slug'

describe('slugify', () => {
  it('lowercases', () => {
    expect(slugify('HELLO')).toBe('hello')
  })
  it('trims leading + trailing whitespace before transforming', () => {
    expect(slugify('  hi  ')).toBe('hi')
  })
  it('replaces a single space with a hyphen', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })
  it('collapses runs of whitespace and underscores into one hyphen each', () => {
    expect(slugify('foo   bar___baz')).toBe('foo-bar-baz')
  })
  it('strips punctuation that is not a word char, whitespace, or hyphen', () => {
    expect(slugify("Maria's NYC! Studio.")).toBe('marias-nyc-studio')
  })
  it('trims leading and trailing hyphens after substitution', () => {
    expect(slugify('--keep-me--')).toBe('keep-me')
  })
  it('preserves digits as word chars but treats underscores as separators', () => {
    expect(slugify('shoot_2026_session')).toBe('shoot-2026-session')
  })
  it('keeps mid-word digits intact', () => {
    expect(slugify('hello123world')).toBe('hello123world')
  })
  it('caps the result at 60 characters', () => {
    expect(slugify('a'.repeat(80))).toHaveLength(60)
  })
  it('strips non-ASCII letters (no unicode normalisation by design)', () => {
    expect(slugify('Café')).toBe('caf')
  })
  it('handles the empty string', () => {
    expect(slugify('')).toBe('')
  })
})
