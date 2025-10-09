import Link from 'next/link'
import { fetchAllCalendarEvents } from '@/sanity/lib/queries'

export default async function CalendarPage() {
  const events = await fetchAllCalendarEvents()

  return (
    <div>
      <header>
        <h1>Calendar</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/shows">Shows</Link> | <Link href="/videos">Videos</Link>
        </nav>
      </header>

      <main>
        {events.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {events.map((event) => (
              <article key={event._id}>
                <h2>
                  <Link href={`/shows/${event.show.slug.current}`}>
                    {event.show.title}
                  </Link>
                </h2>
                <p><strong>{event.venue}</strong> - {event.location}</p>
                <p>
                  <strong>Dates:</strong>{' '}
                  {event.dates.map((date) =>
                    new Date(date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  ).join(', ')}
                </p>
                {event.ticketUrl && (
                  <p>
                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
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
  )
}

