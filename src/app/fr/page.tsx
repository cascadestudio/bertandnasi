import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/home/Marquee";
import AboutSection from "@/components/home/AboutSection";
import CalendarSection from "@/components/home/CalendarSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import { fetchFeaturedReviews } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bert&Nasi - Duo d'artistes-performeurs",
  description:
    "Bertand et Nasi sont un duo d'artistes-performeurs créant des spectacles minimalistes qui fusionnent performance, danse et théâtre.",
  keywords: [
    "performance contemporaine",
    "art de la performance",
    "théâtre",
    "danse",
    "Bertand et Nasi",
    "spectacle vivant",
    "théâtre minimaliste",
  ],
  authors: [{ name: "Bert&Nasi" }],
  creator: "Bert&Nasi",
  publisher: "Bert&Nasi",
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
  openGraph: {
    title: "Bert&Nasi - Duo d'artistes-performeurs",
    description:
      "Bertand et Nasi sont un duo d'artistes-performeurs créant des spectacles minimalistes qui fusionnent performance, danse et théâtre.",
    url: "https://bertandnasi.com/fr",
    siteName: "Bert&Nasi",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi - Duo d'artistes-performeurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bert&Nasi - Duo d'artistes-performeurs",
    description:
      "Bertand et Nasi sont un duo d'artistes-performeurs créant des spectacles minimalistes qui fusionnent performance, danse et théâtre.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function HomeFrench() {
  const reviews = await fetchFeaturedReviews();

  return (
    <main>
      <HeroSection />
      <Marquee pageName="home" sticky={false} />
      <AboutSection />
      <CalendarSection />
      <ReviewsSection reviews={reviews} />
    </main>
  );
}
