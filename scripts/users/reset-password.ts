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
      return await rl.question(prompt)
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

  const email = (process.env.RESET_EMAIL ?? (await ask('Email: '))).trim().toLowerCase()
  const password = process.env.RESET_PASSWORD ?? (await ask('New password: ', { silent: true }))

  if (!email || !password) {
    console.error('Email and password are required.')
    process.exit(1)
  }
  if (password.length < 12) {
    console.error('Password must be at least 12 characters.')
    process.exit(1)
  }

  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (found.docs.length === 0) {
    console.error(`No user with email ${email}.`)
    process.exit(1)
  }

  const user = found.docs[0]
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { password, loginAttempts: 0, lockUntil: null },
  })

  console.info(`Password reset for ${email}. Login attempts and lockouts cleared.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
