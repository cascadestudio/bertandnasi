import { fetchShowBySlug, fetchAllShows } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const shows = await fetchAllShows();
  return shows.map((show) => ({
    slug: show.slug.current,
  }));
}

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await fetchShowBySlug(slug);

  if (!show) {
    notFound();
  }

  return (
    <div className="px-layout py-16">
      <nav className="mb-8">
        <Link
          href="/shows"
          className="text-[var(--color-green)] hover:opacity-80 transition-opacity"
        >
          ← Back to Shows
        </Link>
      </nav>

      <main>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4">
          {show.title}
        </h1>
        <p className="text-xl mb-12">
          <strong>Year:</strong> {show.year}
        </p>

        {show.credits && show.credits.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Credits</h2>
            <ul className="space-y-2">
              {show.credits.map((credit, index) => (
                <li key={index} className="text-lg">
                  <strong>{credit.role}:</strong> {credit.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {show.trailer && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Trailer</h2>
            <a
              href={show.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-green)] hover:opacity-80 transition-opacity text-lg"
            >
              Watch Trailer →
            </a>
          </section>
        )}

        {show.reviews && show.reviews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Reviews</h2>
            <div className="space-y-8">
              {show.reviews.map((review, index) => (
                <blockquote
                  key={index}
                  className="border-l-4 border-[var(--color-green)] pl-6"
                >
                  <p className="text-lg italic mb-2">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <cite className="text-base not-italic">— {review.media}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
