import type { Block } from 'payload'

export const TestimonialsGrid: Block = {
  slug: 'testimonials-grid',
  labels: { singular: 'Testimonials Grid', plural: 'Testimonials Grids' },
  fields: [
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      maxRows: 6,
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
      ],
    },
  ],
}
