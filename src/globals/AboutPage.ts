import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidatePage'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: { group: 'Content' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'About · Full Story',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bodyPart1',
      type: 'richText',
      required: true,
      admin: { description: 'First section of text (before pull-quote)' },
    },
    {
      name: 'pullQuote',
      type: 'text',
    },
    {
      name: 'pullQuoteAttribution',
      type: 'text',
    },
    {
      name: 'bodyPart2',
      type: 'richText',
      required: true,
      admin: { description: 'Second section of text (after pull-quote)' },
    },
    {
      name: 'imagePair',
      type: 'array',
      maxRows: 2,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'bodyPart3',
      type: 'richText',
      admin: { description: 'Final closing section' },
    },
    {
      name: 'signoff',
      type: 'text',
      admin: {
        description: 'e.g. "I don\'t just create photos. I care about the woman behind them."',
      },
    },
    {
      name: 'credits',
      type: 'array',
      admin: { description: 'Credits row at the bottom — e.g. "Based in / New Jersey"' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    seoFields,
  ],
}
