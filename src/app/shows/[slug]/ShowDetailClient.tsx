"use client";

import Link from "next/link";
import Image from "next/image";
import { Show, Video } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import { getImageUrl } from "@/lib/sanityImage";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/locale";
import {
  getLocalizedText,
  getLocalizedBlockContent,
  uiLabels,
  getLabel,
} from "@/lib/translations";

interface ShowDetailClientProps {
  show: Show;
  allShows: Show[];
  trailer: Video | null;
}

export default function ShowDetailClient({
  show,
  allShows,
  trailer,
}: ShowDetailClientProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const baseHref = locale === "fr" ? "/fr" : "";

  const currentIndex = allShows.findIndex((s) => s._id === show._id);
  const prevShow =
    currentIndex > 0
      ? allShows[currentIndex - 1]
      : allShows[allShows.length - 1];
  const nextShow =
    currentIndex < allShows.length - 1
      ? allShows[currentIndex + 1]
      : allShows[0];

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Priority: 1. Trailer from videos collection, 2. Trailer from show, 3. null
  const trailerUrl = trailer?.url || show.trailer || null;
  const videoId = trailerUrl ? getYouTubeId(trailerUrl) : null;

  const imageUrl = show.mainImage
    ? getImageUrl(show.mainImage, 1200)
    : "https://bertandnasi.com/og-image.jpg";

  const showDescription = getLocalizedBlockContent(
    show.description,
    show.descriptionFr,
    locale
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: show.title,
    startDate: `${show.year}`,
    performer: {
      "@type": "PerformingGroup",
      name: "Bert & Nasi",
    },
    image: imageUrl,
    description: show.description
      ? (show.description as TypedObject[])
          .map((block) => {
            if (block._type === "block" && "children" in block) {
              return (block.children as Array<{ text?: string }>)
                .map((child) => child.text)
                .join("");
            }
            return "";
          })
          .join(" ")
      : `${show.title} - A ${show.year} performance by Bert & Nasi`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Marquee customText="Just in Case You're Curious…" />

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col">
        {/* Top bar with title, year, and nav */}
        <div className="flex justify-between items-center py-4 px-5 border-b-4 border-[var(--color-green)]">
          <div className="flex flex-col gap-2">
            <h1
              className="font-bold uppercase show-title-detail"
              style={{
                fontSize: "clamp(1.5rem, 8vw, 2.5rem)",
                lineHeight: "1.1",
              }}
            >
              {show.title}
            </h1>
            <p
              className="font-mono text-[var(--color-green)]"
              style={{ fontSize: "14px", lineHeight: "1" }}
            >
              {show.year}
            </p>
          </div>

          <div className="flex justify-end items-center gap-3 flex-shrink-0">
            <Link href={`${baseHref}/shows/${prevShow.slug.current}`}>
              <Image
                src="/icons/left-arrow.svg"
                alt="Previous show"
                width={32}
                height={32}
                className="w-8 h-8 flex-shrink-0"
              />
            </Link>
            <Link href={`${baseHref}/shows/${nextShow.slug.current}`}>
              <Image
                src="/icons/right-arrow.svg"
                alt="Next show"
                width={32}
                height={32}
                className="w-8 h-8 flex-shrink-0"
              />
            </Link>
            <Link href={`${baseHref}/shows`}>
              <Image
                src="/icons/close.svg"
                alt="Close"
                width={28}
                height={28}
                className="w-7 h-7 ml-2 flex-shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* Main content - single column */}
        <div className="flex flex-col space-y-6 py-6 px-5">
          {/* Video or Image */}
          {videoId ? (
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={show.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full outline-none"
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
          {showDescription && (
            <div
              className="prose prose-sm max-w-none leading-relaxed"
              style={{ fontSize: "16px", lineHeight: "1.6" }}
            >
              <PortableText value={showDescription as TypedObject[]} />
            </div>
          )}

          {/* Image Gallery */}
          {show.imageGallery && show.imageGallery.length > 0 && (
            <div className="space-y-4 border-t-4 border-[var(--color-green)] pt-6 -mx-5 px-5">
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

          {/* Credits */}
          {show.credits && show.credits.length > 0 && (
            <div className="space-y-0 font-mono border-t-4 border-[var(--color-green)] pt-6 -mx-5 px-5">
              {show.credits.map((credit, index) => (
                <div
                  key={index}
                  className="flex items-baseline justify-between py-2"
                >
                  <span
                    className="flex-1 text-left"
                    style={{ fontSize: "14px" }}
                  >
                    {getLocalizedText(credit.role, credit.roleFr, locale)}
                  </span>
                  <span
                    className="text-[var(--color-green)] mx-4"
                    style={{ fontSize: "14px" }}
                  >
                    →
                  </span>
                  <span
                    className="flex-1 text-right"
                    style={{ fontSize: "14px" }}
                  >
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {show.reviews && show.reviews.length > 0 && (
            <div className="space-y-4 border-t-4 border-[var(--color-green)] pt-6 -mx-5 px-5">
              {show.reviews.map((review) => (
                <div key={review._id}>
                  <p className="italic mb-2" style={{ fontSize: "16px" }}>
                    &ldquo;
                    {getLocalizedText(review.quote, review.quoteFr, locale)}
                    &rdquo;
                  </p>
                  {review.link ? (
                    <a
                      href={review.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-green)] transition-colors"
                      style={{ fontSize: "14px" }}
                    >
                      {review.media}
                    </a>
                  ) : (
                    <p style={{ fontSize: "14px" }}>{review.media}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Collaborators */}
          {show.collaborators && show.collaborators.length > 0 && (
            <div className="border-t-4 border-[var(--color-green)] pt-6 -mx-5 px-5">
              <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>
                {getLabel(uiLabels.collaborators, locale)}
              </h3>
              <div className="space-y-1">
                {show.collaborators.map((collab, index) => (
                  <p key={index} style={{ fontSize: "14px" }}>
                    {collab.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Top bar with title, year, and nav */}
        <div className="flex justify-between items-end px-8 py-5 border-b-4 border-[var(--color-green)]">
          <div className="flex gap-5 items-baseline">
            <h1
              className="font-bold uppercase show-title-detail"
              style={{ fontSize: "48px", lineHeight: "1" }}
            >
              {show.title}
            </h1>
            <p
              className="font-mono text-[var(--color-green)]"
              style={{ fontSize: "14px", lineHeight: "1" }}
            >
              {show.year}
            </p>
          </div>

          <div className="flex justify-end items-end gap-5">
            <Link href={`${baseHref}/shows/${prevShow.slug.current}`}>
              <Image
                src="/icons/left-arrow.svg"
                alt="Previous show"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            <Link href={`${baseHref}/shows/${nextShow.slug.current}`}>
              <Image
                src="/icons/right-arrow.svg"
                alt="Next show"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            <Link href={`${baseHref}/shows`}>
              <Image
                src="/icons/close.svg"
                alt="Close"
                width={37}
                height={37}
                className="w-8.5 h-8.5 ml-5"
              />
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-7 gap-5 items-start ml-8 mr-8">
          {/* Columns 1-3: Video or Image + Description */}
          <div className="col-span-3 space-y-5 pt-5 pb-8 -ml-8 pl-8">
            {videoId ? (
              <div className="w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={show.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full outline-none"
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

            {showDescription && (
              <div
                className="prose prose-sm max-w-none leading-relaxed"
                style={{ fontSize: "16px", lineHeight: "1.6" }}
              >
                <PortableText value={showDescription as TypedObject[]} />
              </div>
            )}
          </div>

          {/* Columns 4-5: Image Gallery */}
          <div className="col-span-2 self-stretch">
            {show.imageGallery && show.imageGallery.length > 0 ? (
              <div className="space-y-5 p-5 border-l-4 border-[var(--color-green)] h-full">
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
            ) : (
              <div className="border-l-4 border-[var(--color-green)] h-full" />
            )}
          </div>

          {/* Columns 6-7: Credits, Quotes, Collaborators */}
          <div className="col-span-2 -ml-5 -mr-8 border-l-4 border-[var(--color-green)] pt-5 pb-8 self-stretch flex flex-col">
            {show.credits && show.credits.length > 0 && (
              <div className="space-y-0 font-mono pb-5 pl-5 pr-8 border-b-4 border-[var(--color-green)]">
                {show.credits.map((credit, index) => (
                  <div
                    key={index}
                    className="pb-3 grid grid-cols-3 gap-2 items-baseline"
                  >
                    <div className="text-left">
                      <p style={{ fontSize: "10px" }}>
                        {getLocalizedText(credit.role, credit.roleFr, locale)}
                      </p>
                    </div>
                    <div className="flex justify-center items-baseline">
                      <Image
                        src="/icons/small-arrow-right.svg"
                        alt=""
                        width={11}
                        height={13}
                        className="w-[11px] h-[13px]"
                      />
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: "10px" }}>{credit.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {show.reviews && show.reviews.length > 0 && (
              <div className="space-y-5 py-5 pl-5 pr-8 border-b-4 border-[var(--color-green)]">
                {show.reviews.map((review) => (
                  <div key={review._id}>
                    <p className="italic mb-2" style={{ fontSize: "16px" }}>
                      &ldquo;
                      {getLocalizedText(review.quote, review.quoteFr, locale)}
                      &rdquo;
                    </p>
                    {review.link ? (
                      <a
                        href={review.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-green)] transition-colors"
                        style={{ fontSize: "16px" }}
                      >
                        {review.media}
                      </a>
                    ) : (
                      <p style={{ fontSize: "16px" }}>{review.media}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {show.collaborators && show.collaborators.length > 0 && (
              <div className="pt-8 pl-5 pr-8">
                <h3 className="font-semibold mb-3" style={{ fontSize: "12px" }}>
                  {getLabel(uiLabels.collaborators, locale)}
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
    </div>
  );
}
