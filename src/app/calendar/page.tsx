import { fetchAllCalendarEvents } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import CalendarAccordion from "./CalendarAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "See where we're performing next. View our upcoming shows and book tickets for performances worldwide.",
  openGraph: {
    title: "Calendar - Bert & Nasi",
    description:
      "See where we're performing next. View our upcoming shows and book tickets for performances worldwide.",
    url: "https://bertandnasi.com/calendar",
    type: "website",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi Calendar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar - Bert & Nasi",
    description: "See where we're performing next.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function CalendarPage() {
  const events = await fetchAllCalendarEvents();

  return (
    <div>
      <Marquee pageName="calendar" />
      <main>
        {events.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          <CalendarAccordion events={events} />
        )}
      </main>
    </div>
  );
}
