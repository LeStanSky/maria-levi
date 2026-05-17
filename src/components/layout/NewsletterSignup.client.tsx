'use client'

import { useState } from 'react'
import { track } from '@/lib/marketing/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterSignup() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successCopy, setSuccessCopy] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const website = (form.elements.namedItem('website') as HTMLInputElement).value

    if (!email) {
      setErrorMsg('Please share your email.')
      setStatus('error')
      return
    }

    setErrorMsg(null)
    setStatus('submitting')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
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

      setSuccessCopy(json.message ?? 'Subscribed.')
      setStatus('success')
      track('newsletter_submit', {})
    } catch (err) {
      console.error('[newsletter] submit failed', err)
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="mt-4 font-body text-sm text-soft">{successCopy ?? 'Subscribed.'}</p>
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-4 flex flex-col gap-3"
      aria-label="Newsletter signup"
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="your@email.com"
        aria-invalid={status === 'error' && errorMsg ? 'true' : 'false'}
        className="bg-transparent border-b border-line py-2 text-sm font-body placeholder:text-muted focus:outline-none focus:border-ink aria-invalid:border-[#a23a2a] transition-colors"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="self-start font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline disabled:opacity-50 disabled:no-underline transition-all"
      >
        {status === 'submitting' ? 'Sending…' : 'Subscribe →'}
      </button>
      {status === 'error' && errorMsg ? (
        <p className="font-body text-xs text-[#a23a2a]">{errorMsg}</p>
      ) : null}
    </form>
  )
}
