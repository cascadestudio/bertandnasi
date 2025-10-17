"use client";

import { useState } from "react";
import Link from "next/link";
import { Show } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import { getImageUrl } from "@/lib/sanityImage";
import Image from "next/image";

interface ShowsPageClientProps {
  shows: Show[];
}

export default function ShowsPageClient({ shows }: ShowsPageClientProps) {
  const [hoveredShow, setHoveredShow] = useState<Show | null>(null);

  return (
    <div>
      <Marquee pageName="shows" />
      <div className="hidden lg:grid lg:grid-cols-7 mr-8 gap-5">
        <div className="col-span-4 flex flex-col py-8 border-r-4 border-[var(--color-green)]">
          {shows.map((show, index) => (
            <div key={show._id}>
              <Link
                href={`/shows/${show.slug.current}`}
                onMouseEnter={() => setHoveredShow(show)}
                className="block px-8 py-12 group border-t-4 border-[var(--color-green)]"
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
              {index === shows.length - 1 && (
                <div className="border-b-4 border-[var(--color-green)]" />
              )}
            </div>
          ))}
        </div>

        <div
          className={`col-span-3 sticky top-24 self-start max-h-[calc(100vh-4rem)] overflow-auto pt-5 -ml-5 pl-5 -mr-8 pr-8 ${hoveredShow ? "border-b-4 border-[var(--color-green)]" : ""}`}
          onMouseEnter={() => hoveredShow && setHoveredShow(hoveredShow)}
          onMouseLeave={() => setHoveredShow(null)}
        >
          <div className={`${hoveredShow ? "opacity-100" : "opacity-0"}`}>
            {hoveredShow && (
              <Link
                href={`/shows/${hoveredShow.slug.current}`}
                className="block space-y-8"
              >
                {hoveredShow.mainImage && (
                  <div className="w-full">
                    <Image
                      src={getImageUrl(hoveredShow.mainImage, 1200)}
                      alt={hoveredShow.mainImage.alt || hoveredShow.title}
                      className="object-cover"
                      width={1200}
                      height={1200}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={90}
                    />
                  </div>
                )}

                <div className="space-y-0 font-mono pb-3">
                  <div className="grid grid-cols-3 gap-5 items-baseline pb-2">
                    <p style={{ fontSize: "12px" }}>Year</p>
                    <Image
                      src="/icons/small-arrow-right.svg"
                      alt=""
                      width={11}
                      height={13}
                      className="w-[11px] h-[13px]"
                    />
                    <p className="text-right" style={{ fontSize: "12px" }}>
                      {hoveredShow.year}
                    </p>
                  </div>

                  {hoveredShow.credits &&
                    hoveredShow.credits.map((credit, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-5 items-baseline pb-2"
                      >
                        <p style={{ fontSize: "12px" }}>{credit.role}</p>
                        <Image
                          src="/icons/small-arrow-right.svg"
                          alt=""
                          width={11}
                          height={13}
                          className="w-[11px] h-[13px]"
                        />
                        <p className="text-right" style={{ fontSize: "12px" }}>
                          {credit.name}
                        </p>
                      </div>
                    ))}
                </div>
              </Link>
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
                <div className="flex items-start gap-4 py-3">
                  <span className="flex-shrink-0" style={{ fontSize: "12px" }}>
                    Year
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
                    {show.year}
                  </span>
                </div>

                {show.credits &&
                  show.credits.map((credit, index) => (
                    <div key={index} className="flex items-start gap-4 py-3">
                      <span
                        className="flex-shrink-0"
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
                        className="text-right flex-1"
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
