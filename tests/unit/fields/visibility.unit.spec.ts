import type { Block, PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'
import { publishedOrSignedIn } from '@/fields/access'
import { visibleOnSite, withHideOnSite, withVisiblePackages } from '@/fields/hideOnSite'

const block = (slug: string): Block => ({ slug, fields: [{ name: 'title', type: 'text' }] })
const fieldNames = (b: Block) => b.fields.map((f) => ('name' in f ? f.name : null))

describe('withHideOnSite', () => {
  it('adds the hideOnSite checkbox as the first field of every block', () => {
    const [a, b] = withHideOnSite([block('a'), block('b')])
    expect(fieldNames(a)).toEqual(['hideOnSite', 'title'])
    expect(fieldNames(b)).toEqual(['hideOnSite', 'title'])
  })

  it('does not mutate the shared block configs', () => {
    const original = block('a')
    withHideOnSite([original])
    expect(fieldNames(original)).toEqual(['title'])
  })

  it('is idempotent', () => {
    const [once] = withHideOnSite([block('a')])
    const [twice] = withHideOnSite([once])
    expect(fieldNames(twice)).toEqual(['hideOnSite', 'title'])
  })
})

describe('visibleOnSite', () => {
  it('drops hidden blocks and keeps the rest in order', () => {
    const blocks = [
      { id: '1', hideOnSite: true },
      { id: '2', hideOnSite: false },
      { id: '3', hideOnSite: null },
      { id: '4' },
    ]
    expect(visibleOnSite(blocks).map((b) => b.id)).toEqual(['2', '3', '4'])
  })

  it('handles empty input', () => {
    expect(visibleOnSite(null)).toEqual([])
    expect(visibleOnSite(undefined)).toEqual([])
  })
})

describe('withVisiblePackages', () => {
  it('removes hidden packages and keeps the rest of the service', () => {
    const service = {
      slug: 'personal-brand',
      packages: [
        { name: 'Essential', hideOnSite: true },
        { name: 'Professional', hideOnSite: false },
      ],
    }
    const out = withVisiblePackages(service)
    expect(out.slug).toBe('personal-brand')
    expect(out.packages.map((p) => p.name)).toEqual(['Professional'])
    expect(service.packages).toHaveLength(2)
  })
})

describe('publishedOrSignedIn', () => {
  const run = (user: unknown) =>
    publishedOrSignedIn({ req: { user } as unknown as PayloadRequest } as Parameters<
      typeof publishedOrSignedIn
    >[0])

  it('lets signed-in editors read everything (admin, drafts)', () => {
    expect(run({ id: 1, role: 'editor' })).toBe(true)
  })

  it('limits visitors to published docs', () => {
    expect(run(null)).toEqual({ _status: { equals: 'published' } })
  })
})
