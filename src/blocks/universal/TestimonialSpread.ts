import type { Block } from 'payload'

export const TestimonialSpread: Block = {
  slug: 'testimonial-spread',
  labels: { singular: 'Testimonial Spread', plural: 'Testimonial Spreads' },
  fields: [
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
    },
  ],
}
