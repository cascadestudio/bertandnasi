import { fetchAllShows } from "@/sanity/lib/queries";
import ShowsPageClient from "@/app/shows/ShowsPageClient";

export default async function ShowsPage() {
  const shows = await fetchAllShows();

  return <ShowsPageClient shows={shows} />;
}
