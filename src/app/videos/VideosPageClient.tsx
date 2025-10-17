"use client";

import { useState } from "react";
import { Video } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";

interface VideosPageClientProps {
  videos: Video[];
}

export default function VideosPageClient({ videos }: VideosPageClientProps) {
  const [hoveredVideo, setHoveredVideo] = useState<Video | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const categoryLabels: Record<string, string> = {
    "online-content": "Online Content",
    trailers: "Trailers",
    "short-films": "Short Films",
  };

  return (
    <div>
      <Marquee pageName="videos" />
      <div className="hidden lg:grid lg:grid-cols-7 mr-8 gap-5 min-h-[calc(100vh-200px)]">
        <div className="col-span-4 flex flex-col pt-8 border-r-4 border-[var(--color-green)] h-full">
          <div className="flex-1 pb-5">
            {videos.map((video, index) => (
              <div key={video._id} className={index > 0 ? "pt-5" : ""}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredVideo(video)}
                  className="block px-8 py-12 group border-t-4 border-[var(--color-green)]"
                >
                  <h2
                    className={`font-bold uppercase ${
                      hoveredVideo?._id === video._id
                        ? "show-title-hover"
                        : "show-title"
                    }`}
                    style={{
                      fontSize: "84px",
                      lineHeight: "82px",
                    }}
                  >
                    {video.title}
                  </h2>
                </a>
                {index === videos.length - 1 && (
                  <div className="border-b-4 border-[var(--color-green)]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`col-span-3 sticky top-12 self-start max-h-[calc(100vh-4rem)] overflow-auto -ml-5 pl-5 -mr-8 pr-8 pt-5 ${hoveredVideo ? "border-b-4 border-[var(--color-green)]" : ""}`}
          onMouseEnter={() => hoveredVideo && setHoveredVideo(hoveredVideo)}
          onMouseLeave={() => setHoveredVideo(null)}
        >
          <div className={`${hoveredVideo ? "opacity-100" : "opacity-0"}`}>
            {hoveredVideo && (
              <div className="block space-y-8">
                {getYouTubeId(hoveredVideo.url) && (
                  <div className="w-full aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeId(hoveredVideo.url)}`}
                      title={hoveredVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full outline-none"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout with always visible info */}
      <div className="lg:hidden flex flex-col">
        {videos.map((video, index) => (
          <div key={video._id}>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-8"
            >
              <h2
                className="font-bold uppercase mb-6 show-title-mobile"
                style={{
                  fontSize: "clamp(2rem, 10vw, 4rem)",
                  lineHeight: "1",
                }}
              >
                {video.title}
              </h2>

              {getYouTubeId(video.url) && (
                <div className="w-full mb-6 aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full outline-none"
                  />
                </div>
              )}

              <div className="space-y-0 font-mono border-b-4 border-[var(--color-green)] pb-3">
                <div className="flex items-start gap-4 py-3">
                  <span className="flex-shrink-0" style={{ fontSize: "12px" }}>
                    Category
                  </span>
                  <span
                    className="text-[var(--color-green)] flex-shrink-0"
                    style={{ fontSize: "12px" }}
                  >
                    →
                  </span>
                  <span
                    className="text-right flex-1"
                    style={{ fontSize: "12px" }}
                  >
                    {categoryLabels[video.category] || video.category}
                  </span>
                </div>
              </div>
            </a>
            {index < videos.length - 1 && (
              <div className="border-b-4 border-[var(--color-green)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
