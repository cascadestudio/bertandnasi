"use client";

import { useState } from "react";
import { Video } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { videoCategoryLabels, getLabel, getLocalizedText } from "@/lib/translations";

interface VideosPageClientProps {
  videos: Video[];
}

export default function VideosPageClient({ videos }: VideosPageClientProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Group videos by category
  const videosByCategory = videos.reduce(
    (acc, video) => {
      if (!acc[video.category]) {
        acc[video.category] = [];
      }
      acc[video.category].push(video);
      return acc;
    },
    {} as Record<string, Video[]>
  );

  // Define category order
  const categoryOrder = ["trailers", "online-content", "short-films"];
  const categories = categoryOrder.filter(
    (category) => videosByCategory[category]
  );

  return (
    <div>
      <Marquee pageName="videos" />
      <div className="hidden lg:grid lg:grid-cols-7 mr-8 gap-5 min-h-[calc(100vh-200px)]">
        <div className="col-span-4 flex flex-col pt-8 border-r-4 border-[var(--color-green)] h-full">
          <div className="flex-1 pb-8">
            {categories.map((category, index) => (
              <div
                key={category}
                className={
                  index > 0 ? "" : "border-t-4 border-[var(--color-green)]"
                }
              >
                <div
                  onMouseEnter={() => setHoveredCategory(category)}
                  className="block px-8 py-12 group border-b-4 border-[var(--color-green)]"
                >
                  <h2
                    className={`font-bold uppercase ${
                      hoveredCategory === category
                        ? "show-title-hover"
                        : "show-title"
                    }`}
                    style={{
                      fontSize: "84px",
                      lineHeight: "82px",
                    }}
                  >
                    {getLabel(videoCategoryLabels[category as keyof typeof videoCategoryLabels], locale)}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`col-span-3 sticky top-12 self-start max-h-[calc(100vh-4rem)] overflow-auto -ml-5 pl-5 -mr-8 pr-8 pt-5 pb-5`}
          onMouseEnter={() =>
            hoveredCategory && setHoveredCategory(hoveredCategory)
          }
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className={`${hoveredCategory ? "opacity-100" : "opacity-0"}`}>
            {hoveredCategory && videosByCategory[hoveredCategory] && (
              <div className="block space-y-5">
                {videosByCategory[hoveredCategory].map((video, index) => (
                  <div key={video._id}>
                    {getYouTubeId(video.url) && (
                      <div className="w-full aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
                          title={getLocalizedText(video.title, video.titleFr, locale)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Grouped by category */}
      <div className="lg:hidden flex flex-col">
        {categories.map((category, categoryIndex) => (
          <div key={category}>
            <div className="px-6 py-8">
              <h2
                className="font-bold uppercase show-title-mobile"
                style={{
                  fontSize: "clamp(2rem, 10vw, 4rem)",
                  lineHeight: "1",
                }}
              >
                {getLabel(videoCategoryLabels[category as keyof typeof videoCategoryLabels], locale)}
              </h2>
            </div>

            <div className="space-y-5 px-6 pb-8">
              {videosByCategory[category].map((video) => (
                <div key={video._id}>
                  {getYouTubeId(video.url) && (
                    <div className="w-full aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
                        title={getLocalizedText(video.title, video.titleFr, locale)}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {categoryIndex < categories.length - 1 && (
              <div className="border-b-4 border-[var(--color-green)] -mx-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
