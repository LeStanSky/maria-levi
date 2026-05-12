import type { Access, FieldAccess } from 'payload'

type User = { role?: string } | null

export const isAdmin: Access = ({ req: { user } }) => (user as User)?.role === 'admin'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const role = (user as User)?.role
  return role === 'admin' || role === 'editor'
}

export const isAdminField: FieldAccess = ({ req: { user } }) => (user as User)?.role === 'admin'

export const publicRead: Access = () => true
