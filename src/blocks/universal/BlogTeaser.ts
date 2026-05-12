import type { Block } from 'payload'

export const BlogTeaser: Block = {
  slug: 'blog-teaser',
  labels: { singular: 'Blog Teaser', plural: 'Blog Teasers' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      maxRows: 3,
    },
    { name: 'viewAllLink', type: 'text', defaultValue: '/journal' },
  ],
}
