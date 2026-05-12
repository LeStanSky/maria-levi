import type { Block } from 'payload'

export const NearbyAreasGrid: Block = {
  slug: 'nearby-areas-grid',
  labels: { singular: 'Nearby Areas Grid', plural: 'Nearby Areas Grids' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'areas',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'link', type: 'text', admin: { description: 'e.g. /photographer-in/hoboken' } },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
