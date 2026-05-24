/**
 * Rasterize the master monogram (src/app/icon.svg) into the favicon assets that
 * legacy browsers and iOS expect:
 *   - src/app/favicon.ico   multi-size PNG-in-ICO (16 / 32 / 48)
 *   - src/app/apple-icon.png 180x180 Apple touch icon
 *
 * Next.js serves icon.svg to modern browsers automatically; this fills the gaps.
 * Re-run whenever icon.svg changes.
 *
 * Run: pnpm favicons
 * Idempotent: overwrites the generated files in place.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const APP_DIR = join(process.cwd(), 'src', 'app')
const svg = readFileSync(join(APP_DIR, 'icon.svg'))

const pngAt = (size: number) =>
  sharp(svg, { density: 384 }).resize(size, size, { fit: 'cover' }).png().toBuffer()

/** Pack one or more PNG buffers into a single .ico container. */
function buildIco(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)

  const entries: Buffer[] = []
  let offset = 6 + images.length * 16
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width (0 => 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += data.length
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)])
}

async function main() {
  const [ico16, ico32, ico48, apple] = await Promise.all([
    pngAt(16),
    pngAt(32),
    pngAt(48),
    pngAt(180),
  ])

  writeFileSync(
    join(APP_DIR, 'favicon.ico'),
    buildIco([
      { size: 16, data: ico16 },
      { size: 32, data: ico32 },
      { size: 48, data: ico48 },
    ]),
  )
  writeFileSync(join(APP_DIR, 'apple-icon.png'), apple)

  console.info('Wrote src/app/favicon.ico (16/32/48) and src/app/apple-icon.png (180)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
