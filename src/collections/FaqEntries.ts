import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'

export const FaqEntries: CollectionConfig = {
  slug: 'faq-entries',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'displayOrder'],
    group: 'Content',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Process', value: 'process' },
        { label: 'Preparation', value: 'preparation' },
        { label: 'Delivery', value: 'delivery' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedNiche',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Link to a specific service if this FAQ is niche-specific',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on the homepage FAQ section',
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
