import { fetchShowBySlug, fetchAllShows } from '@/sanity/lib/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const shows = await fetchAllShows()
  return shows.map((show) => ({
    slug: show.slug.current,
  }))
}

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const show = await fetchShowBySlug(slug)

  if (!show) {
    notFound()
  }

  return (
    <div>
      <header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/shows">← Back to Shows</Link>
        </nav>
      </header>

      <main>
        <h1>{show.title}</h1>
        <p><strong>Year:</strong> {show.year}</p>

        {show.credits && show.credits.length > 0 && (
          <section>
            <h2>Credits</h2>
            <ul>
              {show.credits.map((credit, index) => (
                <li key={index}>
                  {credit.role} → {credit.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {show.trailer && (
          <section>
            <h2>Trailer</h2>
            <a href={show.trailer} target="_blank" rel="noopener noreferrer">
              Watch Trailer
            </a>
          </section>
        )}

        {show.reviews && show.reviews.length > 0 && (
          <section>
            <h2>Reviews</h2>
            {show.reviews.map((review, index) => (
              <blockquote key={index}>
                <p>&ldquo;{review.quote}&rdquo;</p>
                <cite>— {review.media}</cite>
              </blockquote>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

