// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://875e8eecea448d7b136feebdd92bf3f6@o4511328342310912.ingest.us.sentry.io/4511339470192640',

  // Production-only by default. Local pnpm dev surfaces a steady stream of Turbopack
  // HMR / RSC streaming noise (e.g. "Cannot read properties of undefined (reading 'digest')",
  // "Cannot assign to read only property 'i18n'") that burns the free-tier event budget.
  // Set SENTRY_FORCE_ENABLE=1 in a local .env file when you need Sentry from dev for
  // targeted debugging.
  enabled: process.env.NODE_ENV === 'production' || process.env.SENTRY_FORCE_ENABLE === '1',

  // 10% trace sampling in production — full sampling burned budget at scale.
  tracesSampleRate: 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Disabled by default — site has GDPR obligations. Flip to true temporarily for targeted debugging.
  sendDefaultPii: false,

  // Drop empty unhandled-rejection events. When a Payload init connect attempt fails
  // (Neon cold-start), the rejection propagates with a null/undefined reason, so Sentry's
  // onunhandledrejection integration captures a contentless "Error: undefined" with a stack
  // that lives entirely inside @sentry/node-core (Sentry MARIA-LEVI-14). It carries no
  // information the real, separately-captured connect error (MARIA-LEVI-15) doesn't already
  // have, so it's pure noise. Everything with an actual type/value passes through untouched.
  beforeSend(event) {
    const ex = event.exception?.values?.[0]
    if (ex && ex.type === 'Error' && (ex.value === undefined || ex.value === 'undefined')) {
      return null
    }
    return event
  },
})
