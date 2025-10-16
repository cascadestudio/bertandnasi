"use client";

import { useState } from "react";
import Link from "next/link";
import { Show } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import { getImageUrl } from "@/lib/sanityImage";

interface ShowsPageClientProps {
  shows: Show[];
}

export default function ShowsPageClient({ shows }: ShowsPageClientProps) {
  const [hoveredShow, setHoveredShow] = useState<Show | null>(null);

  return (
    <div>
      <Marquee pageName="shows" />
      <div className="hidden lg:grid lg:grid-cols-7 gap-5 mx-8 py-8">
        <div className="col-span-4 flex flex-col border-4 border-[var(--color-green)]">
          {shows.map((show, index) => (
            <div key={show._id}>
              <Link
                href={`/shows/${show.slug.current}`}
                onMouseEnter={() => setHoveredShow(show)}
                onMouseLeave={() => setHoveredShow(null)}
                className="block px-8 py-12 group"
              >
                <h2
                  className={`font-bold uppercase ${
                    hoveredShow?._id === show._id
                      ? "show-title-hover"
                      : "show-title"
                  }`}
                  style={{
                    fontSize: "84px",
                    lineHeight: "82px",
                  }}
                >
                  {show.title}
                </h2>
              </Link>
              {index < shows.length - 1 && (
                <div className="border-b-4 border-[var(--color-green)]" />
              )}
            </div>
          ))}
        </div>

        <div className="col-span-3 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-auto">
          <div className={hoveredShow ? "opacity-100" : "opacity-0"}>
            {hoveredShow && (
              <div className="space-y-8">
                {hoveredShow.mainImage && (
                  <div className="w-full">
                    <img
                      src={getImageUrl(hoveredShow.mainImage, 1200)}
                      alt={hoveredShow.mainImage.alt || hoveredShow.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="space-y-0 font-mono border-b-4 border-[var(--color-green)] pb-3">
                  <div className="flex items-start gap-4 border-b border-gray-200 py-3">
                    <span
                      className="text-gray-800 flex-shrink-0"
                      style={{ fontSize: "12px" }}
                    >
                      Year
                    </span>
                    <span
                      className="text-[var(--color-green)] flex-shrink-0"
                      style={{ fontSize: "12px" }}
                    >
                      →
                    </span>
                    <span
                      className="text-gray-800 text-right flex-1"
                      style={{ fontSize: "12px" }}
                    >
                      {hoveredShow.year}
                    </span>
                  </div>

                  {hoveredShow.credits &&
                    hoveredShow.credits.map((credit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 border-b border-gray-200 py-3"
                      >
                        <span
                          className="text-gray-800 flex-shrink-0"
                          style={{ fontSize: "12px" }}
                        >
                          {credit.role}
                        </span>
                        <span
                          className="text-[var(--color-green)] flex-shrink-0"
                          style={{ fontSize: "12px" }}
                        >
                          →
                        </span>
                        <span
                          className="text-gray-800 text-right flex-1"
                          style={{ fontSize: "12px" }}
                        >
                          {credit.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout with always visible info */}
      <div className="lg:hidden flex flex-col">
        {shows.map((show, index) => (
          <div key={show._id}>
            <Link
              href={`/shows/${show.slug.current}`}
              className="block px-6 py-8"
            >
              <h2
                className="font-bold uppercase mb-6 show-title-mobile"
                style={{
                  fontSize: "clamp(2rem, 10vw, 4rem)",
                  lineHeight: "1",
                }}
              >
                {show.title}
              </h2>

              {show.mainImage && (
                <div className="w-full mb-6">
                  <img
                    src={getImageUrl(show.mainImage, 800)}
                    alt={show.mainImage.alt || show.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="space-y-0 font-mono border-b-4 border-[var(--color-green)] pb-3">
                <div className="flex items-start gap-4 border-b border-gray-200 py-3">
                  <span
                    className="text-gray-800 flex-shrink-0"
                    style={{ fontSize: "12px" }}
                  >
                    Year
                  </span>
                  <span
                    className="text-[var(--color-green)] flex-shrink-0"
                    style={{ fontSize: "12px" }}
                  >
                    →
                  </span>
                  <span
                    className="text-gray-800 text-right flex-1"
                    style={{ fontSize: "12px" }}
                  >
                    {show.year}
                  </span>
                </div>

                {show.credits &&
                  show.credits.map((credit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-b border-gray-200 py-3"
                    >
                      <span
                        className="text-gray-800 flex-shrink-0"
                        style={{ fontSize: "12px" }}
                      >
                        {credit.role}
                      </span>
                      <span
                        className="text-[var(--color-green)] flex-shrink-0"
                        style={{ fontSize: "12px" }}
                      >
                        →
                      </span>
                      <span
                        className="text-gray-800 text-right flex-1"
                        style={{ fontSize: "12px" }}
                      >
                        {credit.name}
                      </span>
                    </div>
                  ))}
              </div>
            </Link>
            {index < shows.length - 1 && (
              <div className="border-b-4 border-[var(--color-green)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
