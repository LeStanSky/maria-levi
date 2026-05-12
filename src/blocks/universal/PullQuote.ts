import type { Block } from 'payload'

export const PullQuote: Block = {
  slug: 'pull-quote',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  fields: [
    { name: 'quote', type: 'text', required: true },
    { name: 'attribution', type: 'text' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'bordered',
      options: [
        { label: 'Bordered', value: 'bordered' },
        { label: 'Plain', value: 'plain' },
      ],
    },
  ],
}
