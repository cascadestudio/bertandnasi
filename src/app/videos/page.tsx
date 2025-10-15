import { client } from "../../../sanity";
import { groq } from "next-sanity";
import Marquee from "@/components/home/Marquee";

interface Video {
  _id: string;
  title: string;
  url: string;
  category: string;
}

async function fetchAllVideos(): Promise<Video[]> {
  return await client.fetch(groq`
    *[_type == "video"] | order(_createdAt desc) {
      _id,
      title,
      url,
      category
    }
  `);
}

export default async function VideosPage() {
  const videos = await fetchAllVideos();

  const categoryLabels: Record<string, string> = {
    "online-content": "Online Content",
    trailers: "Trailers",
    "short-films": "Short Films",
  };

  return (
    <div>
      <Marquee pageName="videos" />
      <div className="px-4 md:px-8 py-16">
        <main>
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Videos</h1>
          {videos.length === 0 ? (
            <p>No videos available.</p>
          ) : (
            <div className="space-y-8">
              {videos.map((video) => (
                <article
                  key={video._id}
                  className="border-b border-gray-200 pb-8"
                >
                  <h2 className="text-2xl md:text-3xl font-normal uppercase mb-2">
                    {video.title}
                  </h2>
                  <p className="mb-4">
                    <strong>Category:</strong>{" "}
                    {categoryLabels[video.category] || video.category}
                  </p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-green)] hover:opacity-80 transition-opacity"
                  >
                    Watch on YouTube →
                  </a>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
