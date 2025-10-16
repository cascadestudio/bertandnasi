"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import { getImageUrl } from "@/lib/sanityImage";
import { PortableText } from "@portabletext/react";

interface ShowDetailClientProps {
  show: Show;
  allShows: Show[];
}

export default function ShowDetailClient({
  show,
  allShows,
}: ShowDetailClientProps) {
  const currentIndex = allShows.findIndex((s) => s._id === show._id);
  const prevShow =
    currentIndex > 0
      ? allShows[currentIndex - 1]
      : allShows[allShows.length - 1];
  const nextShow =
    currentIndex < allShows.length - 1
      ? allShows[currentIndex + 1]
      : allShows[0];

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = show.trailer ? getYouTubeId(show.trailer) : null;

  return (
    <div>
      <Marquee pageName="shows" />

      {/* Top Row: Title, Year & Navigation */}
      <div className="grid grid-cols-7 gap-5 mx-8 py-8 items-start border-b-4 border-[var(--color-green)]">
        <div className="col-span-1">
          <h1
            className="font-bold uppercase show-title-detail mb-4"
            style={{
              fontSize: "48px",
              lineHeight: "82px",
            }}
          >
            {show.title}
          </h1>
          <p
            className="font-mono text-[var(--color-green)]"
            style={{ fontSize: "14px" }}
          >
            {show.year}
          </p>
        </div>

        <div className="col-span-5"></div>

        <div className="col-span-1 flex justify-end items-start gap-5">
          <Link href={`/shows/${prevShow.slug.current}`}>
            <Image
              src="/icons/left-arrow.svg"
              alt="Previous show"
              width={40}
              height={40}
              className="w-10 h-10 text-[var(--color-green)] [&_path]:fill-current [&_line]:stroke-current"
            />
          </Link>
          <Link href={`/shows/${nextShow.slug.current}`}>
            <Image
              src="/icons/right-arrow.svg"
              alt="Next show"
              width={40}
              height={40}
              className="w-10 h-10 text-[var(--color-green)] [&_path]:fill-current [&_line]:stroke-current"
            />
          </Link>
          <Link href="/shows">
            <Image
              src="/icons/close.svg"
              alt="Close"
              width={40}
              height={40}
              className="w-10 h-10 text-[var(--color-green)]"
            />
          </Link>
        </div>
      </div>

      {/* Main Content - 7 Column Grid */}
      <div className="grid grid-cols-7 gap-5 mx-8 py-8">
        {/* Columns 1-3: Trailer/Image & Description */}
        <div className="col-span-3 space-y-5">
          {/* Trailer or Main Image */}
          {videoId ? (
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={show.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            show.mainImage && (
              <div className="w-full">
                <Image
                  src={getImageUrl(show.mainImage, 1200)}
                  alt={show.mainImage.alt || show.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            )
          )}

          {/* Description */}
          {show.description && (
            <div
              className="prose prose-sm max-w-none leading-relaxed"
              style={{ fontSize: "16px", lineHeight: "1.6" }}
            >
              <PortableText value={show.description} />
            </div>
          )}
        </div>

        {/* Columns 4-5: Image Gallery */}
        <div className="col-span-2">
          {show.imageGallery && show.imageGallery.length > 0 && (
            <div className="space-y-5 p-5 border-4 border-[var(--color-green)]">
              {show.imageGallery.map((image, index) => (
                <div key={index} className="w-full">
                  <Image
                    src={getImageUrl(image, 800)}
                    alt={image.alt || `${show.title} image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columns 6-7: Credits, Quotes & Collaborators */}
        <div className="col-span-2 space-y-8">
          {/* Credits */}
          {show.credits && show.credits.length > 0 && (
            <div className="space-y-0 font-mono">
              {show.credits.map((credit, index) => (
                <div key={index} className="py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: "12px" }}>{credit.role}</span>
                    <Image
                      src="/icons/small-arrow-right.svg"
                      alt=""
                      width={11}
                      height={13}
                      className="w-[11px] h-[13px] [&_path]:fill-current [&_line]:stroke-current"
                    />
                  </div>
                  <div className="text-right">
                    <span style={{ fontSize: "12px" }}>{credit.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quotes */}
          {show.reviews && show.reviews.length > 0 && (
            <div className="space-y-5">
              {show.reviews.map((review, index) => (
                <div key={index}>
                  <p className="italic mb-2" style={{ fontSize: "16px" }}>
                    "{review.quote}"
                  </p>
                  <p style={{ fontSize: "16px" }}>{review.media}</p>
                </div>
              ))}
            </div>
          )}

          {/* Collaborators */}
          {show.collaborators && show.collaborators.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3" style={{ fontSize: "12px" }}>
                Collaborators
              </h3>
              <div className="space-y-1">
                {show.collaborators.map((collab, index) => (
                  <p key={index} style={{ fontSize: "12px" }}>
                    {collab.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
