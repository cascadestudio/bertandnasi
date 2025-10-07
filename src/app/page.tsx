import Link from 'next/link'
import { fetchAllShows } from '../sanity/lib/queries'

export default async function Home() {
  const shows = await fetchAllShows()

  return (
    <div>
      <header>
        <h1>Bertandnasi Theater Company</h1>
        <nav>
          <Link href="/studio">Go to Sanity Studio</Link>
        </nav>
      </header>

      <main>
        <h2>Our Shows:</h2>
        {shows.length === 0 ? (
          <p>No shows found. <Link href="/studio">Create your first show</Link></p>
        ) : (
          <ul>
            {shows.map((show) => (
              <li key={show._id}>
                <h3>{show.title}</h3>
                <p>Year: {show.year}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
