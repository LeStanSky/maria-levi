import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isAdminOrEditor } from '../fields/access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'sessionType', 'status', 'submittedAt'],
    group: 'Inbox',
  },
  access: {
    read: isAdminOrEditor,
    create: () => true, // public form submissions
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'sessionType',
      type: 'text',
      admin: {
        description: 'Service name at time of submission (snapshot, not a relation)',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Preferred shooting location or city',
      },
    },
    {
      name: 'budget',
      type: 'select',
      options: [
        { label: 'Under $500', value: 'under-500' },
        { label: '$500–$1,000', value: '500-1000' },
        { label: '$1,000–$2,000', value: '1000-2000' },
        { label: '$2,000+', value: '2000-plus' },
        { label: 'Not sure', value: 'not-sure' },
      ],
    },
    {
      name: 'referralSource',
      type: 'select',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Pinterest', value: 'pinterest' },
        { label: 'Referral', value: 'referral' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Booked', value: 'booked' },
        { label: 'Declined', value: 'declined' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        description: 'Admin-only notes about this lead',
      },
    },
    {
      name: 'crmSyncStatus',
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
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'crmExternalId',
      type: 'text',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        description: 'HoneyBook ID once CRM is connected',
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
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'gdprAnonymizedBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        read: isAdminField,
        update: isAdminField,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
