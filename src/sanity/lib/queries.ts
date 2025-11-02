import { groq } from "next-sanity";
import { client } from "../../../sanity";
import { TypedObject } from "sanity";

// Show type definition
export interface Show {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  description?: TypedObject[];
  descriptionFr?: TypedObject[];
  year: number;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  };
  credits?: Array<{
    role: string;
    roleFr?: string;
    name: string;
  }>;
  trailer?: string;
  collaborators?: Array<{
    name: string;
    role: string;
  }>;
  imageGallery?: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  }>;
  reviews?: Array<{
    _id: string;
    quote: string;
    quoteFr?: string;
    media: string;
    link?: string;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
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
    descriptionFr,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    "reviews": reviews[]-> {
      _id,
      quote,
      quoteFr,
      media,
      link
    },
    seo
  }
`;

// Query to get a single show by slug
export const getShowBySlug = groq`
  *[_type == "show" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    descriptionFr,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    "reviews": reviews[]-> {
      _id,
      quote,
      quoteFr,
      media,
      link
    },
    seo
  }
`;

// Query to get a single show by ID
export const getShowById = groq`
  *[_type == "show" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    descriptionFr,
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    "reviews": reviews[]-> {
      _id,
      quote,
      quoteFr,
      media,
      link
    },
    seo
  }
`;

// Calendar Event type definition
export interface CalendarEvent {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  show: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    mainImage: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
  };
  dates: string[];
  venue: string;
  location: string;
  ticketUrl?: string;
  additionalImages?: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
}

// Query to get next 6 upcoming events
export const getUpcomingEvents = groq`
  *[_type == "calendar" && dates[0] >= now()] | order(dates[0] asc) [0...6] {
    _id,
    _createdAt,
    _updatedAt,
    show-> {
      _id,
      title,
      slug,
      mainImage
    },
    dates,
    venue,
    location,
    ticketUrl,
    additionalImages
  }
`;

// Query to get all calendar events
export const getAllCalendarEvents = groq`
  *[_type == "calendar"] | order(dates[0] desc) {
    _id,
    _createdAt,
    _updatedAt,
    show-> {
      _id,
      title,
      slug,
      mainImage
    },
    dates,
    venue,
    location,
    ticketUrl,
    additionalImages
  }
`;

// Data fetching functions with error handling and caching
export async function fetchAllShows(): Promise<Show[]> {
  try {
    return await client.fetch(
      getAllShows,
      {},
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
}

export async function fetchShowBySlug(slug: string): Promise<Show> {
  try {
    return await client.fetch(
      getShowBySlug,
      { slug },
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching show by slug:", error);
    throw error;
  }
}

export async function fetchShowById(id: string): Promise<Show> {
  try {
    return await client.fetch(
      getShowById,
      { id },
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching show by id:", error);
    throw error;
  }
}

export async function fetchUpcomingEvents(): Promise<CalendarEvent[]> {
  try {
    return await client.fetch(
      getUpcomingEvents,
      {},
      {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

export async function fetchAllCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    return await client.fetch(
      getAllCalendarEvents,
      {},
      {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );
  } catch (error) {
    console.error("Error fetching all calendar events:", error);
    return [];
  }
}

// Video type definition
export interface Video {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  titleFr?: string;
  url: string;
  category: string;
  relatedShow?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
}

// Query to get all videos
export const getAllVideos = groq`
  *[_type == "video"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    titleFr,
    url,
    category,
    relatedShow-> {
      _id,
      title,
      slug
    }
  }
`;

// Query to get trailer for a specific show
export const getTrailerForShow = groq`
  *[_type == "video" && category == "trailers" && relatedShow._ref == $showId][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    titleFr,
    url,
    category
  }
`;

// Data fetching function for videos
export async function fetchAllVideos(): Promise<Video[]> {
  try {
    return await client.fetch(
      getAllVideos,
      {},
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// Data fetching function for trailer by show ID
export async function fetchTrailerForShow(
  showId: string
): Promise<Video | null> {
  try {
    return await client.fetch(
      getTrailerForShow,
      { showId },
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching trailer for show:", error);
    return null;
  }
}

// Review type definition
export interface Review {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  quote: string;
  quoteFr?: string;
  media: string;
  link?: string;
  featured: boolean;
}

// PageSettings type definition
export interface PageSettings {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  pageName: string;
  marqueeText?: string;
  marqueeTextFr?: string;
}

// Query to get page settings by page name
export const getPageSettings = groq`
  *[_type == "pageSettings" && pageName == $pageName][0] {
    _id,
    _createdAt,
    _updatedAt,
    pageName,
    marqueeText,
    marqueeTextFr
  }
`;

// Function to get marquee text for a specific page
export async function fetchMarqueeForPage(
  pageName?: string,
  locale: "en" | "fr" = "en"
): Promise<string | null> {
  const DEFAULT_MARQUEE_TEXT_EN = "The contemporary performance duo";
  const DEFAULT_MARQUEE_TEXT_FR = "Le duo d'artistes-performeurs";

  const DEFAULT_MARQUEE_TEXT =
    locale === "fr" ? DEFAULT_MARQUEE_TEXT_FR : DEFAULT_MARQUEE_TEXT_EN;

  if (!pageName) {
    return DEFAULT_MARQUEE_TEXT;
  }

  const pageSettings = await client.fetch(getPageSettings, { pageName });

  if (locale === "fr" && pageSettings?.marqueeTextFr) {
    return pageSettings.marqueeTextFr;
  }

  return pageSettings?.marqueeText || DEFAULT_MARQUEE_TEXT;
}

// Query to get featured reviews for homepage
export const getFeaturedReviews = groq`
  *[_type == "review" && featured == true] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    quote,
    quoteFr,
    media,
    link,
    featured
  }
`;

// Query to get all reviews
export const getAllReviews = groq`
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    quote,
    quoteFr,
    media,
    link,
    featured
  }
`;

// Data fetching function for featured reviews
export async function fetchFeaturedReviews(): Promise<Review[]> {
  try {
    return await client.fetch(
      getFeaturedReviews,
      {},
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    return [];
  }
}

// Data fetching function for all reviews
export async function fetchAllReviews(): Promise<Review[]> {
  try {
    return await client.fetch(
      getAllReviews,
      {},
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
}
