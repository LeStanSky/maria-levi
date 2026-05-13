import type { Page } from '@/payload-types'
import { AboutPreview } from './AboutPreview'
import { BlogTeaser } from './BlogTeaser'
import { CTABanner } from './CTABanner'
import { HeroSlider } from './HeroSlider.client'
import { IntroBlock } from './IntroBlock'
import { PortfolioTeaser } from './PortfolioTeaser'
import { ServicesTeaser } from './ServicesTeaser'
import { ImagePair, MediaBlock, PullQuote, RichTextBlock, Spacer } from './SimpleBlocks'
import { TestimonialSpread } from './TestimonialSpread'

type Block = NonNullable<Page['pageBuilder']>[number]

export function Blocks({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block) => {
        const key = block.id ?? `${block.blockType}-${Math.random()}`
        switch (block.blockType) {
          case 'hero-slider':
            return <HeroSlider key={key} {...block} />
          case 'intro-block':
            return <IntroBlock key={key} {...block} />
          case 'about-preview':
            return <AboutPreview key={key} {...block} />
          case 'portfolio-teaser':
            return <PortfolioTeaser key={key} {...block} />
          case 'services-teaser':
            return <ServicesTeaser key={key} {...block} />
          case 'testimonial-spread':
            return <TestimonialSpread key={key} {...block} />
          case 'blog-teaser':
            return <BlogTeaser key={key} {...block} />
          case 'cta-banner':
            return <CTABanner key={key} {...block} />
          case 'rich-text-block':
            return <RichTextBlock key={key} {...block} />
          case 'media-block':
            return <MediaBlock key={key} {...block} />
          case 'pull-quote':
            return <PullQuote key={key} {...block} />
          case 'image-pair':
            return <ImagePair key={key} {...block} />
          case 'spacer':
            return <Spacer key={key} {...block} />
          default:
            // Block type registered in schema but no renderer yet (e.g. contact-split,
            // newsletter-form, faq-accordion, testimonials-grid, process-steps) — skip silently.
            return null
        }
      })}
    </>
  )
}
