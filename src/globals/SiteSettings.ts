import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../fields/access'
import { revalidateGlobal } from '../hooks/revalidatePage'

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
  // SiteSettings feeds the footer + Services notes (taxNote/travelNote/etc.),
  // so edits must bust the cached pages like the other content globals do.
  hooks: { afterChange: [revalidateGlobal] },
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
      name: 'heroVideo',
      type: 'relationship',
      relationTo: 'videos',
      admin: {
        description:
          'Homepage hero clip (Option C scaffold — render TODO). Use a short, silent, horizontal clip.',
      },
    },
    {
      name: 'taxNote',
      type: 'textarea',
      defaultValue: 'All prices include applicable sales tax.',
      admin: {
        description:
          'Pricing fine print shown under the Services pricing (e.g. how tax is handled). Leave blank to hide.',
      },
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
