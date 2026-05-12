import type { CollectionConfig } from 'payload'
import { blogBlocks } from '../blocks/blog'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { createRedirectHook } from '../hooks/createRedirect'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishDate', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/journal/${data?.slug ?? ''}`,
    },
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [createRedirectHook('blog-posts', '/journal')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Short preview for blog index and SEO description (max 200 chars)',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'body',
      type: 'blocks',
      blocks: blogBlocks,
      admin: {
        description: 'Article content — add and reorder blocks',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Up to 3 related articles shown at the bottom',
        position: 'sidebar',
      },
    },
    {
      name: 'relatedSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      maxRows: 2,
      admin: {
        description: 'Cross-link to portfolio series (up to 2)',
        position: 'sidebar',
      },
    },
    {
      name: 'cityTags',
      type: 'array',
      admin: {
        description: 'City slugs if this post is relevant to city landing pages',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'nicheTags',
      type: 'array',
      admin: {
        description: 'Niche tags for content filtering',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'niche',
          type: 'select',
          required: true,
          options: [
            { label: 'Personal Brand', value: 'personal-brand' },
            { label: 'Portrait', value: 'portrait' },
            { label: 'Model Tests', value: 'model-tests' },
            { label: 'Commercial', value: 'commercial' },
          ],
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Maria Levi',
      admin: {
        position: 'sidebar',
      },
    },
    seoFields,
  ],
}
