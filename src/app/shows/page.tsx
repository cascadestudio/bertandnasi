import Link from "next/link";
import { fetchAllShows } from "@/sanity/lib/queries";

export default async function ShowsPage() {
  const shows = await fetchAllShows();

  return (
    <div className="px-layout py-16">
      <main>
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Our Shows</h1>
        <div className="space-y-8">
          {shows.map((show) => (
            <article key={show._id} className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl md:text-3xl font-normal uppercase mb-2">
                <Link
                  href={`/shows/${show.slug.current}`}
                  className="hover:text-[var(--color-green)] transition-colors"
                >
                  {show.title}
                </Link>
              </h2>
              <p className="text-lg mb-4">{show.year}</p>
              <Link
                href={`/shows/${show.slug.current}`}
                className="text-[var(--color-green)] hover:opacity-80 transition-opacity"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
