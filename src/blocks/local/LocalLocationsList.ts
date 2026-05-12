import type { Block } from 'payload'

export const LocalLocationsList: Block = {
  slug: 'local-locations-list',
  labels: { singular: 'Locations List', plural: 'Locations Lists' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'locations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
