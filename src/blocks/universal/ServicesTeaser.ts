import type { Block } from 'payload'

export const ServicesTeaser: Block = {
  slug: 'services-teaser',
  labels: { singular: 'Services Teaser', plural: 'Services Teasers' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 4,
    },
    {
      name: 'displayMode',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
  ],
}
