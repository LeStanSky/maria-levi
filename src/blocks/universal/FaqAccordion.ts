import type { Block } from 'payload'

export const FaqAccordion: Block = {
  slug: 'faq-accordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'headline', type: 'text' },
    {
      name: 'entries',
      type: 'relationship',
      relationTo: 'faq-entries',
      hasMany: true,
    },
  ],
}
