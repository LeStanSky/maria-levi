import type { CollectionConfig } from 'payload'
import { universalBlocks } from '../blocks/universal'
import { isAdminOrEditor, publicRead } from '../fields/access'
import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { createRedirectHook } from '../hooks/createRedirect'
import { revalidateCollection } from '../hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isHomepage', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => {
        const slug = data?.isHomepage ? '/' : `/${data?.slug ?? ''}`
        return `${process.env.NEXT_PUBLIC_SITE_URL}${slug}`
      },
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
  hooks: {
    afterChange: [createRedirectHook('pages', ''), revalidateCollection],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField('title'),
    {
      name: 'isHomepage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this as the site homepage (only one page should have this)',
        position: 'sidebar',
      },
    },
    {
      name: 'pageBuilder',
      type: 'blocks',
      blocks: universalBlocks,
      admin: {
        description: 'Page content — add and reorder blocks',
      },
    },
    seoFields,
  ],
}
