import type { Block } from 'payload'

export const PortfolioTeaser: Block = {
  slug: 'portfolio-teaser',
  labels: { singular: 'Portfolio Teaser', plural: 'Portfolio Teasers' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      maxRows: 3,
    },
    { name: 'viewAllLink', type: 'text' },
  ],
}
