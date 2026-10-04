import type { Block, Field } from 'payload'

export const hideOnSiteField: Field = {
  name: 'hideOnSite',
  type: 'checkbox',
  defaultValue: false,
  label: 'Hide on site',
  admin: {
    description:
      'Keeps this item and its settings here but stops showing it on the site. Untick to bring it back.',
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

/** Front-end filter for anything carrying the toggle (blocks, packages). */
export function visibleOnSite<T extends { hideOnSite?: boolean | null }>(
  items: T[] | null | undefined,
): T[] {
  return (items ?? []).filter((item) => !item.hideOnSite)
}

/** Service with hidden packages removed — use before rendering prices/cards. */
export function withVisiblePackages<
  S extends { packages?: { hideOnSite?: boolean | null }[] | null },
>(service: S): S {
  return { ...service, packages: visibleOnSite(service.packages) }
}
