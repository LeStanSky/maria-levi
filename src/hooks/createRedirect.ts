import type { CollectionAfterChangeHook } from 'payload'

/**
 * After a slug change, creates a 301 Redirect from the old URL to the new one.
 * basePath: the URL prefix before the slug (e.g. '/portfolio', '/journal', '' for pages)
 */
export function createRedirectHook(
  _collection: string,
  basePath: string,
): CollectionAfterChangeHook {
  return async ({ doc, previousDoc, req, operation }) => {
    if (operation !== 'update') return doc
    if (!previousDoc?.slug || previousDoc.slug === doc.slug) return doc

    const from = basePath ? `${basePath}/${previousDoc.slug}` : `/${previousDoc.slug}`
    const to = basePath ? `${basePath}/${doc.slug}` : `/${doc.slug}`

    try {
      const existing = await req.payload.find({
        collection: 'redirects',
        where: { from: { equals: from } },
        limit: 1,
        req,
      })

      if (existing.totalDocs === 0) {
        await req.payload.create({
          collection: 'redirects',
          data: { from, to, statusCode: '301' },
          req,
        })
      } else {
        await req.payload.update({
          collection: 'redirects',
          id: existing.docs[0]?.id ?? 0,
          data: { to },
          req,
        })
      }
    } catch {
      // Non-blocking — redirect creation failure should not break the save
    }

    return doc
  }
}
