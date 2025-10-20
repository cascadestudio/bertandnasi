import {
  fetchShowBySlug,
  fetchAllShows,
  fetchTrailerForShow,
} from "@/sanity/lib/queries";
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

  // Fetch trailer from videos collection
  const trailer = await fetchTrailerForShow(show._id);

  return <ShowDetailClient show={show} allShows={allShows} trailer={trailer} />;
}
