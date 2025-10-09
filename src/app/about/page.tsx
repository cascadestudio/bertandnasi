import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      <header>
        <h1>About Us</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/shows">Shows</Link> | <Link href="/calendar">Calendar</Link>
        </nav>
      </header>

      <main>
        <p>Information about Bertandnasi Theater Company.</p>
        {/* Add your content here */}
      </main>
    </div>
  )
}

