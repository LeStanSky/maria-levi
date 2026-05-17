/**
 * Seed script — populates LocalLandingPages with 5 NYC-metro city entries.
 * Run: pnpm seed:cities
 * Safe to re-run: skips cities that already exist (matched by slug).
 *
 * Placeholder copy follows the editorial + city + industry keyword strategy
 * (v9 memory §14). NJ cities lean into the white-space angle. Maria edits
 * final copy + uploads heroImage + curates featuredSeries via /admin.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type LexicalNode = Record<string, unknown> & { type: string; version: number }
type LexicalRoot = { root: LexicalNode }

function text(s: string): LexicalNode {
  return {
    type: 'text',
    text: s,
    format: 0,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  }
}

function paragraph(s: string): LexicalNode {
  return {
    type: 'paragraph',
    children: [text(s)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function lexicalRoot(paragraphs: string[]): LexicalRoot {
  return {
    root: {
      type: 'root',
      children: paragraphs.map(paragraph),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

type CitySeed = {
  cityName: string
  slug: string
  cityState: 'NY' | 'NJ'
  headline: string
  subhead: string
  introParagraphs: string[]
  popularLocations: Array<{ name: string; address?: string; description?: string }>
  nearbyAreas: Array<{ name: string; link: string }>
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
}

const CITIES: CitySeed[] = [
  {
    cityName: 'Manhattan',
    slug: 'manhattan',
    cityState: 'NY',
    headline: 'Editorial Personal Brand Photographer in Manhattan',
    subhead: 'Considered, magazine-quality imagery for founders, creatives, and brands across NYC.',
    introParagraphs: [
      'Manhattan is a city of distinct registers — the polished restraint of the Upper East Side, the textured density of SoHo and the Lower East Side, the architectural rhythm of Midtown. Personal brand work here lives or dies on how well the photographs read those registers, then translate them into something that still feels like you.',
      'My approach is editorial: planned compositions, attention to light, and direction that lets you stop performing for the camera. Sessions are calibrated for entrepreneurs, coaches, psychotherapists, and small creative studios who need a body of work that holds up beyond a single headshot — imagery that supplies a website, a press kit, and twelve months of social.',
      'Shoots run on a real schedule, with location scouting done in advance and a styling conversation before we begin. Files are delivered through a private gallery, with print and licensing options when the work needs to travel further than a feed.',
    ],
    popularLocations: [
      {
        name: 'West Village brownstone streets',
        address: 'Bank St / Bedford St corridor',
        description:
          'Narrow streets, low buildings, soft afternoon light. Strong for portrait and lifestyle hybrid sessions.',
      },
      {
        name: 'DUMBO waterfront (Manhattan-facing)',
        address: 'Brooklyn Bridge Park, north end',
        description:
          'Skyline as backdrop. Best 90 minutes before sunset; reservations on weekends.',
      },
      {
        name: 'SoHo cast-iron blocks',
        address: 'Greene St & Mercer St',
        description: 'Editorial fashion-friendly backdrops. Quiet on weekday mornings.',
      },
      {
        name: 'Rooftop studios — Lower East Side / Chinatown',
        address: 'Bookable via Peerspace',
        description:
          'Bookable indoor + open-air combinations. Backup for unpredictable weather days.',
      },
    ],
    nearbyAreas: [
      { name: 'Long Island City', link: '/photographer-in/long-island-city' },
      { name: 'Hoboken', link: '/photographer-in/hoboken' },
      { name: 'Jersey City', link: '/photographer-in/jersey-city' },
    ],
    seo: {
      metaTitle: 'Editorial Personal Brand Photographer Manhattan · Maria Levi',
      metaDescription:
        'Editorial personal brand and portrait photography in Manhattan for founders, coaches, and small studios. Magazine-quality imagery, planned sessions, transparent pricing.',
      keywords:
        'manhattan personal brand photographer, editorial portrait photographer manhattan, nyc branding photography',
    },
  },
  {
    cityName: 'Long Island City',
    slug: 'long-island-city',
    cityState: 'NY',
    headline: 'Branding Photographer in Long Island City',
    subhead:
      'Editorial imagery against LIC architecture — waterfront light, industrial textures, gallery interiors.',
    introParagraphs: [
      'Long Island City reads differently from Manhattan in photographs. The skyline sits across the river instead of overhead. Studios and lofts open up into long, even daylight. Industrial textures — converted warehouses, gallery spaces, the steel of the Pulaski and Queensboro — make a backdrop that is contemporary without being slick.',
      'I shoot personal brand and portrait sessions across LIC for founders, agency leads, and creative professionals who want imagery that looks current and considered. The neighborhood works particularly well for clients building visual identities around craft, architecture, or product — environments here feel intentional in a way that supports a confident, modern brand voice.',
      'Sessions can be a single block of time at one location or a half-day arc across the riverfront, Court Square, and a studio interior. Wardrobe direction and a shot list are agreed before the shoot day; final imagery is delivered through a private online gallery.',
    ],
    popularLocations: [
      {
        name: 'Gantry Plaza State Park',
        address: '4-09 47th Rd, Queens, NY',
        description:
          'Iconic Pepsi-Cola sign and Manhattan skyline. Early morning is best for warm side-light.',
      },
      {
        name: 'Hunters Point South Park',
        address: 'Center Blvd, Queens, NY',
        description: 'Open promenade and clean modern landscape architecture.',
      },
      {
        name: 'MoMA PS1 plaza & surroundings',
        address: '22-25 Jackson Ave, Queens, NY',
        description: 'Brick and concrete textures, art-context credibility for creative clients.',
      },
      {
        name: 'Vernon Blvd shopfronts',
        address: 'Vernon Blvd between 46th & 50th Ave',
        description:
          'Cafés, bookshops, restaurant exteriors for lifestyle-tilted personal brand shoots.',
      },
    ],
    nearbyAreas: [
      { name: 'Manhattan', link: '/photographer-in/manhattan' },
      { name: 'Hoboken', link: '/photographer-in/hoboken' },
      { name: 'Jersey City', link: '/photographer-in/jersey-city' },
    ],
    seo: {
      metaTitle: 'Long Island City Branding Photographer · Maria Levi',
      metaDescription:
        'Editorial brand photography in Long Island City — waterfront light, industrial textures, gallery interiors. For founders, agencies, and creatives.',
      keywords:
        'long island city branding photographer, lic personal brand photographer, queens editorial photographer',
    },
  },
  {
    cityName: 'Hoboken',
    slug: 'hoboken',
    cityState: 'NJ',
    headline: 'Editorial Portrait Photographer in Hoboken',
    subhead:
      'Personal brand and portrait sessions in Hoboken — waterfront, brownstone streets, river-front light.',
    introParagraphs: [
      'Hoboken is the closest piece of the NYC metro to me, and it is where many of my New-Jersey-based clients prefer to start. The city is compact and walkable, with a clear visual identity: brownstone facades, the long open arc of the waterfront with Midtown across the river, the Italianate detailing along Washington Street.',
      'For personal brand and portrait work, Hoboken offers something that Manhattan rarely gives — a session that does not feel rushed. Streets are calm enough on weekday mornings to shoot directly on them. The waterfront delivers a recognizable NYC backdrop without paying the cost in time and traffic of a Manhattan session.',
      'I work in Hoboken regularly with psychotherapists, coaches, and independent professionals building first or second visual identities. The aesthetic I bring is editorial — planned, considered, calm — and the city supports it well. Sessions can stay entirely within Hoboken or extend to neighboring Jersey City or across the river.',
    ],
    popularLocations: [
      {
        name: 'Pier A Park',
        address: 'Sinatra Dr, Hoboken, NJ',
        description: 'Open lawns, river-facing benches, Manhattan skyline as backdrop.',
      },
      {
        name: 'Washington Street brownstones',
        address: 'Washington St, between 4th and 11th',
        description:
          'Continuous walls of detailed Italianate frontages. Soft west-side light in late afternoon.',
      },
      {
        name: 'Hoboken Terminal interior',
        address: '1 Hudson Pl, Hoboken, NJ',
        description:
          'Historic ferry/train terminal with Tiffany skylights — strong for editorial portrait moods.',
      },
      {
        name: 'Stevens Park benches & uptown waterfront',
        address: '4th & Hudson, Hoboken, NJ',
        description: 'Quiet alternative to Pier A. Less foot traffic, same skyline.',
      },
    ],
    nearbyAreas: [
      { name: 'Jersey City', link: '/photographer-in/jersey-city' },
      { name: 'Manhattan', link: '/photographer-in/manhattan' },
      { name: 'Long Island City', link: '/photographer-in/long-island-city' },
    ],
    seo: {
      metaTitle: 'Hoboken Editorial Portrait Photographer · Maria Levi',
      metaDescription:
        'Editorial portrait and personal brand photography in Hoboken, NJ. For therapists, coaches, and independent professionals building a first or refreshed visual identity.',
      keywords:
        'hoboken editorial portrait photographer, hoboken personal brand photographer, nj branding photographer',
    },
  },
  {
    cityName: 'Jersey City',
    slug: 'jersey-city',
    cityState: 'NJ',
    headline: 'Editorial Brand Photographer in Jersey City',
    subhead:
      'Brand and portrait work in Jersey City — Newport waterfront, Powerhouse Arts District, downtown brownstones.',
    introParagraphs: [
      'Jersey City has changed quickly. The Powerhouse Arts District, the downtown brownstone blocks, the Newport waterfront and the steady build-out around Grove and Exchange — all of it gives a personal brand photographer more material to work with than the city had ten years ago. Visually it pairs an older industrial brick palette with newer modern interiors and the Lower Manhattan skyline directly across.',
      'I shoot personal brand and editorial portrait sessions for entrepreneurs, creative agencies, and content creators based in or moving into Jersey City. The aesthetic stays consistent across the metro — planned, editorial, considered — but the location material here is genuinely distinct from Manhattan or Hoboken, which makes the imagery itself read distinct.',
      'For clients building a brand around hospitality, design, or services, downtown JC is a strong base. For more polished corporate or financial sectors, the Newport / Exchange Place side reads cleaner. Sessions usually combine two location types in a single half-day to give a brand a wider visual range.',
    ],
    popularLocations: [
      {
        name: 'Exchange Place waterfront',
        address: 'Exchange Pl, Jersey City, NJ',
        description:
          'Direct view of Lower Manhattan. Best at golden hour; mornings work for low-traffic shoots.',
      },
      {
        name: 'Powerhouse Arts District',
        address: 'Bay St & Provost St area',
        description:
          'Converted industrial brick + modern interiors. Strong for editorial creative-sector branding.',
      },
      {
        name: 'Newport waterfront walk',
        address: 'Town Square Pl, Jersey City, NJ',
        description: 'Clean modern landscape, lawn areas, polished corporate-friendly backdrops.',
      },
      {
        name: 'Hamilton Park & surrounding brownstones',
        address: 'Jersey Ave at 8th St',
        description: 'Quiet residential park ringed by brownstones — calm, story-driven imagery.',
      },
    ],
    nearbyAreas: [
      { name: 'Hoboken', link: '/photographer-in/hoboken' },
      { name: 'Manhattan', link: '/photographer-in/manhattan' },
      { name: 'Long Island City', link: '/photographer-in/long-island-city' },
      { name: 'Princeton', link: '/photographer-in/princeton' },
    ],
    seo: {
      metaTitle: 'Jersey City Editorial Brand Photographer · Maria Levi',
      metaDescription:
        'Editorial personal brand and portrait photography in Jersey City — Newport waterfront, Powerhouse Arts District, downtown brownstones. For entrepreneurs and creative agencies.',
      keywords:
        'jersey city editorial brand photographer, jersey city personal brand photographer, nj brand photographer for entrepreneurs',
    },
  },
  {
    cityName: 'Princeton',
    slug: 'princeton',
    cityState: 'NJ',
    headline: 'Personal Brand Photographer in Princeton',
    subhead:
      'Editorial portrait and brand sessions for Princeton-area founders, academics, and independent professionals.',
    introParagraphs: [
      'Princeton has a visual register of its own — Gothic stonework on campus, the long lines of Nassau Street, a quieter, more deliberate light than the metro further north. Personal brand work here suits clients whose work is built on credibility and depth: academics, consultants, writers, founders of professional-services firms.',
      'I travel regularly to Princeton from the broader NYC metro for editorial portrait and personal brand sessions. The pace of a Princeton shoot is different from a Manhattan one — fewer location moves, more time per setup, more attention to the texture of a single environment. The imagery tends to come back warmer, slower, and more grounded.',
      'Sessions can take place on or near campus, along Nassau Street, in offices and consultancy interiors, or in private homes. As with all my work, the visual approach is planned in advance — wardrobe, light, sequence — so the shoot day is calm and the final body of work is consistent.',
    ],
    popularLocations: [
      {
        name: 'Princeton University campus',
        address: 'Nassau St, Princeton, NJ',
        description:
          'Gothic stone, archways, courtyards. Strongest for academics and consultants; weekday mornings recommended.',
      },
      {
        name: 'Nassau Street shopfronts',
        address: 'Nassau St between Witherspoon & Vandeventer',
        description: 'Independent storefronts, classic detailing, soft natural light.',
      },
      {
        name: 'Palmer Square',
        address: 'Palmer Sq W, Princeton, NJ',
        description: 'Open public square with strong architectural rhythm.',
      },
      {
        name: 'Private home / studio sessions',
        address: 'Greater Princeton area',
        description:
          'For consultants and independent practitioners who prefer to shoot in their own working environment.',
      },
    ],
    nearbyAreas: [
      { name: 'Jersey City', link: '/photographer-in/jersey-city' },
      { name: 'Hoboken', link: '/photographer-in/hoboken' },
      { name: 'Manhattan', link: '/photographer-in/manhattan' },
    ],
    seo: {
      metaTitle: 'Princeton Personal Brand Photographer · Maria Levi',
      metaDescription:
        'Editorial portrait and personal brand photography in Princeton, NJ for academics, consultants, writers, and founders of professional-services firms.',
      keywords:
        'princeton personal brand photographer, princeton editorial portrait photographer, nj academic portrait photographer',
    },
  },
]

async function main() {
  const payload = await getPayload({ config })

  // Pull existing services so we can link localServices by slug if available.
  const services = await payload.find({
    collection: 'services',
    limit: 50,
    depth: 0,
    select: { slug: true },
  })
  const serviceIdsBySlug = new Map<string, number>()
  for (const s of services.docs) {
    if (s.slug) serviceIdsBySlug.set(s.slug, s.id)
  }

  // Sensible defaults: every city offers Personal Brand + Portrait + Commercial.
  // Maria can prune in /admin per city.
  const defaultServiceSlugs = ['personal-brand', 'portrait', 'commercial']
  const defaultLocalServices = defaultServiceSlugs
    .map((slug) => serviceIdsBySlug.get(slug))
    .filter((id): id is number => typeof id === 'number')

  for (const city of CITIES) {
    const existing = await payload.find({
      collection: 'local-landing-pages',
      where: { slug: { equals: city.slug } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      console.info(`  City "${city.slug}" already exists — skipping.`)
      continue
    }

    const created = await payload.create({
      collection: 'local-landing-pages',
      data: {
        cityName: city.cityName,
        slug: city.slug,
        cityState: city.cityState,
        headline: city.headline,
        subhead: city.subhead,
        intro: lexicalRoot(city.introParagraphs),
        popularLocations: city.popularLocations,
        nearbyAreas: city.nearbyAreas,
        localServices: defaultLocalServices.length > 0 ? defaultLocalServices : undefined,
        seo: city.seo,
        _status: 'published',
      } as never,
    })
    console.info(`  Created city page "${city.cityName}" (id=${created.id}, slug=${city.slug}).`)
  }

  console.info('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
