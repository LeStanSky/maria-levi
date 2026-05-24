/**
 * Push local ./media files to the Cloudflare R2 bucket (keys = filenames).
 *
 * Use when media was written to Payload's local storage before R2 was wired, or
 * to re-host the local media folder. The S3 plugin generates URLs as
 * `${R2_PUBLIC_URL}/<filename>`, so keys here must match the bare filenames.
 *
 * Run: pnpm r2-sync   (needs R2_* env vars)
 * Idempotent: re-running overwrites the same keys.
 */
import 'dotenv/config'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const MEDIA = join(process.cwd(), 'media')
const BUCKET = process.env.R2_BUCKET as string

if (!process.env.R2_ACCOUNT_ID || !BUCKET) {
  console.error('R2 env not configured (R2_ACCOUNT_ID / R2_BUCKET). Aborting.')
  process.exit(1)
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true,
})

const CT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
}
const contentType = (f: string) => CT[extname(f).toLowerCase()] ?? 'application/octet-stream'

async function main() {
  const files = readdirSync(MEDIA).filter((f) => statSync(join(MEDIA, f)).isFile())
  console.info(`Uploading ${files.length} files → R2 bucket "${BUCKET}"...`)
  let done = 0
  let failed = 0
  const CONC = 8
  for (let i = 0; i < files.length; i += CONC) {
    await Promise.all(
      files.slice(i, i + CONC).map(async (f) => {
        try {
          await s3.send(
            new PutObjectCommand({
              Bucket: BUCKET,
              Key: f,
              Body: readFileSync(join(MEDIA, f)),
              ContentType: contentType(f),
            }),
          )
          done += 1
        } catch (e) {
          failed += 1
          console.warn(`  ! ${f}: ${(e as Error).message}`)
        }
      }),
    )
    if (i % (CONC * 20) === 0) console.info(`  ${done}/${files.length}`)
  }
  console.info(`\n✓ Uploaded ${done}, failed ${failed}.`)
  process.exit(failed > 0 ? 1 : 0)
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
