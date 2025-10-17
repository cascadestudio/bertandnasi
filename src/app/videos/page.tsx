import { fetchAllVideos } from "@/sanity/lib/queries";
import VideosPageClient from "./VideosPageClient";

export default async function VideosPage() {
  const videos = await fetchAllVideos();

  return <VideosPageClient videos={videos} />;
}
