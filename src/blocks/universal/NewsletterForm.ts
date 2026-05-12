import type { Block } from 'payload'

export const NewsletterForm: Block = {
  slug: 'newsletter-form',
  labels: { singular: 'Newsletter Form', plural: 'Newsletter Forms' },
  fields: [
    { name: 'headline', type: 'text' },
    { name: 'body', type: 'text' },
    { name: 'placeholder', type: 'text', defaultValue: 'Your email address' },
    {
      name: 'flodeskTag',
      type: 'text',
      admin: { description: 'Flodesk tag to apply on subscribe' },
    },
  ],
}
