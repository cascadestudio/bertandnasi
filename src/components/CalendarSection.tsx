import Link from 'next/link'
import Image from 'next/image'
import { fetchUpcomingEvents } from '@/sanity/lib/queries'
import { formatDateRange } from '@/lib/dateUtils'
import { getImageUrl } from '@/lib/sanityImage'

export default async function CalendarSection() {
  const events = await fetchUpcomingEvents()

  if (events.length === 0) {
    return null
  }

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="space-y-8">
        {events.map((event) => {
          const { month, days } = formatDateRange(event.dates)
          const mainImageUrl = event.show.mainImage 
            ? getImageUrl(event.show.mainImage, 150)
            : null

          return (
            <div 
              key={event._id} 
              className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_auto_1fr_auto] gap-4 md:gap-8 items-center border-b border-gray-200 pb-8"
            >
              {/* Date */}
              <div className="text-left">
                <div className="text-sm md:text-base font-medium uppercase">
                  {month}
                </div>
                <div className="text-2xl md:text-3xl font-light">
                  {days}
                </div>
              </div>

              {/* Thumbnail - Desktop only */}
              {mainImageUrl && (
                <div className="hidden md:block relative w-[80px] h-[60px] overflow-hidden">
                  <Image
                    src={mainImageUrl}
                    alt={event.show.mainImage.alt || event.show.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )}

              {/* Show Title and Venue */}
              <div className="flex flex-col gap-1">
                <Link 
                  href={`/shows/${event.show.slug.current}`}
                  className="text-xl md:text-2xl font-medium hover:text-[var(--color-green)] transition-colors uppercase"
                >
                  {event.show.title}
                </Link>
                <div className="text-sm md:text-base text-gray-600">
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

              {/* Location */}
              <div className="col-span-2 md:col-span-1 text-sm md:text-base text-gray-600 md:text-right uppercase">
                {event.location}
              </div>

              {/* Additional Images - Mobile */}
              {event.additionalImages && event.additionalImages.length > 0 && (
                <div className="col-span-2 md:hidden flex gap-2 mt-2">
                  {event.additionalImages.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 overflow-hidden">
                      <Image
                        src={getImageUrl(img, 100)}
                        alt={img.alt || `${event.show.title} image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

