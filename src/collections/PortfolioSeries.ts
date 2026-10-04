import type { Access, CollectionConfig, Where } from 'payload'
import { isAdminOrEditor } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { createRedirectHook } from '../hooks/createRedirect'
import { revalidateCollection } from '../hooks/revalidatePage'

// Visitors see a series only when it AND its category are published, so
// unpublishing a category hides all of its series too.
const publishedSeries: Where = {
  and: [{ _status: { equals: 'published' } }, { 'category._status': { equals: 'published' } }],
}
const readPublishedSeries: Access = ({ req: { user } }) => (user ? true : publishedSeries)

export const PortfolioSeries: CollectionConfig = {
  slug: 'portfolio-series',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'displayOrder', '_status'],
    group: 'Portfolio',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${data?.slug ?? ''}`,
    },
  },
  access: {
    read: readPublishedSeries,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
  },
  // Deleting moves the series to Trash (restorable from the list view).
  trash: true,
  hooks: {
    afterChange: [createRedirectHook('portfolio-series', '/portfolio'), revalidateCollection],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Sweet Cycle", "Solstice", "Tiffany Hour"',
      },
    },
    ...slugField('title'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'portfolio-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subcategory',
      type: 'text',
      admin: {
        description: 'Sub-category slug (Brand only) — e.g. "personal-brand"',
        position: 'sidebar',
        condition: () => true,
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'e.g. "Editorial · 2026"',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'One-liner about the series mood',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Context: where, for whom, the mood of the shoot',
      },
    },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'Features' },
      admin: {
        description:
          'Project highlights shown as an accordion beside the description (e.g. "Photography & Lighting", "Styling"). The first one is open by default. Leave empty to keep the single-column layout.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail shown in the category grid',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Full-bleed hero on the series page (falls back to coverImage)',
      },
    },
    {
      name: 'photos',
      type: 'array',
      admin: {
        description: 'Drag to reorder. Each photo needs alt text.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Locations, themes, moods for cross-linking',
      },
    },
    {
      name: 'cityTags',
      type: 'array',
      admin: {
        description: 'City slugs where this shoot took place (used by city landing pages)',
      },
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "manhattan", "hoboken"',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in Portfolio Teaser on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order within its category',
        position: 'sidebar',
      },
    },
    {
      name: 'relatedSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: '"More like this" — up to 3 related series',
        position: 'sidebar',
      },
    },
    seoFields,
  ],
}
