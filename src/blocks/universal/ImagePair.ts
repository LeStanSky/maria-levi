import type { Block } from 'payload'

export const ImagePair: Block = {
  slug: 'image-pair',
  labels: { singular: 'Image Pair', plural: 'Image Pairs' },
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'caption', type: 'text' },
  ],
}
