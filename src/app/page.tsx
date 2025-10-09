import Link from 'next/link'
import { fetchUpcomingEvents } from '../sanity/lib/queries'

export default async function Home() {
  const upcomingEvents = await fetchUpcomingEvents()

  return (
    <div>
      <header>
        <h1>Bertandnasi Theater Company</h1>
        <nav>
          <Link href="/shows">Shows</Link> | 
          <Link href="/calendar">Calendar</Link> | 
          <Link href="/videos">Videos</Link> | 
          <Link href="/about">About</Link> | 
        </nav>
      </header>

      <main>
        <h2>Upcoming Events:</h2>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event._id}>
                <p>
                  <strong>
                    <Link href={`/shows/${event.show.slug.current}`}>
                      {event.show.title}
                    </Link>
                  </strong> - {event.venue}, {event.location}
                </p>
                <p>
                  Dates: {event.dates.map((date) => 
                    new Date(date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  ).join(', ')}
                </p>
                {event.ticketUrl && (
                  <p><a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">Get Tickets</a></p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
