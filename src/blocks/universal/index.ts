import type { Block } from 'payload'
import { AboutPreview } from './AboutPreview'
import { BlogTeaser } from './BlogTeaser'
import { ContactSplit } from './ContactSplit'
import { CTABanner } from './CTABanner'
import { FaqAccordion } from './FaqAccordion'
import { HeroSlider } from './HeroSlider'
import { ImagePair } from './ImagePair'
import { IntroBlock } from './IntroBlock'
import { MediaBlock } from './MediaBlock'
import { NewsletterForm } from './NewsletterForm'
import { PortfolioTeaser } from './PortfolioTeaser'
import { ProcessSteps } from './ProcessSteps'
import { PullQuote } from './PullQuote'
import { RichTextBlock } from './RichTextBlock'
import { ServicesTeaser } from './ServicesTeaser'
import { Spacer } from './Spacer'
import { TestimonialSpread } from './TestimonialSpread'
import { TestimonialsGrid } from './TestimonialsGrid'

export const universalBlocks: Block[] = [
  HeroSlider,
  IntroBlock,
  PortfolioTeaser,
  ServicesTeaser,
  TestimonialSpread,
  TestimonialsGrid,
  AboutPreview,
  BlogTeaser,
  ContactSplit,
  ImagePair,
  PullQuote,
  ProcessSteps,
  CTABanner,
  NewsletterForm,
  FaqAccordion,
  RichTextBlock,
  MediaBlock,
  Spacer,
]
