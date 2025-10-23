import { fetchAllShows } from "@/sanity/lib/queries";
import ShowsPageClient from "@/app/shows/ShowsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Explore our repertoire of contemporary performance shows. Minimalist theatre that blends performance, dance, and theatre.",
  openGraph: {
    title: "Shows - Bert & Nasi",
    description:
      "Explore our repertoire of contemporary performance shows. Minimalist theatre that blends performance, dance, and theatre.",
    url: "https://bertandnasi.com/shows",
    type: "website",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi Shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shows - Bert & Nasi",
    description: "Explore our repertoire of contemporary performance shows.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function ShowsPage() {
  const shows = await fetchAllShows();

  return <ShowsPageClient shows={shows} />;
}
