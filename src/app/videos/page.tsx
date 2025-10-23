import { fetchAllVideos } from "@/sanity/lib/queries";
import VideosPageClient from "./VideosPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch trailers, short films, and online content from Bert & Nasi. Contemporary performance videos.",
  openGraph: {
    title: "Videos - Bert & Nasi",
    description:
      "Watch trailers, short films, and online content from Bert & Nasi. Contemporary performance videos.",
    url: "https://bertandnasi.com/videos",
    type: "website",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videos - Bert & Nasi",
    description: "Watch our contemporary performance videos.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function VideosPage() {
  const videos = await fetchAllVideos();

  return <VideosPageClient videos={videos} />;
}
