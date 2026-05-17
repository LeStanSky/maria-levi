import { Container } from '@/components/primitives/Container'
import { Section } from '@/components/primitives/Section'

function parseEmbed(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (host === 'youtube.com' && u.pathname.startsWith('/embed/')) {
      return url
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.slice(1).split('/')[0]
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`
    }
    if (host === 'player.vimeo.com') {
      return url
    }
    return null
  } catch {
    return null
  }
}

export function BlogVideoEmbed({ url, caption }: { url: string; caption?: string | null }) {
  const embed = parseEmbed(url)
  if (!embed) return null

  return (
    <Section padding="sm">
      <Container size="content">
        <figure>
          <div className="relative aspect-video overflow-hidden bg-bg-subtle">
            <iframe
              src={embed}
              title={caption ?? 'Embedded video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {caption && (
            <figcaption className="mt-4 font-body text-sm text-muted text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      </Container>
    </Section>
  )
}
