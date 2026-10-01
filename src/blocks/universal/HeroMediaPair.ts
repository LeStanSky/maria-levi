import type { Block } from 'payload'

export const HeroMediaPair: Block = {
  slug: 'hero-media-pair',
  labels: { singular: 'Hero Photo + Video', plural: 'Hero Photo + Video' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Portrait photo (shown full-height, cropped to fill)' },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'videos',
      required: true,
      admin: {
        description:
          'Short silent loop (MP4/H.264, ideally ≤ 5 MB). Set a poster on the video — it shows while loading and for visitors with reduced motion.',
      },
    },
    {
      name: 'videoPosition',
      // Short enum name — the local-landing-pages version table would exceed
      // Postgres' 63-char identifier limit.
      enumName: 'hero_pair_video_pos',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Video on the right', value: 'right' },
        { label: 'Video on the left', value: 'left' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'tag',
      type: 'text',
      admin: { description: 'Small label above tagline' },
    },
  ],
}
