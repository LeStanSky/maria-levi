import type { Block } from 'payload'

export const HeroSlider: Block = {
  slug: 'hero-slider',
  labels: { singular: 'Hero Slider', plural: 'Hero Sliders' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      defaultValue: 5000,
      admin: { description: 'Milliseconds between slides (default 5000)' },
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'tag',
      type: 'text',
      admin: { description: 'Small label above tagline' },
    },
  ],
}
