import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'nicheKey', 'displayOrder'],
    group: 'Services & Pricing',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Personal Brand Photography"',
      },
    },
    ...slugField('name'),
    {
      name: 'nicheKey',
      type: 'select',
      required: true,
      options: [
        { label: 'Personal Brand', value: 'personal-brand' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Model Tests', value: 'model-tests' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short value proposition (1–2 sentences)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Long-form description for the niche page',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail shown on the Services index page',
      },
    },
    {
      name: 'hasPackages',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck for Commercial (no fixed packages)',
      },
    },
    {
      name: 'packages',
      type: 'array',
      admin: {
        condition: (data) => Boolean(data?.hasPackages),
        description: 'Pricing tiers for this niche',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Essential", "Professional", "Premium Branding"',
          },
        },
        {
          name: 'tier',
          type: 'select',
          options: [
            { label: 'Essential', value: 'essential' },
            { label: 'Professional', value: 'professional' },
            { label: 'Premium', value: 'premium' },
          ],
        },
        {
          name: 'priceFrom',
          type: 'number',
          required: true,
          admin: {
            description: 'Starting price in USD (numbers only, e.g. 395)',
          },
        },
        {
          name: 'priceLabel',
          type: 'text',
          admin: {
            description: 'Override auto-generated label e.g. "Starting at $395"',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'e.g. "Perfect for a quick content refresh"',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Inquire',
        },
        {
          name: 'popular',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show "Most Popular" badge on this package',
          },
        },
      ],
    },
    {
      name: 'commercialNote',
      type: 'richText',
      admin: {
        condition: (data) => !data?.hasPackages,
        description: 'Custom pricing note for Commercial (shown instead of packages)',
      },
    },
    {
      name: 'processSteps',
      type: 'array',
      admin: {
        description: 'Step-by-step process for "How it works" section',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'whatToWearTip',
      type: 'richText',
      admin: {
        description: 'Wardrobe/preparation tip shown on the niche page',
      },
    },
    {
      name: 'relatedSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      maxRows: 6,
      admin: {
        description: 'Portfolio series showcasing this niche',
      },
    },
    {
      name: 'relatedTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faq-entries',
      hasMany: true,
      admin: {
        description: 'FAQ entries relevant to this service',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    seoFields,
  ],
}
