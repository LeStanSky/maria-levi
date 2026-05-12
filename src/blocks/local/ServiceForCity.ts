import type { Block } from 'payload'

export const ServiceForCity: Block = {
  slug: 'service-for-city',
  labels: { singular: 'Service for City', plural: 'Services for City' },
  fields: [
    { name: 'service', type: 'relationship', relationTo: 'services' },
    {
      name: 'localHeadline',
      type: 'text',
      admin: { description: 'Override service headline with a city-specific version' },
    },
    { name: 'localDescription', type: 'richText' },
  ],
}
