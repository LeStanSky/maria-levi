import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) return doc

  try {
    const tag = doc.slug ? `/${doc.slug}` : undefined
    const body = tag ? { tag } : { all: true }

    await fetch(`${siteUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify(body),
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
