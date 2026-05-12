import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isAdminOrEditor, publicRead } from '../fields/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'sessionType', 'featured', 'displayOrder'],
    group: 'Content',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Alina K." — first name + last initial',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'quoteHeadline',
      type: 'text',
      admin: {
        description: 'Short headline for journal-spread layout (optional)',
      },
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sessionType',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Which niche does this testimonial relate to?',
        position: 'sidebar',
      },
    },
    {
      name: 'relatedSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      admin: {
        description: 'Link to the portfolio series from this session (if published)',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on the homepage',
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
    {
      name: 'dateReceived',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'consentVerified',
      type: 'checkbox',
      defaultValue: false,
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        description: 'Admin only: client has given permission to publish this testimonial',
        position: 'sidebar',
      },
    },
  ],
}
