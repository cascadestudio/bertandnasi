import Link from 'next/link'
import { client } from '../../../sanity'
import { groq } from 'next-sanity'

interface Video {
  _id: string
  title: string
  url: string
  category: string
}

async function fetchAllVideos(): Promise<Video[]> {
  return await client.fetch(groq`
    *[_type == "video"] | order(_createdAt desc) {
      _id,
      title,
      url,
      category
    }
  `)
}

export default async function VideosPage() {
  const videos = await fetchAllVideos()

  const categoryLabels: Record<string, string> = {
    'online-content': 'Online Content',
    'trailers': 'Trailers',
    'short-films': 'Short Films',
  }

  return (
    <div>
      <header>
        <h1>Videos</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/shows">Shows</Link> | <Link href="/calendar">Calendar</Link>
        </nav>
      </header>

      <main>
        {videos.length === 0 ? (
          <p>No videos available.</p>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {videos.map((video) => (
              <article key={video._id}>
                <h2>{video.title}</h2>
                <p><strong>Category:</strong> {categoryLabels[video.category] || video.category}</p>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube →
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

