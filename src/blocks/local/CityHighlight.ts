import type { Block } from 'payload'

export const CityHighlight: Block = {
  slug: 'city-highlight',
  labels: { singular: 'City Highlight', plural: 'City Highlights' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Neighbourhood or area name' },
    },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
