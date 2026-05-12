import type { Field } from 'payload'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export function slugField(sourceField = 'title'): Field[] {
  return [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier. Auto-generated from title, editable.',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (!value && siblingData?.[sourceField]) {
              return slugify(String(siblingData[sourceField]))
            }
            if (value) return slugify(value)
            return value
          },
        ],
      },
    },
  ]
}
