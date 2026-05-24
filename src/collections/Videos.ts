import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { revalidateCollection } from '../hooks/revalidatePage'

/**
 * Videos — short-form clips (Option C scaffold, 2026-05-21).
 *
 * The upload point for video, parallel to the photo `media` collection. Maria can
 * upload clips here just like photos. Globals (`SiteSettings.heroVideo`,
 * `AboutPage.btsVideo`) and `relatedSeries` reference these docs.
 *
 * STATUS: schema scaffolded; front-end render is intentionally TODO (Phase 7).
 *   - No transcoding yet — uploads must already be web-optimised (H.264, ≤ ~5MB).
 *   - Storage is local default until R2 / Cloudflare Stream is wired (memory §4).
 *   See internal_docs/maria_v9/video-brief-for-cli.md for the full placement plan.
 */
export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'niche', 'orientation', 'displayOrder'],
    group: 'Portfolio',
    description: 'Short-form video clips. Render wired incrementally (Phase 7).',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: ['video/mp4', 'video/quicktime', 'video/webm'],
  },
  hooks: { afterChange: [revalidateCollection] },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal label, e.g. "BTS — studio session"' },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Accessibility description (required)' },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Poster frame shown before play and on mobile (protects LCP — recommended).',
      },
    },
    {
      name: 'niche',
      type: 'select',
      options: [
        { label: 'Personal Brand', value: 'personal-brand' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Model Tests', value: 'model-tests' },
        { label: 'Commercial', value: 'commercial' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'orientation',
      type: 'select',
      options: [
        { label: 'Vertical 9:16', value: 'vertical' },
        { label: 'Horizontal 16:9', value: 'horizontal' },
        { label: 'Square 1:1', value: 'square' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Drives layout (vertical clips ≠ horizontal hero).',
      },
    },
    {
      name: 'usage',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Homepage hero', value: 'hero' },
        { label: 'About — behind the scenes', value: 'about-bts' },
        { label: 'Services showcase', value: 'services-showcase' },
        { label: 'Portfolio mixed-media', value: 'portfolio' },
      ],
      admin: {
        description: 'Where this clip is intended to appear (render added incrementally).',
      },
    },
    {
      name: 'silent',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'No meaningful audio — safe to autoplay muted.' },
    },
    {
      name: 'relatedSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      admin: { description: 'Photo series this clip belongs to (for mixed-media grids).' },
    },
    {
      name: 'creditPhotographer',
      type: 'text',
      defaultValue: 'Maria Levi',
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: { position: 'sidebar' },
    },
  ],
}
