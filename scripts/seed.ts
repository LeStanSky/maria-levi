/**
 * Seed script — populates dev DB with demo content for Phase 1 testing.
 * Run: pnpm seed
 * Safe to re-run: skips collections that already have data.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  // ── Portfolio Categories ────────────────────────────────────────────────────
  const catCount = await payload.count({ collection: 'portfolio-categories' })
  if (catCount.totalDocs === 0) {
    console.info('Seeding portfolio categories...')
    const cats = [
      { name: 'Personal Brand Photography', slug: 'personal-brand', displayOrder: 1 },
      { name: 'Portrait Photography', slug: 'portrait', displayOrder: 2 },
      { name: 'Model Tests', slug: 'model-tests', displayOrder: 3 },
      { name: 'Commercial Photography', slug: 'commercial', displayOrder: 4 },
    ]
    for (const cat of cats) {
      await payload.create({ collection: 'portfolio-categories', data: cat as never })
    }
    console.info(`  Created ${cats.length} categories.`)
  } else {
    console.info('Portfolio categories already exist — skipping.')
  }

  // ── Blog Categories ─────────────────────────────────────────────────────────
  const blogCatCount = await payload.count({ collection: 'blog-categories' })
  if (blogCatCount.totalDocs === 0) {
    console.info('Seeding blog categories...')
    const blogCats = [
      { name: 'Tips', slug: 'tips' },
      { name: 'Locations', slug: 'locations' },
      { name: 'Inspiration', slug: 'inspiration' },
      { name: 'Recommendations', slug: 'recommendations' },
    ]
    for (const cat of blogCats) {
      await payload.create({ collection: 'blog-categories', data: cat as never })
    }
    console.info(`  Created ${blogCats.length} blog categories.`)
  } else {
    console.info('Blog categories already exist — skipping.')
  }

  // ── Tags ────────────────────────────────────────────────────────────────────
  const tagCount = await payload.count({ collection: 'tags' })
  if (tagCount.totalDocs === 0) {
    console.info('Seeding tags...')
    const tags = [
      { name: 'Manhattan', slug: 'manhattan', type: 'location' },
      { name: 'Jersey City', slug: 'jersey-city', type: 'location' },
      { name: 'Hoboken', slug: 'hoboken', type: 'location' },
      { name: 'Editorial', slug: 'editorial', type: 'theme' },
      { name: 'Moody', slug: 'moody', type: 'mood' },
      { name: 'Natural Light', slug: 'natural-light', type: 'style' },
    ]
    for (const tag of tags) {
      await payload.create({ collection: 'tags', data: tag as never })
    }
    console.info(`  Created ${tags.length} tags.`)
  } else {
    console.info('Tags already exist — skipping.')
  }

  // ── Services ────────────────────────────────────────────────────────────────
  const svcCount = await payload.count({ collection: 'services' })
  if (svcCount.totalDocs === 0) {
    console.info('Seeding services...')
    const services = [
      {
        name: 'Personal Brand Photography',
        slug: 'personal-brand-photography',
        nicheKey: 'personal-brand',
        tagline: 'Strategic, scroll-stopping visuals for your brand.',
        hasPackages: true,
        displayOrder: 1,
        processSteps: [
          { title: 'Discovery Call', description: 'We align on your brand vision and goals.' },
          { title: 'Shot List & Planning', description: 'Together we plan every detail.' },
          { title: 'The Shoot', description: 'A relaxed, guided session at your chosen location.' },
          { title: 'Delivery', description: 'Edited gallery ready within 7–10 days.' },
        ],
        packages: [
          {
            name: 'Essential',
            tier: 'essential',
            priceFrom: 395,
            subtitle: 'Perfect for a quick content refresh',
            features: [
              { text: '1-hour session' },
              { text: '1 location' },
              { text: '30 edited images' },
            ],
            ctaLabel: 'Inquire',
          },
          {
            name: 'Professional',
            tier: 'professional',
            priceFrom: 695,
            subtitle: 'Ideal for an active social media presence',
            popular: true,
            features: [
              { text: '2-hour session' },
              { text: '2 locations' },
              { text: '60 edited images' },
              { text: '2 outfit changes' },
            ],
            ctaLabel: 'Inquire',
          },
          {
            name: 'Premium Branding',
            tier: 'premium',
            priceFrom: 1200,
            subtitle: 'Full brand story for launch campaigns',
            features: [
              { text: 'Half-day session (4 hours)' },
              { text: 'Multiple locations' },
              { text: '100+ edited images' },
              { text: 'Wardrobe consultation' },
              { text: 'Mood board creation' },
            ],
            ctaLabel: 'Inquire',
          },
        ],
      },
      {
        name: 'Portrait Photography',
        slug: 'portrait-photography',
        nicheKey: 'portrait',
        tagline: 'Portraits as a mirror of the soul.',
        hasPackages: true,
        displayOrder: 2,
        processSteps: [
          { title: 'Consultation', description: 'Brief call to understand the look you want.' },
          { title: 'Session Prep', description: 'Guidance on wardrobe and location.' },
          { title: 'The Shoot', description: 'Relaxed, intimate portrait session.' },
          { title: 'Delivery', description: 'Online gallery within 5–7 days.' },
        ],
        packages: [
          {
            name: 'Essential',
            tier: 'essential',
            priceFrom: 295,
            features: [{ text: '45-minute session' }, { text: '20 edited images' }],
            ctaLabel: 'Inquire',
          },
          {
            name: 'Professional',
            tier: 'professional',
            priceFrom: 495,
            popular: true,
            features: [
              { text: '90-minute session' },
              { text: '40 edited images' },
              { text: '2 outfit changes' },
            ],
            ctaLabel: 'Inquire',
          },
        ],
      },
      {
        name: 'Model Tests',
        slug: 'model-tests',
        nicheKey: 'model-tests',
        tagline: 'Test shoots that open doors.',
        hasPackages: true,
        displayOrder: 3,
        packages: [
          {
            name: 'Essential',
            tier: 'essential',
            priceFrom: 350,
            features: [
              { text: '2-hour session' },
              { text: '2 looks' },
              { text: '40 edited selects' },
            ],
            ctaLabel: 'Inquire',
          },
        ],
      },
      {
        name: 'Commercial Photography',
        slug: 'commercial-photography',
        nicheKey: 'commercial',
        tagline: 'Custom solutions for brands and businesses.',
        hasPackages: false,
        displayOrder: 4,
      },
    ]

    for (const svc of services) {
      await payload.create({ collection: 'services', data: svc as never })
    }
    console.info(`  Created ${services.length} services.`)
  } else {
    console.info('Services already exist — skipping.')
  }

  // ── FAQ Entries ─────────────────────────────────────────────────────────────
  const faqCount = await payload.count({ collection: 'faq-entries' })
  if (faqCount.totalDocs === 0) {
    console.info('Seeding FAQ entries...')
    const faqs = [
      {
        question: 'Where are you based, and do you travel?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "I'm based in New Jersey and primarily serve the NYC metro area — Manhattan, Brooklyn, Jersey City, Hoboken, and Princeton. I'm happy to travel further for the right project.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'general',
        displayOrder: 1,
        featured: true,
      },
      {
        question: 'How far in advance should I book?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'I recommend booking 3–6 weeks in advance for personal sessions, and 6–8 weeks for brand and commercial projects. Peak months (September–November and March–May) book quickly.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'process',
        displayOrder: 2,
        featured: true,
      },
      {
        question: 'How long until I receive my photos?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Personal brand and portrait sessions: 7–10 business days. Commercial projects: 2–3 weeks depending on scope.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'delivery',
        displayOrder: 3,
        featured: true,
      },
      {
        question: 'What should I wear?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Choose outfits that feel like "you" — clothes you\'d wear to an important meeting or event. Avoid busy patterns and bright logos. Solid colors and textures photograph beautifully.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'preparation',
        displayOrder: 4,
        featured: true,
      },
      {
        question: 'Do you offer payment plans?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Yes — a 50% retainer secures your date, with the remaining balance due 48 hours before your session.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'pricing',
        displayOrder: 5,
      },
      {
        question: 'What if it rains on my outdoor shoot day?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "We'll reschedule at no extra cost. I monitor weather closely and reach out proactively if conditions look challenging.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'process',
        displayOrder: 6,
      },
      {
        question: 'Can I bring a friend or partner to my session?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'For solo sessions I recommend coming alone — it helps you stay focused and comfortable. One supportive companion is welcome for brand shoots if needed.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'preparation',
        displayOrder: 7,
      },
      {
        question: 'How are images delivered?',
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Through Pic-Time, a professional online gallery. You'll receive a link to download high-resolution files and share favourites directly with friends or your social team.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        category: 'delivery',
        displayOrder: 8,
      },
    ]

    for (const faq of faqs) {
      await payload.create({ collection: 'faq-entries', data: faq as never })
    }
    console.info(`  Created ${faqs.length} FAQ entries.`)
  } else {
    console.info('FAQ entries already exist — skipping.')
  }

  // ── Testimonials ────────────────────────────────────────────────────────────
  const testCount = await payload.count({ collection: 'testimonials' })
  if (testCount.totalDocs === 0) {
    console.info('Seeding testimonials...')
    const testimonials = [
      {
        clientName: 'Alina K.',
        quote:
          'Maria made me feel so comfortable in front of the camera. The photos look like me — but the best version of me.',
        quoteHeadline: 'The best version of me',
        featured: true,
        displayOrder: 1,
        consentVerified: true,
      },
      {
        clientName: 'Sophie R.',
        quote:
          "I finally have brand photos I'm proud to share. Maria understood my vision immediately and delivered beyond my expectations.",
        quoteHeadline: 'Beyond my expectations',
        featured: true,
        displayOrder: 2,
        consentVerified: true,
      },
      {
        clientName: 'Jessica M.',
        quote:
          'I was so nervous but Maria guided me through every pose. My Instagram reach doubled after posting the photos.',
        featured: true,
        displayOrder: 3,
        consentVerified: true,
      },
      {
        clientName: 'Natalie B.',
        quote:
          'Working with Maria was seamless from start to finish. She has an incredible eye and the editing is flawless.',
        displayOrder: 4,
        consentVerified: true,
      },
      {
        clientName: 'Chloe T.',
        quote:
          'The test shoot opened three doors for me within a week. Maria knows exactly how to capture what agencies want to see.',
        displayOrder: 5,
        consentVerified: true,
      },
    ]

    for (const t of testimonials) {
      await payload.create({ collection: 'testimonials', data: t as never })
    }
    console.info(`  Created ${testimonials.length} testimonials.`)
  } else {
    console.info('Testimonials already exist — skipping.')
  }

  // ── Local Landing Pages ─────────────────────────────────────────────────────
  const localCount = await payload.count({ collection: 'local-landing-pages' })
  if (localCount.totalDocs === 0) {
    console.info('Seeding local landing pages...')
    const cities = [
      {
        cityName: 'Manhattan',
        slug: 'manhattan',
        cityState: 'NY',
        headline: 'Fashion & Personal Brand Photographer in Manhattan',
        subhead: 'Serving SoHo, Midtown, Tribeca, and beyond',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Manhattan is the backdrop of your ambition — and I'm here to photograph it. From the cobblestones of SoHo to the waterfront views of Tribeca, every corner of the city becomes a frame for your story.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        cityName: 'Long Island City',
        slug: 'long-island-city',
        cityState: 'NY',
        headline: 'Personal Brand Photographer in Long Island City, Queens',
        subhead: 'Modern backdrops with Manhattan skyline views',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Long Island City offers some of the best light and most photogenic backdrops in the tri-state area — with fewer crowds than Manhattan and stunning skyline views.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        cityName: 'Hoboken',
        slug: 'hoboken',
        cityState: 'NJ',
        headline: 'Portrait & Brand Photographer in Hoboken, NJ',
        subhead: 'Waterfront sessions with iconic NYC views',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Hoboken's tree-lined streets and waterfront promenade create a naturally gorgeous setting — and I love shooting here as much as I love calling New Jersey home.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        cityName: 'Jersey City',
        slug: 'jersey-city',
        cityState: 'NJ',
        headline: 'Personal Brand Photographer in Jersey City, NJ',
        subhead: 'From Newport to The Heights — your city, your story',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Jersey City is growing fast and so are the women building careers here. I love working in this city — the light is incredible and the diverse architecture gives us so many options.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        cityName: 'Princeton',
        slug: 'princeton',
        cityState: 'NJ',
        headline: 'Portrait & Brand Photographer in Princeton, NJ',
        subhead: 'Architectural elegance meets natural beauty',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Princeton's timeless architecture and lush surroundings make it one of my favourite locations for editorial and personal brand photography. Whether you're a business owner, academic, or artist, this city frames your work beautifully.",
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ]

    for (const city of cities) {
      await payload.create({ collection: 'local-landing-pages', data: city as never })
    }
    console.info(`  Created ${cities.length} local landing pages.`)
  } else {
    console.info('Local landing pages already exist — skipping.')
  }

  // ── Site Settings (seed defaults) ──────────────────────────────────────────
  console.info('Seeding SiteSettings defaults...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        brandName: 'Maria Levi',
        tagline: 'Fashion & Personal Brand Photography · NJ/NYC',
        email: 'hello@marialeviphoto.com',
        location: { city: 'New Jersey', region: 'NJ', country: 'US' },
        taxNote: 'Prices listed are before applicable sales tax.',
        travelNote: 'Travel beyond 30 miles from NJ may incur a travel fee.',
      },
    })
    console.info('  SiteSettings updated.')
  } catch (err) {
    console.warn('  Could not update SiteSettings (may already be set):', err)
  }

  console.info('\n✓ Seed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
