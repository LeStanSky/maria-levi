import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../fields/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    hidden: ({ user }) => (user as { role?: string })?.role !== 'admin',
    group: 'System',
  },
  access: {
    read: isAdminOrEditor,
    update: isAdmin,
  },
  versions: {
    drafts: false,
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      admin: { description: 'Sidebar navigation links' },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'URL path e.g. /portfolio' },
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      admin: { description: 'Privacy, Terms, Cookies links in the footer' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
