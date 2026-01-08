"use client";

import { useState } from "react";
import Image from "next/image";
import { Review } from "@/sanity/lib/queries";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { getLocalizedText } from "@/lib/translations";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Get the two quotes to display based on current index
  const firstQuote = reviews[currentIndex];
  const secondQuote = reviews[(currentIndex + 1) % reviews.length];

  return (
    <section className="w-full py-20">
      <div className="px-5">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col space-y-8 min-h-[200px]">
          <div className="space-y-4 text-center flex-1 flex flex-col justify-center">
            <blockquote className="text-xl italic font-bold leading-relaxed text-black">
              &ldquo;
              {getLocalizedText(firstQuote.quote, firstQuote.quoteFr, locale)}
              &rdquo;
            </blockquote>
            {firstQuote.link ? (
              <cite className="block text-sm not-italic font-normal text-black">
                <a
                  href={firstQuote.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-green)] transition-colors"
                >
                  {firstQuote.media}
                </a>
              </cite>
            ) : (
              <cite className="block text-sm not-italic font-normal text-black">
                {firstQuote.media}
              </cite>
            )}
          </div>

          <div className="flex items-center justify-center gap-8">
            <button
              onClick={prevReview}
              className="hover:opacity-80 transition-opacity"
              aria-label="Previous review"
            >
              <Image
                src="/icons/left-arrow.svg"
                alt=""
                width={43}
                height={35}
                className="w-[43px] h-[35px] [&_path]:fill-current"
              />
            </button>
            <button
              onClick={nextReview}
              className="hover:opacity-80 transition-opacity"
              aria-label="Next review"
            >
              <Image
                src="/icons/right-arrow.svg"
                alt=""
                width={43}
                height={35}
                className="w-[43px] h-[35px] [&_path]:fill-current"
              />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-5 items-center max-w-7xl mx-auto">
          <div className="col-start-2 col-span-2 space-y-4 text-center">
            <blockquote className="text-2xl italic font-bold leading-relaxed text-black">
              &ldquo;
              {getLocalizedText(firstQuote.quote, firstQuote.quoteFr, locale)}
              &rdquo;
            </blockquote>
            {firstQuote.link ? (
              <cite className="block text-base not-italic font-normal text-black">
                <a
                  href={firstQuote.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-green)] transition-colors"
                >
                  {firstQuote.media}
                </a>
              </cite>
            ) : (
              <cite className="block text-base not-italic font-normal text-black">
                {firstQuote.media}
              </cite>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center gap-5">
            <button
              onClick={prevReview}
              className="hover:opacity-80 transition-opacity"
              aria-label="Previous image"
            >
              <Image
                src="/icons/left-arrow.svg"
                alt=""
                width={43}
                height={35}
                className="w-[43px] h-[35px] [&_path]:fill-current"
              />
            </button>
            <button
              onClick={nextReview}
              className="hover:opacity-80 transition-opacity"
              aria-label="Next image"
            >
              <Image
                src="/icons/right-arrow.svg"
                alt=""
                width={43}
                height={35}
                className="w-[43px] h-[35px] [&_path]:fill-current"
              />
            </button>
          </div>
          <div className="col-span-2 space-y-4 text-center">
            <blockquote className="text-2xl italic font-bold leading-relaxed text-black">
              &ldquo;
              {getLocalizedText(secondQuote.quote, secondQuote.quoteFr, locale)}
              &rdquo;
            </blockquote>
            {secondQuote.link ? (
              <cite className="block text-base not-italic font-normal text-black">
                <a
                  href={secondQuote.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-green)] transition-colors"
                >
                  {secondQuote.media}
                </a>
              </cite>
            ) : (
              <cite className="block text-base not-italic font-normal text-black">
                {secondQuote.media}
              </cite>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
