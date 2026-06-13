'use client'

import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_CHANGED_EVENT, type CookieConsent, getCookieConsent } from './consent'

/**
 * Subscribe to the user's cookie-consent choice.
 *
 * Returns `null` until the user has answered the banner — consumers (GA4 in
 * PR-C, Meta Pixel, future analytics) should treat `null` as "don't load yet"
 * and only initialise on `'accepted'`. On choice change the hook re-renders
 * via the `COOKIE_CONSENT_CHANGED_EVENT` dispatched by `setCookieConsent`.
 *
 * SSR-safe: returns `null` until hydration completes.
 */
export function useCookieConsent(): CookieConsent | null {
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  useEffect(() => {
    setConsent(getCookieConsent())
    function handler(event: Event) {
      setConsent((event as CustomEvent<CookieConsent>).detail)
    }
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, handler)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, handler)
  }, [])

  return consent
}
