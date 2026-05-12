import type { CollectionConfig } from 'payload'
import { localBlocks } from '../blocks/local'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const LocalLandingPages: CollectionConfig = {
  slug: 'local-landing-pages',
  admin: {
    useAsTitle: 'cityName',
    defaultColumns: ['cityName', 'slug', '_status'],
    group: 'Local SEO',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/photographer-in/${data?.slug ?? ''}`,
    },
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'cityName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Manhattan", "Jersey City"',
      },
    },
    ...slugField('cityName'),
    {
      name: 'cityState',
      type: 'text',
      admin: {
        description: 'State abbreviation e.g. "NY", "NJ"',
        position: 'sidebar',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Fashion & Personal Brand Photographer in Manhattan"',
      },
    },
    {
      name: 'subhead',
      type: 'text',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'intro',
      type: 'richText',
      admin: {
        description: 'Unique content about working in this city',
      },
    },
    {
      name: 'pageBuilder',
      type: 'blocks',
      blocks: localBlocks,
      admin: {
        description: 'Additional blocks for this city page',
      },
    },
    {
      name: 'featuredSeries',
      type: 'relationship',
      relationTo: 'portfolio-series',
      hasMany: true,
      maxRows: 6,
      admin: {
        description: 'Portfolio series shot in or near this city',
      },
    },
    {
      name: 'localTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Testimonials from clients in this city',
      },
    },
    {
      name: 'localServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Which services are most relevant for this city',
      },
    },
    {
      name: 'popularLocations',
      type: 'array',
      admin: {
        description: 'Well-known shooting locations in this city',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'nearbyAreas',
      type: 'array',
      admin: {
        description: 'Neighbouring cities/areas for internal linking',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'link',
          type: 'text',
          admin: { description: 'e.g. /photographer-in/hoboken' },
        },
      ],
    },
    seoFields,
  ],
}
