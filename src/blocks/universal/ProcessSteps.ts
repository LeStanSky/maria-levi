import type { Block } from 'payload'

export const ProcessSteps: Block = {
  slug: 'process-steps',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
