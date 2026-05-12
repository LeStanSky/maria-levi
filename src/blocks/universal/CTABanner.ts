import type { Block } from 'payload'

export const CTABanner: Block = {
  slug: 'cta-banner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'ctaLabel', type: 'text', required: true },
    { name: 'ctaLink', type: 'text', required: true },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}
