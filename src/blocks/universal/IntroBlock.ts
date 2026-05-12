import type { Block } from 'payload'

export const IntroBlock: Block = {
  slug: 'intro-block',
  labels: { singular: 'Intro Block', plural: 'Intro Blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
