// Cookie-consent storage helpers. Kept React-free so server-side code (a future
// /api/* route reading consent header, an OG card respecting analytics opt-out,
// etc.) can import the same constants and types without dragging in a client
// bundle. The hook lives in useCookieConsent.ts; the banner UI in
// CookieBanner.client.tsx.

const COOKIE_NAME = 'ml-cookie-consent'
const COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60

export type CookieConsent = 'accepted' | 'rejected'

/** Window event dispatched when setCookieConsent runs. Detail = the new value. */
export const COOKIE_CONSENT_CHANGED_EVENT = 'ml-cookie-consent-changed'

export function getCookieConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  const value = match.slice(COOKIE_NAME.length + 1)
  return value === 'accepted' || value === 'rejected' ? value : null
}

export function setCookieConsent(value: CookieConsent): void {
  if (typeof document === 'undefined') return
  // biome-ignore lint/suspicious/noDocumentCookie: parity with LeadMagnetPopup / FooterLeadMagnet — small client-only surface, no SSR write path.
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; SameSite=Lax`
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<CookieConsent>(COOKIE_CONSENT_CHANGED_EVENT, { detail: value }),
    )
  }
}
