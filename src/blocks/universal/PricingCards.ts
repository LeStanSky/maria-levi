import type { Block } from 'payload'

/**
 * Pricing section for landing pages. References an existing Service and renders
 * its `packages[]` — so prices live in ONE place (the Services admin Maria
 * already uses) and the landing page stays in sync. We never duplicate or
 * author price data here.
 */
export const PricingCards: Block = {
  slug: 'pricing-cards',
  labels: { singular: 'Pricing Cards', plural: 'Pricing Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      admin: {
        description: 'Which Service to pull packages + prices from. Edit prices in that Service.',
      },
    },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'Optional small print under the cards (e.g. tax / travel note).' },
    },
  ],
}
