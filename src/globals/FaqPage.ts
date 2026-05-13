import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidatePage'

export const FaqPage: GlobalConfig = {
  slug: 'faq-page',
  label: 'FAQ Page',
  admin: { group: 'Content' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'intro', type: 'richText' },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Left-side image in the split layout' },
    },
    seoFields,
  ],
}
