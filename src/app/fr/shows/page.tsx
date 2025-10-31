import { fetchAllShows } from "@/sanity/lib/queries";
import ShowsPageClient from "@/app/shows/ShowsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spectacles",
  description:
    "Explorez notre répertoire de spectacles de performance contemporaine. Théâtre minimaliste qui fusionne performance, danse et théâtre.",
  alternates: {
    canonical: "/fr/shows",
    languages: {
      en: "/shows",
      fr: "/fr/shows",
    },
  },
  openGraph: {
    title: "Spectacles - Bert & Nasi",
    description:
      "Explorez notre répertoire de spectacles de performance contemporaine. Théâtre minimaliste qui fusionne performance, danse et théâtre.",
    url: "https://bertandnasi.com/fr/shows",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spectacles Bert & Nasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectacles - Bert & Nasi",
    description:
      "Explorez notre répertoire de spectacles de performance contemporaine.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function ShowsPageFrench() {
  const shows = await fetchAllShows();

  return <ShowsPageClient shows={shows} />;
}
