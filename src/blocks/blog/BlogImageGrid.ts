import type { Block } from 'payload'

export const BlogImageGrid: Block = {
  slug: 'blog-image-grid',
  labels: { singular: 'Image Grid', plural: 'Image Grids' },
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 2,
      maxRows: 3,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
