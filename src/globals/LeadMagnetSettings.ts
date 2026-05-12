import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'

export const LeadMagnetSettings: GlobalConfig = {
  slug: 'lead-magnet-settings',
  label: 'Lead Magnet',
  admin: { group: 'Marketing' },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Master switch — turn the lead magnet popup on/off' },
    },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'PDF cover preview' },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'The PDF delivered on subscribe (upload as Media)' },
    },
    {
      name: 'flodeskTag',
      type: 'text',
      admin: { description: 'Flodesk tag applied on subscribe' },
    },
    {
      name: 'trigger',
      type: 'select',
      defaultValue: 'delay-30s',
      options: [
        { label: 'Delay 30s', value: 'delay-30s' },
        { label: 'Exit intent', value: 'exit-intent' },
        { label: 'Scroll 50%', value: 'scroll-50pct' },
      ],
    },
    {
      name: 'placement',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Popup', value: 'popup' },
        { label: 'Footer block', value: 'footer-block' },
        { label: 'Blog inline', value: 'blog-inline' },
      ],
    },
    { name: 'successMessage', type: 'text', defaultValue: 'Check your email for the guide' },
    { name: 'consentText', type: 'text' },
  ],
}
