import type { BlogPost } from '@/payload-types'
import { BlogImageGrid } from './blog/BlogImageGrid'
import { BlogLeadMagnetInline } from './blog/BlogLeadMagnetInline'
import { BlogQuote } from './blog/BlogQuote'
import { BlogResourceLink } from './blog/BlogResourceLink'
import { BlogTipCallout } from './blog/BlogTipCallout'
import { BlogVideoEmbed } from './blog/BlogVideoEmbed'
import { MediaBlock, PullQuote, RichTextBlock } from './SimpleBlocks'

type Body = NonNullable<BlogPost['body']>
type Block = Body[number]

export function BlogBlocks({ blocks }: { blocks?: Body | null }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block: Block) => {
        const key = block.id ?? `${block.blockType}-${Math.random()}`
        switch (block.blockType) {
          case 'rich-text-block':
            return <RichTextBlock key={key} content={block.content} />
          case 'media-block':
            return (
              <MediaBlock
                key={key}
                image={block.image}
                caption={block.caption}
                width={block.width}
              />
            )
          case 'pull-quote':
            return (
              <PullQuote
                key={key}
                quote={block.quote}
                attribution={block.attribution}
                style={block.style}
              />
            )
          case 'blog-quote':
            return <BlogQuote key={key} quote={block.quote} attribution={block.attribution} />
          case 'blog-image-grid':
            return <BlogImageGrid key={key} images={block.images} />
          case 'blog-video-embed':
            return <BlogVideoEmbed key={key} url={block.url} caption={block.caption} />
          case 'blog-tip-callout':
            return <BlogTipCallout key={key} tip={block.tip} />
          case 'blog-resource-link':
            return (
              <BlogResourceLink
                key={key}
                title={block.title}
                description={block.description}
                url={block.url}
                label={block.label}
              />
            )
          case 'blog-lead-magnet-inline':
            return (
              <BlogLeadMagnetInline
                key={key}
                title={block.title}
                subtitle={block.subtitle}
                image={block.image}
                pdfFile={block.pdfFile}
                flodeskTag={block.flodeskTag}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
