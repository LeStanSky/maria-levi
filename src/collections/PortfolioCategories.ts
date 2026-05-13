import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidatePage'

export const PortfolioCategories: CollectionConfig = {
  slug: 'portfolio-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'displayOrder'],
    group: 'Portfolio',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: { afterChange: [revalidateCollection] },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Portrait Photography", "Personal Brand"',
      },
    },
    ...slugField('name'),
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Selected Work',
      admin: {
        description: 'Small label above the headline on the category page',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Poetic one-liner shown under the category name',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Long-form description shown on the category page',
      },
    },
    {
      name: 'hasSubcategories',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable for Brand Photography only',
      },
    },
    {
      name: 'subcategories',
      type: 'array',
      admin: {
        condition: (data) => Boolean(data?.hasSubcategories),
        description: 'Sub-categories within this category (Brand only)',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Controls order in navigation and portfolio index',
        position: 'sidebar',
      },
    },
    seoFields,
  ],
}
