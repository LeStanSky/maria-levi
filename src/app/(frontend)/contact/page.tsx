import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import { ContactForm } from './ContactForm.client'

export const revalidate = 60

const getContactData = cache(async () => {
  const payload = await getPayloadClient()
  const [contactPage, services] = await Promise.all([
    payload.findGlobal({ slug: 'contact-page', draft: false }),
    payload.find({
      collection: 'services',
      limit: 50,
      sort: 'displayOrder',
      select: { name: true, nicheKey: true },
      depth: 0,
    }),
  ])
  return { contactPage, services: services.docs }
})

export async function generateMetadata(): Promise<Metadata> {
  const { contactPage } = await getContactData()
  return buildMetadata({
    seo: contactPage.seo,
    fallbackTitle: 'Contact Maria Levi · Fashion Photography Inquiries',
    fallbackDescription:
      'Tell Maria about your project. Response within 1–2 business days from her New Jersey studio.',
    fallbackImage: contactPage.heroImage,
    path: '/contact',
  })
}

const DEFAULT_REFERRAL_OPTIONS = [
  { value: 'google', label: 'Google search' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'referral', label: 'Referred by a friend' },
  { value: 'other', label: 'Other' },
] as const

export default async function ContactPage() {
  const { contactPage, services } = await getContactData()
  if (!contactPage?.headline) notFound()

  const referralOptions =
    contactPage.referralOptions && contactPage.referralOptions.length > 0
      ? contactPage.referralOptions.map((opt) => ({ value: opt.value, label: opt.label }))
      : DEFAULT_REFERRAL_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label }))

  const sessionTypes = services.map((s) => ({ value: s.name, label: s.name }))

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          {contactPage.eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              {contactPage.eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-center">
            {contactPage.headline}
          </Heading>
          {contactPage.intro && (
            <div className="mt-10">
              <RichText data={contactPage.intro} className="prose text-center mx-auto" />
            </div>
          )}
        </Container>
      </Section>

      <Section padding="md" className="border-t border-line">
        <Container size="content">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {contactPage.heroImage ? (
              <div className="relative aspect-[3/4] overflow-hidden lg:sticky lg:top-12 lg:self-start">
                <Image
                  media={contactPage.heroImage}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="hidden lg:block" aria-hidden="true" />
            )}

            <div>
              <ContactForm sessionTypes={sessionTypes} referralOptions={referralOptions} />
              {contactPage.responseTime && (
                <p className="mt-8 font-body uppercase text-xs tracking-[0.18em] text-muted text-center lg:text-left">
                  {contactPage.responseTime}
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </article>
  )
}
