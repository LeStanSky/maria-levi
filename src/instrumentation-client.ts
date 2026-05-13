// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://875e8eecea448d7b136feebdd92bf3f6@o4511328342310912.ingest.us.sentry.io/4511339470192640',

  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: false,

  // Next.js App Router throws "Internal Next.js error: Router action dispatched before
  // initialization" as a normal race-condition it handles itself by re-queuing the action.
  // Capturing it produces noise with no actionable fix.
  ignoreErrors: [/^Internal Next\.js error:/],
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
