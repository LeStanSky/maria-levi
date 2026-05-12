import type { Block } from 'payload'

export const AboutPreview: Block = {
  slug: 'about-preview',
  labels: { singular: 'About Preview', plural: 'About Previews' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Read my story' },
    { name: 'ctaLink', type: 'text', defaultValue: '/about' },
  ],
}
