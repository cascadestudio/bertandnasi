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
    <section className="w-full px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 lg:py-24">
      <div className="space-y-6 md:space-y-8">
        {events.map((event) => {
          const { month, days } = formatDateRange(event.dates)
          const mainImageUrl = event.show.mainImage 
            ? getImageUrl(event.show.mainImage, 200)
            : null

          return (
            <div 
              key={event._id} 
              className="grid grid-cols-[auto_1fr] md:grid-cols-[100px_1fr_auto] gap-6 md:gap-12 items-start border-b border-gray-300 pb-6 md:pb-8 last:border-b-0"
            >
              {/* Date */}
              <div className="text-left pt-1">
                <div className="text-xs md:text-sm font-normal uppercase tracking-wide">
                  {month}
                </div>
                <div className="text-3xl md:text-4xl font-light leading-tight">
                  {days}
                </div>
              </div>

              {/* Show Title, Thumbnail, and Venue */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-1 flex flex-col gap-2">
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
                
                {/* Thumbnail */}
                {mainImageUrl && (
                  <div className="relative w-[100px] h-[75px] md:w-[120px] md:h-[90px] flex-shrink-0 overflow-hidden">
                    <Image
                      src={mainImageUrl}
                      alt={event.show.mainImage.alt || event.show.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="col-span-2 md:col-span-1 text-sm md:text-base md:text-right uppercase pt-1">
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

