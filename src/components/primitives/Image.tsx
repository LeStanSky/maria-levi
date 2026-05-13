import NextImage from 'next/image'
import { isMedia, type MediaLike } from '@/lib/media'

type CommonProps = {
  media: MediaLike
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}

type FixedProps = CommonProps & {
  fill?: false
  width?: number
  height?: number
}

type FillProps = CommonProps & {
  fill: true
}

export function Image(props: FixedProps | FillProps) {
  const { media, alt, className, sizes, priority } = props
  if (!isMedia(media) || !media.url) return null

  if ('fill' in props && props.fill) {
    return (
      <NextImage
        src={media.url}
        alt={alt ?? media.alt ?? ''}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    )
  }

  const fixed = props as FixedProps
  return (
    <NextImage
      src={media.url}
      alt={alt ?? media.alt ?? ''}
      width={fixed.width ?? media.width ?? 1600}
      height={fixed.height ?? media.height ?? 1200}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}
