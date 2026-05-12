import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../fields/access'
import { slugField } from '../fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug'],
    group: 'Portfolio',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField('name'),
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Location', value: 'location' },
        { label: 'Mood', value: 'mood' },
        { label: 'Theme', value: 'theme' },
        { label: 'Style', value: 'style' },
        { label: 'Season', value: 'season' },
      ],
    },
  ],
}
