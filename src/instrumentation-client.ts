// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

// Client-side Sentry. Disabled in dev — Turbopack RSC streaming + Payload v3 + HMR
// produce a steady stream of dev-only noise that drowns out real prod issues and burns
// the free-tier event budget. Flip SENTRY_FORCE_ENABLE=1 (also expose it as
// NEXT_PUBLIC_SENTRY_FORCE_ENABLE in .env.local — client-side env vars require the prefix)
// when you need Sentry in dev for targeted debugging.
const enabled =
  process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SENTRY_FORCE_ENABLE === '1'

Sentry.init({
  dsn: 'https://875e8eecea448d7b136feebdd92bf3f6@o4511328342310912.ingest.us.sentry.io/4511339470192640',

  enabled,

  // Replay integration intentionally not loaded — rrweb adds ~50 KB to the initial
  // client bundle and contributes meaningfully to mobile Lighthouse TBT. Trade-off
  // accepted: exceptions still capture with full stack traces, just no DOM replay.
  // Re-add by lazy-loading from a client error boundary if replay context becomes
  // necessary for debugging (see Sentry.lazyLoadIntegration in their docs).

  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: false,

  // Next.js App Router throws "Internal Next.js error: Router action dispatched before
  // initialization" as a normal race-condition it handles itself by re-queuing the action.
  // The "Cannot find the middleware module" is a dev-only HMR glitch when middleware.ts is
  // added/changed — Next recovers on the next request. Both are noise with no actionable fix.
  ignoreErrors: [/^Internal Next\.js error:/, /Cannot find the middleware module/],
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
