import type { Block } from 'payload'

export const BlogTipCallout: Block = {
  slug: 'blog-tip-callout',
  labels: { singular: 'Tip Callout', plural: 'Tip Callouts' },
  fields: [{ name: 'tip', type: 'richText', required: true }],
}
