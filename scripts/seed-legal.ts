/**
 * Seed the three legal pages (Privacy Policy, Terms of Service, Cookie Notice)
 * as editable CMS Pages, rendered by the (frontend)/[slug] route, and wire the
 * footer legalLinks.
 *
 * ⚠️ These are STANDARD TEMPLATES customized to the project — not legal advice.
 *    Have Maria / a lawyer review before public launch.
 *
 * Idempotent: upserts each page by slug; re-running overwrites content.
 * Run: pnpm seed:legal
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const EFFECTIVE = 'May 22, 2026'
const CONTACT = 'hello@marialeviphoto.com'

// ── lexical helpers ──────────────────────────────────────────────────────────
type Node = Record<string, unknown> & { type: string; version: number }
function text(s: string): Node {
  return { type: 'text', text: s, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }
}
function p(s: string): Node {
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
function h(s: string): Node {
  return {
    type: 'heading',
    tag: 'h2',
    children: [text(s)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}
function ul(items: string[]): Node {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map((it, i) => ({
      type: 'listitem',
      value: i + 1,
      children: [text(it)],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}
function root(children: Node[]) {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}
function link(label: string, url: string): Node {
  return {
    type: 'link',
    fields: { linkType: 'custom', url, newTab: false },
    children: [text(label)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}
// paragraph from mixed inline nodes (text + links)
function pm(...children: Node[]): Node {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}
// shared contact line with linked email + contact page
const contactLine = () =>
  pm(
    text('Questions? Email us at '),
    link(CONTACT, `mailto:${CONTACT}`),
    text(' or use the '),
    link('contact page', '/contact'),
    text('.'),
  )

// ── content ──────────────────────────────────────────────────────────────────
const PRIVACY: Node[] = [
  p(`Last updated: ${EFFECTIVE}`),
  p(
    'Maria Levi Photography ("we", "us") operates marialeviphoto.com. This Privacy Policy explains what information we collect, how we use it, and your choices.',
  ),
  h('Information we collect'),
  p('Information you provide directly:'),
  ul([
    'Contact inquiries: your name, email, phone (optional), session type, preferred date, location, budget and message.',
    'Newsletter and lead-magnet sign-ups: your email address.',
  ]),
  p('Information collected automatically when you visit:'),
  ul([
    'Usage and device data via analytics (e.g. pages viewed, approximate location, browser).',
    'Cookies and similar technologies.',
  ]),
  h('Cookies'),
  pm(
    text(
      'We use cookies and similar technologies. For details on what we use and how to manage them, see our ',
    ),
    link('Cookie Notice', '/cookie-notice'),
    text('.'),
  ),
  h('How we use your information'),
  ul([
    'To respond to inquiries and provide photography services.',
    'To send updates or marketing only where you have opted in.',
    'To operate, secure and improve the website.',
  ]),
  h('How we share information'),
  p(
    'We do not sell your personal information. We share it only with service providers who process it on our behalf, including:',
  ),
  ul([
    'Vercel (website hosting) and Neon (database).',
    'Cloudflare R2 (media storage and delivery).',
    'Resend (transactional email) and Flodesk (email marketing).',
    'Google Analytics and Meta (Facebook) Pixel (analytics and advertising).',
    'Sentry (error monitoring) and Pic-Time (client galleries).',
  ]),
  p('Each provider processes data under its own privacy terms.'),
  h('Data retention'),
  p(
    'We keep inquiry information for as long as needed to respond and maintain our records. Delivered client galleries and files are generally retained for approximately one year unless otherwise agreed.',
  ),
  h('Your rights'),
  p(
    `You may request access to, correction of, or deletion of your personal information by contacting us at ${CONTACT}.`,
  ),
  h('Children'),
  p('This website is not directed to children, and we do not knowingly collect their information.'),
  h('Security'),
  p(
    'We use reasonable measures to protect your information, but no method of transmission or storage is completely secure.',
  ),
  h('Changes to this policy'),
  p(
    'We may update this policy from time to time. The "last updated" date above reflects the latest version.',
  ),
  h('Contact'),
  contactLine(),
]

const TERMS: Node[] = [
  p(`Last updated: ${EFFECTIVE}`),
  p(
    'These Terms of Service govern your use of marialeviphoto.com and any photography services provided by Maria Levi Photography. By booking a session or using the site, you agree to these terms.',
  ),
  pm(
    text('Your use of the site is also governed by our '),
    link('Privacy Policy', '/privacy-policy'),
    text(' and '),
    link('Cookie Notice', '/cookie-notice'),
    text('.'),
  ),
  h('Services'),
  p(
    'We provide photography services as described on the Services pages. Specific deliverables, session length and inclusions are those of the package you book.',
  ),
  h('Booking and deposits'),
  p(
    'A non-refundable deposit is required to reserve your session date. The remaining balance is due as agreed before final delivery.',
  ),
  h('Rescheduling and cancellation'),
  ul([
    'A session may be rescheduled once, no later than 3 days before the shoot, subject to availability.',
    'Cancellations and refund terms are confirmed in writing at the time of booking.',
  ]),
  h('Image rights and usage'),
  ul([
    'The photographer retains copyright in all images.',
    'You receive a personal/commercial usage license per your package.',
    'We request your separate permission before using images in our portfolio or marketing.',
  ]),
  h('Client responsibilities'),
  p(
    'You are responsible for obtaining any necessary permissions for locations, people and props featured in your session.',
  ),
  h('Limitation of liability'),
  p(
    'To the fullest extent permitted by law, our liability for any claim relating to the services is limited to the amount you paid for the session.',
  ),
  h('Governing law'),
  p(
    'These terms are governed by the laws of the States of New Jersey and New York, without regard to conflict-of-law rules.',
  ),
  h('Changes to these terms'),
  p(
    'We may update these terms; continued use of the site or services constitutes acceptance of the current version.',
  ),
  h('Contact'),
  contactLine(),
]

const COOKIES: Node[] = [
  p(`Last updated: ${EFFECTIVE}`),
  p(
    'This Cookie Notice explains how marialeviphoto.com uses cookies and similar technologies, and how you can manage them.',
  ),
  pm(
    text('For how we use your personal information more generally, see our '),
    link('Privacy Policy', '/privacy-policy'),
    text('.'),
  ),
  h('What are cookies'),
  p(
    'Cookies are small text files stored on your device that help websites function and remember preferences.',
  ),
  h('Cookies we use'),
  ul([
    'Essential — required for the site to function (security, basic navigation).',
    'Functional — remember choices, such as dismissing the newsletter/offer popup.',
    'Analytics — Google Analytics, to understand how the site is used.',
    'Marketing — Meta (Facebook) Pixel, to measure and improve advertising.',
  ]),
  h('Managing cookies'),
  p(
    'You can control or delete cookies through your browser settings. Blocking some cookies may affect how the site works.',
  ),
  h('Consent'),
  p('By continuing to use the site, you consent to our use of cookies as described here.'),
  h('Changes'),
  p('We may update this notice; the "last updated" date above reflects the latest version.'),
  h('Contact'),
  contactLine(),
]

const PAGES = [
  { slug: 'privacy-policy', title: 'Privacy Policy', headline: 'Privacy Policy', body: PRIVACY },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    headline: 'Terms of Service',
    body: TERMS,
  },
  { slug: 'cookie-notice', title: 'Cookie Notice', headline: 'Cookie Notice', body: COOKIES },
]

async function main() {
  const payload = await getPayload({ config })

  for (const def of PAGES) {
    const data = {
      title: def.title,
      slug: def.slug,
      isHomepage: false,
      _status: 'published',
      pageBuilder: [
        { blockType: 'intro-block', eyebrow: 'Legal', headline: def.headline },
        { blockType: 'rich-text-block', content: root(def.body) },
      ],
    }
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: def.slug } },
      limit: 1,
      depth: 0,
    })
    if (found.docs[0]) {
      await payload.update({ collection: 'pages', id: found.docs[0].id, data: data as never })
      console.info(`  ✓ updated /${def.slug}`)
    } else {
      await payload.create({ collection: 'pages', data: data as never })
      console.info(`  + created /${def.slug}`)
    }
  }

  // Footer legal links
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      legalLinks: [
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Service', url: '/terms-of-service' },
        { label: 'Cookie Notice', url: '/cookie-notice' },
      ],
    } as never,
  })
  console.info('  ✓ footer legalLinks set')

  console.info('\n✓ Legal pages seeded.')
  process.exit(0)
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
