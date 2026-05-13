'use client'

import NextImage from 'next/image'
import { Lightbox, type LightboxPhoto } from './Lightbox.client'

type Props = {
  photos: LightboxPhoto[]
}

export function SeriesPhotoGrid({ photos }: Props) {
  if (photos.length === 0) return null

  return (
    <Lightbox
      photos={photos}
      renderTrigger={(open) => (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[3/4] overflow-hidden bg-bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
              aria-label={`Open photo ${i + 1}: ${photo.alt}`}
            >
              <NextImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}
    />
  )
}
