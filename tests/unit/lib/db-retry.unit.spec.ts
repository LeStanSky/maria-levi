import { afterEach, describe, expect, it, vi } from 'vitest'
import { isTransientDbError, withDbRetry } from '@/lib/db-retry'

afterEach(() => {
  vi.useRealTimers()
})

describe('isTransientDbError', () => {
  it('matches a direct connection-timeout message', () => {
    expect(isTransientDbError(new Error('Connection terminated due to connection timeout'))).toBe(
      true,
    )
  })

  it('matches an unexpected-termination message', () => {
    expect(isTransientDbError(new Error('Connection terminated unexpectedly'))).toBe(true)
  })

  it('matches ECONNRESET', () => {
    expect(isTransientDbError(new Error('read ECONNRESET'))).toBe(true)
  })

  it('walks the cause chain (Drizzle "Failed query" wrapping the pg error)', () => {
    const wrapped = new Error('Failed query: select count(*) from "pages"')
    wrapped.cause = new Error('Connection terminated unexpectedly')
    expect(isTransientDbError(wrapped)).toBe(true)
  })

  it('does not match an unrelated query/logic error', () => {
    const wrapped = new Error('Failed query: select ...')
    wrapped.cause = new Error('syntax error at or near "slect"')
    expect(isTransientDbError(wrapped)).toBe(false)
  })

  it('returns false for a non-Error value', () => {
    expect(isTransientDbError('Connection terminated')).toBe(false)
    expect(isTransientDbError(null)).toBe(false)
  })
})

describe('withDbRetry', () => {
  it('returns the result without retrying when the read succeeds', async () => {
    const fn = vi.fn(async () => 'ok')
    await expect(withDbRetry(fn)).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries a transient failure and then succeeds', async () => {
    vi.useFakeTimers()
    let calls = 0
    const fn = vi.fn(async () => {
      calls += 1
      if (calls === 1) throw new Error('Connection terminated due to connection timeout')
      return 'ok'
    })
    const p = withDbRetry(fn)
    await vi.runAllTimersAsync()
    await expect(p).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('retries a cause-wrapped transient failure', async () => {
    vi.useFakeTimers()
    let calls = 0
    const fn = vi.fn(async () => {
      calls += 1
      if (calls === 1) {
        const wrapped = new Error('Failed query: select ...')
        wrapped.cause = new Error('Connection terminated unexpectedly')
        throw wrapped
      }
      return 'ok'
    })
    const p = withDbRetry(fn)
    await vi.runAllTimersAsync()
    await expect(p).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('does not retry a non-transient error', async () => {
    const fn = vi.fn(async () => {
      throw new Error('syntax error')
    })
    await expect(withDbRetry(fn)).rejects.toThrow('syntax error')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('gives up after exhausting retries and throws the last error', async () => {
    vi.useFakeTimers()
    const fn = vi.fn(async () => {
      throw new Error('Connection terminated unexpectedly')
    })
    const p = withDbRetry(fn, 2)
    // Attach the rejection expectation before draining timers so the eventual
    // rejection is never momentarily unhandled.
    const assertion = expect(p).rejects.toThrow('Connection terminated unexpectedly')
    await vi.runAllTimersAsync()
    await assertion
    expect(fn).toHaveBeenCalledTimes(3) // initial + 2 retries
  })
})
