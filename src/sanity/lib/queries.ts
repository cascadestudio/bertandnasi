import { groq } from "next-sanity";
import { client } from "../../../sanity";

// Show type definition
export interface Show {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  description?: unknown[];
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
    quote: string;
    media: string;
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
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
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
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
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
    year,
    mainImage,
    credits,
    trailer,
    collaborators,
    imageGallery,
    reviews,
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

// Marquee type definition
export interface Marquee {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  text: string;
}

// Query to get marquee text (singleton)
export const getMarquee = groq`
  *[_type == "marquee" && _id == "marquee-singleton"][0] {
    _id,
    _createdAt,
    _updatedAt,
    text
  }
`;

// Data fetching function for marquee
export async function fetchMarquee(): Promise<Marquee | null> {
  return await client.fetch(getMarquee);
}

// PageSettings type definition
export interface PageSettings {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  pageName: string;
  marqueeText?: string;
}

// Query to get page settings by page name
export const getPageSettings = groq`
  *[_type == "pageSettings" && pageName == $pageName][0] {
    _id,
    _createdAt,
    _updatedAt,
    pageName,
    marqueeText
  }
`;

// Function to get marquee text for a specific page
export async function fetchMarqueeForPage(
  pageName?: string
): Promise<string | null> {
  if (!pageName) {
    // Fallback to global marquee
    const globalMarquee = await fetchMarquee();
    return globalMarquee?.text || null;
  }

  const pageSettings = await client.fetch(getPageSettings, { pageName });

  if (pageSettings?.marqueeText) {
    return pageSettings.marqueeText;
  }

  // Fallback to global marquee
  const globalMarquee = await fetchMarquee();
  return globalMarquee?.text || null;
}
