import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getImageUrl(source: SanityImageSource, width?: number): string {
  let url = builder.image(source).auto('format').quality(90)
  
  if (width) {
    url = url.width(width)
  }
  
  return url.url()
}

