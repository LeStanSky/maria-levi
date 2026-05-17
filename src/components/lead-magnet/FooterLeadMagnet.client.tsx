'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/primitives/Button'
import { track } from '@/lib/marketing/analytics'

export type FooterLeadMagnetProps = {
  title: string
  subtitle?: string | null
  successMessage?: string | null
  consentText?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
  leadMagnetSlug?: string | null
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'suppressed'

const COOKIE_SUBMITTED = 'lm-submitted'
const SUBMITTED_TTL_DAYS = 365
const SUPPRESS_PATH_PREFIXES = ['/contact', '/admin', '/api']

function hasCookie(name: string): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some((c) => c.startsWith(`${name}=`))
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const maxAge = days * 24 * 60 * 60
  // biome-ignore lint/suspicious/noDocumentCookie: parity with LeadMagnetPopup — see comment there.
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`
}

function shouldSuppress(): boolean {
  if (typeof window === 'undefined') return true
  if (hasCookie(COOKIE_SUBMITTED)) return true
  const path = window.location.pathname
  return SUPPRESS_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
}

export function FooterLeadMagnet(props: FooterLeadMagnetProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successCopy, setSuccessCopy] = useState<string | null>(null)
  const [viewed, setViewed] = useState(false)

  useEffect(() => {
    if (shouldSuppress()) {
      setStatus('suppressed')
      return
    }
    if (!viewed) {
      setViewed(true)
      track('lead_magnet_view', { slug: props.leadMagnetSlug, trigger: 'footer-block' })
    }
  }, [props.leadMagnetSlug, viewed])

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
          source: 'footer-block',
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
      console.error('[lead-magnet-footer] submit failed', err)
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'suppressed') return null

  return (
    <section aria-labelledby="footer-lead-magnet-title" className="bg-bg border-t border-line">
      <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid gap-10 md:gap-14 md:grid-cols-[1fr_1.4fr] md:items-center">
          {props.imageUrl ? (
            <div className="order-2 md:order-1">
              <div className="relative aspect-[3/4] max-w-sm md:max-w-none">
                {/* biome-ignore lint/performance/noImgElement: parity with popup/inline — small marketing asset off LCP path */}
                <img
                  src={props.imageUrl}
                  alt={props.imageAlt ?? ''}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ) : null}

          <div className={props.imageUrl ? 'order-1 md:order-2' : ''}>
            {status === 'success' ? (
              <div>
                <p className="font-body uppercase text-[11px] tracking-[0.18em] text-muted">Done</p>
                <h2
                  id="footer-lead-magnet-title"
                  className="mt-3 font-display text-3xl md:text-4xl font-light tracking-tight text-ink"
                >
                  Check your inbox.
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-soft max-w-md">
                  {successCopy}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted">
                  Free guide
                </p>
                <h2
                  id="footer-lead-magnet-title"
                  className="mt-3 font-display text-3xl md:text-4xl font-light tracking-tight text-ink"
                >
                  {props.title}
                </h2>
                {props.subtitle ? (
                  <p className="mt-4 font-body text-sm md:text-base leading-relaxed text-soft max-w-md">
                    {props.subtitle}
                  </p>
                ) : null}

                <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr] max-w-xl">
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
                  <Button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send me the guide'}
                  </Button>
                </div>

                {props.consentText ? (
                  <p className="mt-4 font-body text-[11px] leading-relaxed text-muted max-w-md">
                    {props.consentText}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
