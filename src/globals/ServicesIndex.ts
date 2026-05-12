import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'

export const ServicesIndex: GlobalConfig = {
  slug: 'services-index',
  label: 'Services Index Page',
  admin: { group: 'Services & Pricing' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subtitle', type: 'richText' },
    {
      name: 'niches',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { description: 'Select and order which services appear on this page' },
    },
    {
      name: 'taxNoteOverride',
      type: 'textarea',
      admin: {
        description: 'Override the default tax disclaimer (leave blank to use site default)',
      },
    },
    seoFields,
  ],
}
