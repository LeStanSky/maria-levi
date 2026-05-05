// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://875e8eecea448d7b136feebdd92bf3f6@o4511328342310912.ingest.us.sentry.io/4511339470192640',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Disabled by default — site has GDPR obligations. Flip to true temporarily for targeted debugging.
  sendDefaultPii: false,
})
