import type { Block, Field } from 'payload'

const hideOnSiteField: Field = {
  name: 'hideOnSite',
  type: 'checkbox',
  defaultValue: false,
  label: 'Hide on site',
  admin: {
    description:
      'Keeps this block and its settings here but stops showing it on the site. Untick to bring it back.',
  },
}

/**
 * Adds a "Hide on site" checkbox as the first field of every block, so editors
 * can switch a block off (e.g. the old Hero Slider) without deleting it.
 * Returns new block objects — the shared block configs stay untouched, so a
 * collection that doesn't opt in (Journal) gets no extra column.
 */
export function withHideOnSite(blocks: Block[]): Block[] {
  return blocks.map((block) =>
    block.fields.some((f) => 'name' in f && f.name === 'hideOnSite')
      ? block
      : { ...block, fields: [hideOnSiteField, ...block.fields] },
  )
}

/** Front-end filter for page-builder arrays. */
export function visibleBlocks<T extends { hideOnSite?: boolean | null }>(
  blocks: T[] | null | undefined,
): T[] {
  return (blocks ?? []).filter((b) => !b.hideOnSite)
}
