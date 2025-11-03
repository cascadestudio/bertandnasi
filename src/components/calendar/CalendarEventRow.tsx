"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarEvent } from "@/sanity/lib/queries";
import { formatDateRange } from "@/lib/dateUtils";
import { getImageUrl } from "@/lib/sanityImage";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/locale";

interface CalendarEventRowProps {
  event: CalendarEvent;
  showBorder?: boolean;
}

export default function CalendarEventRow({
  event,
  showBorder = true,
}: CalendarEventRowProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const baseHref = locale === "fr" ? "/fr" : "";
  const { month, days } = formatDateRange(event.dates, locale);
  const [needsMarquee, setNeedsMarquee] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDistance, setSlideDistance] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content overflows and needs marquee
  useEffect(() => {
    const checkOverflow = () => {
      if (rowRef.current && contentRef.current) {
        const rowWidth = rowRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const needsAnimation = contentWidth > rowWidth;
        setNeedsMarquee(needsAnimation);

        if (needsAnimation) {
          // Calculate how much to slide to align right edge of content with right edge of container
          const slideAmount = contentWidth - rowWidth;
          setSlideDistance(slideAmount);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Get all images (main + additional)
  const allImages = [];
  if (event.show.mainImage) {
    allImages.push({
      src: getImageUrl(event.show.mainImage, 400),
      alt: event.show.mainImage.alt || event.show.title,
    });
  }
  if (event.additionalImages) {
    event.additionalImages.forEach((img) => {
      allImages.push({
        src: getImageUrl(img, 400),
        alt: img.alt || event.show.title,
      });
    });
  }

  return (
    <div
      ref={rowRef}
      className={`h-[120px] text-black overflow-x-hidden overflow-y-visible lg:overflow-visible ${
        showBorder ? "border-t-4 border-b-4 border-[var(--color-green)]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={contentRef}
        className={`flex items-center h-full whitespace-nowrap overflow-x-auto lg:overflow-visible overflow-y-hidden scrollbar-hide ${
          isHovered ? "lg:transition-transform lg:duration-3000 lg:ease-linear" : ""
        }`}
        style={{
          transform:
            needsMarquee && isHovered
              ? `translateX(-${slideDistance}px)`
              : "translateX(0)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Date */}
        <div className="flex-shrink-0 px-4 lg:px-8">
          <div className="text-[16px] lg:text-2xl uppercase tracking-wide text-black font-mono">
            {month}
          </div>
          <div className="text-[16px] lg:text-2xl font-normal leading-tight font-mono">
            {days}
          </div>
        </div>

        {/* Show Name */}
        <div className="flex-shrink-0 px-4">
          <Link
            href={`${baseHref}/shows/${event.show.slug.current}`}
            className="text-2xl lg:text-5xl font-regular uppercase leading-none hover:text-[var(--color-green)] transition-colors"
          >
            {event.show.title}
          </Link>
        </div>

        {/* Images */}
        {allImages.length > 0 && (
          <div className="flex-shrink-0 flex items-center gap-4 lg:gap-8 py-4">
            {allImages.map((img, index) => (
              <div
                key={index}
                className="relative h-[88px] w-auto flex-shrink-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={88}
                  style={{ height: "100%", width: "auto" }}
                  className="h-full w-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            ))}
          </div>
        )}

        {/* Venue Name */}
        <div className="flex-shrink-0 px-4">
          {event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl lg:text-5xl font-regular uppercase leading-none hover:text-[var(--color-green)] transition-colors"
            >
              {event.venue}
            </a>
          ) : (
            <span className="text-2xl lg:text-5xl font-regular uppercase leading-none">
              {event.venue}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex-shrink-0 px-4">
          <span className="text-2xl lg:text-5xl font-regular uppercase leading-none">
            {event.location}
          </span>
        </div>
      </div>
    </div>
  );
}
