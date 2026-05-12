import type { Block } from 'payload'

export const ContactSplit: Block = {
  slug: 'contact-split',
  labels: { singular: 'Contact Split', plural: 'Contact Splits' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'formVariant',
      type: 'select',
      defaultValue: 'short',
      options: [
        { label: 'Short (name + email + message)', value: 'short' },
        { label: 'Full (all fields)', value: 'full' },
      ],
    },
  ],
}
