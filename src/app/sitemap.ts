import { MetadataRoute } from "next";
import { fetchAllShows } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const shows = await fetchAllShows();

  const showUrls = shows.map((show) => ({
    url: `https://bertandnasi.com/shows/${show.slug.current}`,
    lastModified: new Date(show._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://bertandnasi.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://bertandnasi.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://bertandnasi.com/shows",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://bertandnasi.com/calendar",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://bertandnasi.com/videos",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://bertandnasi.com/legal-notice",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...showUrls,
  ];
}
