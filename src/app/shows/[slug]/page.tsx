import { fetchShowBySlug, fetchAllShows } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ShowDetailClient from "./ShowDetailClient";

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
  const allShows = await fetchAllShows();

  if (!show) {
    notFound();
  }

  return <ShowDetailClient show={show} allShows={allShows} />;
}
