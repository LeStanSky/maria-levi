import type { Block } from 'payload'

export const BlogResourceLink: Block = {
  slug: 'blog-resource-link',
  labels: { singular: 'Resource Link', plural: 'Resource Links' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'url', type: 'text', required: true },
    { name: 'label', type: 'text', defaultValue: 'Visit →' },
  ],
}
