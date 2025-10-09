import Link from 'next/link'
import { fetchAllShows } from '@/sanity/lib/queries'

export default async function ShowsPage() {
  const shows = await fetchAllShows()

  return (
    <div>
      <header>
        <h1>Our Shows</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/calendar">Calendar</Link> | <Link href="/videos">Videos</Link>
        </nav>
      </header>

      <main>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {shows.map((show) => (
            <article key={show._id}>
              <h2>
                <Link href={`/shows/${show.slug.current}`}>
                  {show.title}
                </Link>
              </h2>
              <p>{show.year}</p>
              <Link href={`/shows/${show.slug.current}`}>View Details →</Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

