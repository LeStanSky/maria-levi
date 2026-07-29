import { cache } from 'react'
import { MailIcon, MessageIcon, PhoneIcon, SocialIcon } from '@/components/primitives/icons'
import { getPayloadClient, withDbRetry } from '@/lib/payload'

const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()
  return withDbRetry(() => payload.findGlobal({ slug: 'site-settings' }))
})

// Strip everything but digits and a leading + so tel:/sms: hrefs are valid.
function telHref(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

type ItemProps = {
  href: string
  label: string
  caption: string
  external?: boolean
  children: React.ReactNode
}

function MethodLink({ href, label, caption, external, children }: ItemProps) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex flex-col items-center gap-2 text-soft transition-colors hover:text-ink"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
        <span className="h-5 w-5">{children}</span>
      </span>
      <span className="font-body text-[11px] uppercase tracking-[0.18em]">{caption}</span>
    </a>
  )
}

/**
 * Direct-contact icon row for visitors who'd rather call / text / DM than fill
 * the form. Reads phone / email / socials from SiteSettings — renders only the
 * methods Maria has filled in `/admin → Site Settings`.
 */
export async function ContactMethods({ className = '' }: { className?: string }) {
  const settings = await getSiteSettings()
  const phone = settings?.phone?.trim()
  const email = settings?.email?.trim()
  const socials = settings?.socials ?? []

  if (!phone && !email && socials.length === 0) return null

  return (
    <div className={`flex flex-wrap items-start justify-center gap-6 sm:gap-8 ${className}`}>
      {phone && (
        <>
          <MethodLink href={`tel:${telHref(phone)}`} label={`Call ${phone}`} caption="Call">
            <PhoneIcon className="h-full w-full" />
          </MethodLink>
          <MethodLink href={`sms:${telHref(phone)}`} label={`Text ${phone}`} caption="Text">
            <MessageIcon className="h-full w-full" />
          </MethodLink>
        </>
      )}
      {email && (
        <MethodLink href={`mailto:${email}`} label={`Email ${email}`} caption="Email">
          <MailIcon className="h-full w-full" />
        </MethodLink>
      )}
      {socials.map((s) => (
        <MethodLink
          key={s.id ?? s.url}
          href={s.url}
          label={s.label ?? s.platform}
          caption={s.label ?? s.platform}
          external
        >
          <SocialIcon platform={s.platform} className="h-full w-full" />
        </MethodLink>
      ))}
    </div>
  )
}
