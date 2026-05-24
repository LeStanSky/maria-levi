import type { LocalLandingPage } from '@/payload-types'
import { AboutPreview } from './AboutPreview'
import { BlogTeaser } from './BlogTeaser'
import { CTABanner } from './CTABanner'
import { HeroSlider } from './HeroSlider.client'
import { IntroBlock } from './IntroBlock'
import { CityHighlight } from './local/CityHighlight'
import { LocalLocationsList } from './local/LocalLocationsList'
import { NearbyAreasGrid } from './local/NearbyAreasGrid'
import { ServiceForCity } from './local/ServiceForCity'
import { PortfolioTeaser } from './PortfolioTeaser'
import { ServicesTeaser } from './ServicesTeaser'
import { ImagePair, MediaBlock, PullQuote, RichTextBlock, Spacer } from './SimpleBlocks'
import { TestimonialSpread } from './TestimonialSpread'

type PageBuilder = NonNullable<LocalLandingPage['pageBuilder']>
type Block = PageBuilder[number]

export function LocalBlocks({ blocks }: { blocks?: PageBuilder | null }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block: Block) => {
        const key = block.id ?? `${block.blockType}-${Math.random()}`
        switch (block.blockType) {
          // Local-specific
          case 'city-highlight':
            return (
              <CityHighlight
                key={key}
                name={block.name}
                description={block.description}
                image={block.image}
              />
            )
          case 'service-for-city':
            return (
              <ServiceForCity
                key={key}
                service={block.service}
                localHeadline={block.localHeadline}
                localDescription={block.localDescription}
              />
            )
          case 'local-locations-list':
            return (
              <LocalLocationsList key={key} headline={block.headline} locations={block.locations} />
            )
          case 'nearby-areas-grid':
            return <NearbyAreasGrid key={key} headline={block.headline} areas={block.areas} />

          // Universal — same dispatch as Blocks.tsx
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
            return null
        }
      })}
    </>
  )
}
