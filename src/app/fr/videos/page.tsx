import { fetchAllVideos } from "@/sanity/lib/queries";
import VideosPageClient from "@/app/videos/VideosPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéos",
  description:
    "Regardez les bandes-annonces, courts-métrages et contenus en ligne de Bert & Nasi. Vidéos de performance contemporaine.",
  alternates: {
    canonical: "/fr/videos",
    languages: {
      en: "/videos",
      fr: "/fr/videos",
    },
  },
  openGraph: {
    title: "Vidéos - Bert & Nasi",
    description:
      "Regardez les bandes-annonces, courts-métrages et contenus en ligne de Bert & Nasi. Vidéos de performance contemporaine.",
    url: "https://bertandnasi.com/fr/videos",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vidéos Bert & Nasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidéos - Bert & Nasi",
    description: "Regardez nos vidéos de performance contemporaine.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function VideosPageFrench() {
  const videos = await fetchAllVideos();

  return <VideosPageClient videos={videos} />;
}
