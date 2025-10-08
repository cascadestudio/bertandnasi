import Link from 'next/link'
import { fetchUpcomingEvents } from '../sanity/lib/queries'

export default async function Home() {
  const upcomingEvents = await fetchUpcomingEvents()

  return (
    <div>
      <header>
        <h1>Bertandnasi Theater Company</h1>
        <nav>
          <Link href="/studio">Go to Sanity Studio</Link>
        </nav>
      </header>

      <main>
        <h2>Upcoming Events:</h2>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events. <Link href="/studio">Create your first event</Link></p>
        ) : (
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event._id}>
                <p>
                  <strong>{event.show.title}</strong> - {event.venue}, {event.location}
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
