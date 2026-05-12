import type { Block } from 'payload'

export const BlogVideoEmbed: Block = {
  slug: 'blog-video-embed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube or Vimeo URL' },
    },
    { name: 'caption', type: 'text' },
  ],
}
