'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/primitives/Button'
import { track } from '@/lib/marketing/analytics'

export type LeadMagnetPopupProps = {
  title: string
  subtitle?: string | null
  successMessage?: string | null
  consentText?: string | null
  trigger: 'delay-30s' | 'exit-intent' | 'scroll-50pct'
  imageUrl?: string | null
  imageAlt?: string | null
  leadMagnetSlug?: string | null
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const COOKIE_DISMISSED = 'lm-dismissed'
const COOKIE_SUBMITTED = 'lm-submitted'
const DISMISS_TTL_DAYS = 180
const SUBMITTED_TTL_DAYS = 365
const DELAY_MS = 30_000
const SCROLL_THRESHOLD = 0.5
const SUPPRESS_PATH_PREFIXES = ['/contact', '/admin', '/api']

function hasCookie(name: string): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some((c) => c.startsWith(`${name}=`))
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const maxAge = days * 24 * 60 * 60
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is gated by SecureContext + Chromium-only; document.cookie is fine for a marketing dismiss flag.
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`
}

function shouldSuppress(): boolean {
  if (typeof window === 'undefined') return true
  if (hasCookie(COOKIE_DISMISSED) || hasCookie(COOKIE_SUBMITTED)) return true
  const path = window.location.pathname
  return SUPPRESS_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
}

export function LeadMagnetPopup(props: LeadMagnetPopupProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successCopy, setSuccessCopy] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (shouldSuppress()) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let scrollHandler: (() => void) | undefined
    let exitHandler: ((e: MouseEvent) => void) | undefined

    const fire = () => {
      if (shouldSuppress()) return
      setOpen(true)
      track('lead_magnet_view', { slug: props.leadMagnetSlug, trigger: props.trigger })
    }

    if (props.trigger === 'delay-30s') {
      timeoutId = setTimeout(fire, DELAY_MS)
    } else if (props.trigger === 'scroll-50pct') {
      scrollHandler = () => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        if (max > 0 && window.scrollY / max >= SCROLL_THRESHOLD) {
          fire()
          if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
        }
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    } else if (props.trigger === 'exit-intent') {
      exitHandler = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          fire()
          if (exitHandler) document.removeEventListener('mouseleave', exitHandler)
        }
      }
      document.addEventListener('mouseleave', exitHandler)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
      if (exitHandler) document.removeEventListener('mouseleave', exitHandler)
    }
  }, [props.trigger, props.leadMagnetSlug])

  const dismiss = useCallback(() => {
    if (status === 'success') {
      setCookie(COOKIE_SUBMITTED, '1', SUBMITTED_TTL_DAYS)
    } else {
      setCookie(COOKIE_DISMISSED, '1', DISMISS_TTL_DAYS)
      track('lead_magnet_dismiss', { slug: props.leadMagnetSlug })
    }
    setOpen(false)
  }, [status, props.leadMagnetSlug])

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, dismiss])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value.trim()
    const website = (form.elements.namedItem('website') as HTMLInputElement).value

    if (!email) {
      setErrorMsg('Please share your email.')
      setStatus('error')
      return
    }

    setErrorMsg(null)
    setStatus('submitting')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          source: 'lead-magnet',
          pageSubmittedFrom: window.location.pathname,
          website,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        message?: string
      }
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setSuccessCopy(json.message ?? props.successMessage ?? 'Check your email for the guide.')
      setStatus('success')
      setCookie(COOKIE_SUBMITTED, '1', SUBMITTED_TTL_DAYS)
      track('lead_magnet_submit', { slug: props.leadMagnetSlug })
    } catch (err) {
      console.error('[lead-magnet] submit failed', err)
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8">
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={dismiss}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-magnet-title"
        className="relative w-full max-w-lg bg-bg shadow-xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center text-muted hover:text-ink"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
        <div className="grid md:grid-cols-[1fr_1.25fr]">
          {props.imageUrl ? (
            <div className="hidden md:block bg-bg-subtle">
              {/* Use plain img to avoid Next/Image config for popup-only assets */}
              {/* biome-ignore lint/performance/noImgElement: popup is gated behind cookie + trigger, off the critical path */}
              <img
                src={props.imageUrl}
                alt={props.imageAlt ?? ''}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="p-8 md:p-10">
            {status === 'success' ? (
              <div>
                <h2
                  id="lead-magnet-title"
                  className="font-display text-2xl font-light tracking-tight text-ink"
                >
                  Done.
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-soft">{successCopy}</p>
                <button
                  type="button"
                  onClick={dismiss}
                  className="mt-6 font-body text-xs uppercase tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted">
                  Free guide
                </p>
                <h2
                  id="lead-magnet-title"
                  className="mt-3 font-display text-2xl font-light tracking-tight text-ink"
                >
                  {props.title}
                </h2>
                {props.subtitle ? (
                  <p className="mt-3 font-body text-sm leading-relaxed text-soft">
                    {props.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="block font-body text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
                      First name (optional)
                    </span>
                    <input
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      maxLength={80}
                      className="w-full border-0 border-b border-line bg-transparent py-3 font-body text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-0 transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block font-body text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      aria-invalid={status === 'error' && errorMsg ? 'true' : 'false'}
                      className="w-full border-0 border-b border-line bg-transparent py-3 font-body text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-0 transition-colors aria-invalid:border-[#a23a2a]"
                    />
                  </label>
                  {/* Honeypot — must stay empty. Hidden from humans and AT. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                </div>

                {status === 'error' && errorMsg ? (
                  <p className="mt-4 font-body text-xs text-[#a23a2a]">{errorMsg}</p>
                ) : null}

                <div className="mt-6">
                  <Button type="submit" disabled={status === 'submitting'} className="w-full">
                    {status === 'submitting' ? 'Sending…' : 'Send me the guide'}
                  </Button>
                </div>

                {props.consentText ? (
                  <p className="mt-4 font-body text-[11px] leading-relaxed text-muted">
                    {props.consentText}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
