import type { Block } from 'payload'
import { MediaBlock } from '../universal/MediaBlock'
import { PullQuote } from '../universal/PullQuote'
import { RichTextBlock } from '../universal/RichTextBlock'
import { BlogImageGrid } from './BlogImageGrid'
import { BlogLeadMagnetInline } from './BlogLeadMagnetInline'
import { BlogQuote } from './BlogQuote'
import { BlogResourceLink } from './BlogResourceLink'
import { BlogTipCallout } from './BlogTipCallout'
import { BlogVideoEmbed } from './BlogVideoEmbed'

export const blogBlocks: Block[] = [
  RichTextBlock,
  MediaBlock,
  PullQuote,
  BlogQuote,
  BlogImageGrid,
  BlogVideoEmbed,
  BlogTipCallout,
  BlogResourceLink,
  BlogLeadMagnetInline,
]
