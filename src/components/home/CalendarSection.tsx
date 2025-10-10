import Link from "next/link";
import Image from "next/image";
import { fetchUpcomingEvents } from "@/sanity/lib/queries";
import { formatDateRange } from "@/lib/dateUtils";
import { getImageUrl } from "@/lib/sanityImage";

export default async function CalendarSection() {
  const events = await fetchUpcomingEvents();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="px-layout space-y-6 md:space-y-8">
        {events.map((event) => {
          const { month, days } = formatDateRange(event.dates);
          const mainImageUrl = event.show.mainImage
            ? getImageUrl(event.show.mainImage, 200)
            : null;

          return (
            <div
              key={event._id}
              className="grid-7 gap-6 border-b border-gray-300 pb-6 md:pb-8 last:border-b-0"
            >
              {/* Date - 1 column */}
              <div className="col-span-7 md:col-span-1 text-left pt-1">
                <div className="text-xs md:text-sm font-normal uppercase tracking-wide">
                  {month}
                </div>
                <div className="text-3xl md:text-4xl font-light leading-tight">
                  {days}
                </div>
              </div>

              {/* Show Title and Venue - 3 columns */}
              <div className="col-span-7 md:col-span-3 flex flex-col gap-2">
                <Link
                  href={`/shows/${event.show.slug.current}`}
                  className="text-xl md:text-2xl lg:text-3xl font-normal hover:text-[var(--color-green)] transition-colors uppercase leading-tight"
                >
                  {event.show.title}
                </Link>
                <div className="text-sm md:text-base">
                  {event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-green)] hover:underline transition-colors uppercase"
                    >
                      {event.venue}
                    </a>
                  ) : (
                    <span className="uppercase">{event.venue}</span>
                  )}
                </div>
              </div>

              {/* Thumbnail - 2 columns */}
              {mainImageUrl && (
                <div className="col-span-7 md:col-span-2 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={mainImageUrl}
                    alt={event.show.mainImage.alt || event.show.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              )}

              {/* Location - 1 column */}
              <div className="col-span-7 md:col-span-1 text-sm md:text-base md:text-right uppercase pt-1">
                {event.location}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
