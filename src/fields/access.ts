import type { Access, FieldAccess } from 'payload'

type User = { role?: string } | null

export const isAdmin: Access = ({ req: { user } }) => (user as User)?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const role = (user as User)?.role
  return role === 'admin' || role === 'editor'
}

export const isAdminField: FieldAccess = ({ req: { user } }) => (user as User)?.role === 'admin'

export const publicRead: Access = () => true

/**
 * Read access for draft-enabled collections: signed-in editors see everything
 * (admin, live preview); visitors see only published docs. Front-end queries
 * must pass `overrideAccess: false` for this to apply — the Local API bypasses
 * access control by default. Populated relationships to an unpublished doc come
 * back as a bare id, so renderers must treat non-objects as "not available".
 */
export const publishedOrSignedIn: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } }
