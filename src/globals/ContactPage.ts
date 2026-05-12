import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Content' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: "Let's work together",
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Left-side image in the split layout' },
    },
    {
      name: 'responseTime',
      type: 'text',
      defaultValue: 'Response time: 1–2 business days',
    },
    {
      name: 'referralOptions',
      type: 'array',
      admin: { description: '"How did you hear about us?" dropdown options' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    seoFields,
  ],
}
