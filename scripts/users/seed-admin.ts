import 'dotenv/config'
import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { getPayload } from 'payload'
import config from '../../src/payload.config'

const ask = async (prompt: string, opts?: { silent?: boolean }) => {
  const rl = createInterface({ input, output, terminal: true })
  if (opts?.silent) {
    const original = (output as unknown as { write: (chunk: string) => void }).write.bind(output)
    ;(output as unknown as { write: (chunk: string) => void }).write = (chunk: string) => {
      if (chunk.includes('\n') || chunk.includes('\r')) original(chunk)
    }
    try {
      const value = await rl.question(prompt)
      return value
    } finally {
      ;(output as unknown as { write: (chunk: string) => void }).write = original
      rl.close()
    }
  }
  const value = await rl.question(prompt)
  rl.close()
  return value
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'users' })
  if (existing.totalDocs > 0) {
    console.error(
      'Refusing to seed: at least one user already exists. Use `pnpm user:create` instead.',
    )
    process.exit(1)
  }

  const email = (process.env.SEED_EMAIL ?? (await ask('Admin email: '))).trim().toLowerCase()
  const name = (process.env.SEED_NAME ?? (await ask('Admin name: '))).trim()
  const password = process.env.SEED_PASSWORD ?? (await ask('Password: ', { silent: true }))

  if (!email || !name || !password) {
    console.error('Email, name, and password are required.')
    process.exit(1)
  }
  if (password.length < 12) {
    console.error('Password must be at least 12 characters.')
    process.exit(1)
  }

  const created = await payload.create({
    collection: 'users',
    data: { email, name, password, role: 'admin' },
  })

  console.info(`Created admin user ${created.email} (id: ${created.id}).`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
