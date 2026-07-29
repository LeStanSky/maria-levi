import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPayloadClient = cache(async () => getPayload({ config }))

// Re-exported here so call sites keep a single `@/lib/payload` import; the retry
// logic itself lives in `db-retry.ts` (no Payload/config dependency) so it stays
// unit-testable without booting the whole CMS.
export { withDbRetry } from './db-retry'
