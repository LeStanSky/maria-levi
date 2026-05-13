/**
 * Initializes Payload to trigger Drizzle's pushDevSchema, which CREATEs / ALTERs
 * the DB to match the current code-side schema. Required in CI because next build
 * runs under NODE_ENV=production, where Drizzle blocks push.
 *
 * Run with NODE_ENV=development and PAYLOAD_DB_PUSH=true.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  await getPayload({ config })
  console.info('✓ Schema synced.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
