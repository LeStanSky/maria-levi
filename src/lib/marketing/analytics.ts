declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

export type AnalyticsEvent =
  | 'lead_magnet_view'
  | 'lead_magnet_submit'
  | 'lead_magnet_dismiss'
  | 'newsletter_submit'
  | 'form_submit'

/**
 * Fire a GA4 / dataLayer event from the client.
 *
 * Safe to call before GA4 is wired (Phase 5/6) — if `window.gtag` is missing the
 * call is silently dropped. Avoid throwing from analytics, ever.
 */
export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params)
      return
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...(params ?? {}) })
    }
  } catch {
    // never throw from analytics
  }
}
