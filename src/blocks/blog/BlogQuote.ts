import type { Block } from 'payload'

export const BlogQuote: Block = {
  slug: 'blog-quote',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
  ],
}
