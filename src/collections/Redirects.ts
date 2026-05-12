import type { CollectionConfig } from 'payload'
import { isAdmin } from '../fields/access'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'statusCode', 'createdAt'],
    hidden: ({ user }) => (user as { role?: string })?.role !== 'admin',
    group: 'System',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Old URL path (e.g. /old-slug)',
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: {
        description: 'New URL path to redirect to',
      },
    },
    {
      name: 'statusCode',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 Permanent', value: '301' },
        { label: '302 Temporary', value: '302' },
      ],
    },
  ],
}
