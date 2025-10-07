import { groq } from 'next-sanity'
import { client } from '../../../sanity'

// Show type definition
export interface Show {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description?: any[]
  year: number
  mainImage: {
    asset: {
      _ref: string
      _type: string
    }
    alt: string
  }
  credits?: Array<{
    role: string
    name: string
  }>
  trailer?: string
  collaborators?: Array<{
    name: string
    role: string
  }>
  imageGallery?: Array<{
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
    caption?: string
  }>
  reviews?: Array<{
    quote: string
    media: string
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

// Query to get all shows
export const getAllShows = groq`
  *[_type == "show"] | order(year desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
    seo
  }
`

// Query to get a single show by slug
export const getShowBySlug = groq`
  *[_type == "show" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
    seo
  }
`

// Query to get a single show by ID
export const getShowById = groq`
  *[_type == "show" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
    seo
  }
`

// Data fetching functions
export async function fetchAllShows(): Promise<Show[]> {
  return await client.fetch(getAllShows)
}

export async function fetchShowBySlug(slug: string): Promise<Show> {
  return await client.fetch(getShowBySlug, { slug })
}

export async function fetchShowById(id: string): Promise<Show> {
  return await client.fetch(getShowById, { id })
}
