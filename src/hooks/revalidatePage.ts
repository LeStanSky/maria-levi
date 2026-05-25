import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) return doc

  try {
    // Pages read content through the Payload local API with time-based ISR (no
    // fetch tags), so tag-based revalidation was a no-op — a list edit like
    // category order never refreshed the /portfolio index. Bust everything;
    // content edits are infrequent.
    await fetch(`${siteUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ all: true }),
    })
  } catch {
    // Non-blocking
  }

  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) return doc

  try {
    await fetch(`${siteUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ all: true }),
    })
  } catch {
    // Non-blocking
  }

  return doc
}
