'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { type CookieConsent, getCookieConsent, setCookieConsent } from './consent'

/**
 * First-visit cookie banner. Bottom-left card on desktop, full-width on mobile.
 *
 * Renders nothing after the user has made a choice (cookie set) — the cookie
 * is 365 d / SameSite=Lax, so re-visits within the year skip the banner. The
 * banner stays out of the bottom-right corner so it doesn't fight the
 * StickyInquireCTA; on mobile both share the bottom edge for the brief window
 * between scroll-past-200 and the user dismissing — z-40 puts the banner on
 * top, and the CTA reappears alone the moment Accept / Reject is clicked.
 *
 * Copy is US-market-friendly (single choice pair, no granular categories).
 * If EU/UK personal-brand clients become common, revisit with a category
 * picker matched to TCF v2.
 */
export function CookieBanner() {
  // Render only after hydration. getCookieConsent() reads document.cookie,
  // which is undefined on the server — SSR'ing the banner and then deciding
  // to hide it on the client would briefly flash it for users who already
  // consented.
  const [hydrated, setHydrated] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setHydrated(true)
    if (getCookieConsent() !== null) setDismissed(true)
  }, [])

  function handle(choice: CookieConsent) {
    setCookieConsent(choice)
    setDismissed(true)
  }

  if (!hydrated || dismissed) return null

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-40 max-w-md bg-bg border border-line shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <div className="px-5 py-4 flex flex-col gap-3">
        <p className="font-body text-xs leading-relaxed text-soft">
          We use cookies to improve your experience and understand how visitors use the site. See
          our{' '}
          <Link
            href="/cookie-notice"
            className="underline underline-offset-4 hover:no-underline text-ink"
          >
            Cookie Notice
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handle('rejected')}
            className="inline-flex items-center justify-center px-4 py-2.5 font-body uppercase text-[10px] font-medium tracking-[0.18em] rounded-[2px] border border-ink text-ink hover:bg-ink hover:text-bg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-(--color-focus-ring)"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => handle('accepted')}
            className="inline-flex items-center justify-center px-4 py-2.5 font-body uppercase text-[10px] font-medium tracking-[0.18em] rounded-[2px] bg-ink text-bg hover:bg-[#2c2a26] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-(--color-focus-ring)"
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  )
}
