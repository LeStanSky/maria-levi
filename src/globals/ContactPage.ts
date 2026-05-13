import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidatePage'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Content' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  hooks: { afterChange: [revalidateGlobal] },
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
      admin: { description: 'Left-side image in the split layout' },
    },
    {
      name: 'responseTime',
      type: 'text',
      defaultValue: 'Response time: 1–2 business days',
    },
    {
      name: 'inquiriesEmail',
      type: 'email',
      required: true,
      defaultValue: 'stalevs@gmail.com',
      admin: {
        description:
          'Where new inquiries are delivered. Change to Maria’s inbox once she has one set up.',
      },
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
