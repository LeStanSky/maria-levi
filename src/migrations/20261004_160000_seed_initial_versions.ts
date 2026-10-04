import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Services and Portfolio Categories got drafts in v1.2.0, but their existing
 * docs had no rows in the versions tables. The admin list view of a
 * draft-enabled collection reads `latest` versions, so both lists showed
 * "No Results" while the site (main tables) was fine.
 *
 * Re-save every doc that has no latest version through the Local API so
 * Payload writes a full version snapshot (arrays, relationships included).
 * Content and status stay as they are. Idempotent: docs that already have a
 * latest version are skipped.
 */
const COLLECTIONS = ['services', 'portfolio-categories'] as const

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const collection of COLLECTIONS) {
    const { docs } = await payload.find({
      collection,
      depth: 0,
      limit: 0,
      pagination: false,
      req,
    })
    for (const doc of docs) {
      const latest = await payload.findVersions({
        collection,
        where: { and: [{ parent: { equals: doc.id } }, { latest: { equals: true } }] },
        limit: 1,
        depth: 0,
        req,
      })
      if (latest.totalDocs > 0) continue
      const status = doc._status === 'draft' ? 'draft' : 'published'
      await payload.update({
        collection,
        id: doc.id,
        data: { _status: status },
        draft: status === 'draft',
        depth: 0,
        req,
      })
      payload.logger.info(`[seed_initial_versions] ${collection} #${doc.id} → ${status}`)
    }
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Version rows are harmless to keep; nothing to undo.
}
