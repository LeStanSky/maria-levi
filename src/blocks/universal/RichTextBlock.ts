import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'rich-text-block',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}
