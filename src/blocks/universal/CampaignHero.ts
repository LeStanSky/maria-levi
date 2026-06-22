import type { Block } from 'payload'

/**
 * Conversion hero for campaign / paid-traffic landing pages. Unlike HeroSlider
 * (editorial filmstrip), this is a single split hero: headline + supporting
 * line + price + one primary CTA, alongside a portrait.
 *
 * `priceText` is intentionally a free-text field with no default — Maria sets
 * the entry-offer wording herself (e.g. "Sessions from $350"). We never author
 * a price in code.
 */
export const CampaignHero: Block = {
  slug: 'campaign-hero',
  labels: { singular: 'Campaign Hero', plural: 'Campaign Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    {
      name: 'subheadline',
      type: 'textarea',
      admin: { description: 'Supporting line under the H1 (1–2 sentences).' },
    },
    {
      name: 'priceText',
      type: 'text',
      admin: {
        description:
          'Entry-price line, e.g. "Sessions from $350". You set this — leave blank to hide.',
      },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Book a Session',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      defaultValue: '/contact?session_type=personal-brand&source=personal-branding',
    },
  ],
}
