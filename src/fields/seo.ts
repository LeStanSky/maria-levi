import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 60,
      admin: {
        description: 'Leave blank to auto-generate from title + " · Maria Levi Photography"',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'Leave blank to use excerpt or first paragraph (max 160 chars)',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Leave blank to fall back to cover/hero image or site default',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      admin: {
        description: 'Optional comma-separated keywords',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide this page from search engines',
      },
    },
    {
      name: 'canonical',
      type: 'text',
      admin: {
        description: 'Override canonical URL (leave blank in most cases)',
      },
    },
  ],
}
