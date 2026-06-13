import { describe, expect, it } from 'vitest'
import { mergeFeaturedSeries } from '@/lib/local/series-by-city'
import type { PortfolioSery } from '@/payload-types'

function ps(id: number): PortfolioSery {
  return { id, slug: `series-${id}`, title: `Series ${id}` } as unknown as PortfolioSery
}

describe('mergeFeaturedSeries', () => {
  it('returns the auto list when curated is null', () => {
    expect(mergeFeaturedSeries(null, [ps(1), ps(2)])).toEqual([ps(1), ps(2)])
  })
  it('returns the auto list when curated is undefined', () => {
    expect(mergeFeaturedSeries(undefined, [ps(1), ps(2)])).toEqual([ps(1), ps(2)])
  })
  it('returns curated list when auto is empty', () => {
    expect(mergeFeaturedSeries([ps(1), ps(2)], [])).toEqual([ps(1), ps(2)])
  })
  it('drops curated entries that are bare numeric ids (unpopulated relations)', () => {
    expect(mergeFeaturedSeries([1, ps(2)], [])).toEqual([ps(2)])
  })
  it('dedups by id and preserves curated order before auto extras', () => {
    const result = mergeFeaturedSeries([ps(1)], [ps(2), ps(1), ps(3)])
    expect(result.map((r) => r.id)).toEqual([1, 2, 3])
  })
  it('respects the explicit limit', () => {
    const result = mergeFeaturedSeries([ps(1), ps(2)], [ps(3), ps(4), ps(5)], 3)
    expect(result.map((r) => r.id)).toEqual([1, 2, 3])
  })
  it('uses default limit of 6 when not provided', () => {
    const auto = Array.from({ length: 10 }, (_, i) => ps(i + 1))
    expect(mergeFeaturedSeries(null, auto)).toHaveLength(6)
  })
})
