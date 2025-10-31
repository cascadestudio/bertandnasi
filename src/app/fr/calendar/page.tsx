import { fetchAllCalendarEvents } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import CalendarAccordion from "@/app/calendar/CalendarAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendrier",
  description:
    "Découvrez où nous nous produisons prochainement. Consultez nos spectacles à venir et réservez des billets pour des performances dans le monde entier.",
  alternates: {
    canonical: "/fr/calendar",
    languages: {
      en: "/calendar",
      fr: "/fr/calendar",
    },
  },
  openGraph: {
    title: "Calendrier - Bert & Nasi",
    description:
      "Découvrez où nous nous produisons prochainement. Consultez nos spectacles à venir et réservez des billets pour des performances dans le monde entier.",
    url: "https://bertandnasi.com/fr/calendar",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calendrier Bert & Nasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendrier - Bert & Nasi",
    description: "Découvrez où nous nous produisons prochainement.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function CalendarPageFrench() {
  const events = await fetchAllCalendarEvents();

  return (
    <div>
      <Marquee pageName="calendar" />
      <main>
        {events.length === 0 ? (
          <p>Aucun événement programmé.</p>
        ) : (
          <CalendarAccordion events={events} />
        )}
      </main>
    </div>
  );
}
