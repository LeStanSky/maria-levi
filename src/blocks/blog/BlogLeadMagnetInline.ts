import type { Block } from 'payload'

export const BlogLeadMagnetInline: Block = {
  slug: 'blog-lead-magnet-inline',
  labels: { singular: 'Lead Magnet (inline)', plural: 'Lead Magnets (inline)' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'PDF to deliver on subscribe' },
    },
    { name: 'flodeskTag', type: 'text' },
  ],
}
