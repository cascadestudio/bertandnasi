import Link from "next/link";
import { fetchAllCalendarEvents } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";

export default async function CalendarPage() {
  const events = await fetchAllCalendarEvents();

  return (
    <div className="px-4 md:px-8 py-16">
      <Marquee pageName="calendar" />
      <main>
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Calendar</h1>
        {events.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <article
                key={event._id}
                className="border-b border-gray-200 pb-8"
              >
                <h2 className="text-2xl md:text-3xl font-normal uppercase mb-2">
                  <Link
                    href={`/shows/${event.show.slug.current}`}
                    className="hover:text-[var(--color-green)] transition-colors"
                  >
                    {event.show.title}
                  </Link>
                </h2>
                <p className="text-lg mb-2">
                  <strong>{event.venue}</strong> - {event.location}
                </p>
                <p className="mb-4">
                  <strong>Dates:</strong>{" "}
                  {event.dates
                    .map((date) =>
                      new Date(date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    )
                    .join(", ")}
                </p>
                {event.ticketUrl && (
                  <p>
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-green)] hover:opacity-80 transition-opacity"
                    >
                      Get Tickets →
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
