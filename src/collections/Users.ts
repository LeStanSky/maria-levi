import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'lastLogin'],
    hidden: ({ user }) => user?.role !== 'admin',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 60 * 60 * 1000,
    tokenExpiration: 60 * 60 * 2,
    useAPIKey: false,
    verify: false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
    {
      name: 'disabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Disabled accounts cannot log in.',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: { lastLogin: new Date().toISOString() },
        })
      },
    ],
  },
}
