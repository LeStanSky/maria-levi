import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isAdminOrEditor } from '../fields/access'

export const SUBSCRIBER_SOURCES = [
  'lead-magnet',
  'newsletter',
  'blog-inline',
  'footer-block',
] as const

export type SubscriberSource = (typeof SUBSCRIBER_SOURCES)[number]

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'status', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    read: isAdminOrEditor,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.email) {
          data.email = String(data.email).toLowerCase().trim()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'lead-magnet',
      options: SUBSCRIBER_SOURCES.map((value) => ({ label: value, value })),
      admin: {
        description: 'Where the subscriber signed up (popup, footer form, blog inline, etc.)',
      },
    },
    {
      name: 'leadMagnetSlug',
      type: 'text',
      admin: {
        description: 'Slug of the lead magnet at time of signup (snapshot)',
      },
    },
    {
      name: 'tag',
      type: 'text',
      admin: {
        description: 'Flodesk tag applied on subscribe (snapshot)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pageSubmittedFrom',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'URL of the page where the form was submitted',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'confirmedAt',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'lastDeliveryAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Last time the lead magnet PDF was emailed',
      },
    },
    {
      name: 'deliveryCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'How many times the PDF email has been (re-)sent',
      },
    },
    {
      name: 'flodeskSyncStatus',
      type: 'select',
      defaultValue: 'not-synced',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      options: [
        { label: 'Not synced', value: 'not-synced' },
        { label: 'Synced', value: 'synced' },
        { label: 'Failed', value: 'failed' },
        { label: 'Skipped (no key)', value: 'skipped' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'flodeskExternalId',
      type: 'text',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        description: 'Flodesk subscriber ID after sync',
        position: 'sidebar',
      },
    },
    {
      name: 'gdprAnonymizedAt',
      type: 'date',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'gdprAnonymizedBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  timestamps: true,
}
