import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
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
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility and SEO (required)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption displayed below the image',
      },
    },
    {
      name: 'creditPhotographer',
      type: 'text',
      defaultValue: 'Maria Levi',
      admin: {
        description: 'Photo credit (defaults to "Maria Levi")',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        crop: 'center',
      },
      {
        name: 'card',
        width: 800,
        height: 1000,
        crop: 'center',
      },
      {
        name: 'hero',
        width: 2000,
        height: 1200,
        crop: 'center',
      },
    ],
  },
}
