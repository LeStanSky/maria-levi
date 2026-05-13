import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../fields/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    hidden: ({ user }) => (user as { role?: string })?.role !== 'admin',
    group: 'System',
  },
  access: {
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      required: true,
      defaultValue: 'Maria Levi',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Default hero tagline' },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { description: 'Inquiry emails are sent to this address' },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'region', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'US' },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'picTimeUrl',
      type: 'text',
      admin: { description: 'Link to Pic-Time client portal' },
    },
    {
      name: 'taxNote',
      type: 'textarea',
      defaultValue: 'Prices listed are before applicable sales tax.',
    },
    {
      name: 'travelNote',
      type: 'textarea',
    },
    {
      name: 'additionalNote',
      type: 'textarea',
    },
    {
      name: 'inquiryAutoreply',
      type: 'richText',
      admin: { description: 'Auto-reply email body sent after form submission' },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Fallback Open Graph image for pages without a specific one' },
    },
  ],
}
