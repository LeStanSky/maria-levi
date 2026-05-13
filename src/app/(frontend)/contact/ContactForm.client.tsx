'use client'

import { useState } from 'react'
import { Button } from '@/components/primitives/Button'
import { Heading } from '@/components/primitives/Heading'

type Option = { value: string; label: string }

type Props = {
  sessionTypes: Option[]
  referralOptions: Option[]
}

const BUDGET_OPTIONS: Option[] = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1000', label: '$500–$1,000' },
  { value: '1000-2000', label: '$1,000–$2,000' },
  { value: '2000-plus', label: '$2,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'
type FieldErrors = Record<string, string>

const inputClass =
  'w-full border-0 border-b border-line bg-transparent py-3 font-body text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-0 transition-colors aria-invalid:border-[#a23a2a]'
const labelClass = 'block font-body uppercase text-[11px] tracking-[0.18em] text-muted mb-2'
const errorClass = 'mt-2 font-body text-xs text-[#a23a2a]'

export function ContactForm({ sessionTypes, referralOptions }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [globalError, setGlobalError] = useState<string | null>(null)

  function validateClient(form: HTMLFormElement): FieldErrors {
    const next: FieldErrors = {}
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()

    if (!name) next.name = 'Please share your name.'
    if (!email) next.email = 'Please share your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'That email doesn’t look right.'

    return next
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGlobalError(null)
    const form = e.currentTarget
    const clientErrors = validateClient(form)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }
    setErrors({})
    setStatus('submitting')

    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    if (typeof window !== 'undefined') {
      payload.pageSubmittedFrom = window.location.pathname + window.location.search
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        errors?: Array<{ field: string; message: string }>
      }

      if (!res.ok || !data.ok) {
        if (data.errors) {
          const fieldErrors: FieldErrors = {}
          for (const err of data.errors) fieldErrors[err.field] = err.message
          setErrors(fieldErrors)
        }
        setGlobalError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setGlobalError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-line p-10 text-center">
        <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">Received</p>
        <Heading level={2} size="lg">
          Thank you.
        </Heading>
        <p className="mt-6 font-body text-sm text-ink leading-relaxed max-w-md mx-auto">
          Your inquiry is in. Maria will reply personally within 1–2 business days — please check
          your spam folder if you don’t hear back.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="name-error" role="alert" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="email-error" role="alert" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          className={inputClass}
        />
      </div>

      {sessionTypes.length > 0 && (
        <div>
          <label htmlFor="sessionType" className={labelClass}>
            Type of session
          </label>
          <select id="sessionType" name="sessionType" className={inputClass} defaultValue="">
            <option value="">Choose one…</option>
            {sessionTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            aria-invalid={!!errors.preferredDate}
            className={inputClass}
          />
          {errors.preferredDate && (
            <p role="alert" className={errorClass}>
              {errors.preferredDate}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="NYC, Hoboken, on location…"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget range
        </label>
        <select id="budget" name="budget" className={inputClass} defaultValue="">
          <option value="">Choose one…</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="referralSource" className={labelClass}>
          How did you hear about Maria?
        </label>
        <select id="referralSource" name="referralSource" className={inputClass} defaultValue="">
          <option value="">Choose one…</option>
          {referralOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Maria about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={5000}
          aria-invalid={!!errors.message}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p role="alert" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      {globalError && (
        <p
          role="alert"
          className="border border-[#a23a2a] bg-[#fef5f3] p-4 font-body text-sm text-[#a23a2a]"
        >
          {globalError}
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
      </Button>
    </form>
  )
}
