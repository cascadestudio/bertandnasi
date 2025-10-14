"use client";

import { useState } from "react";

const reviews = [
  {
    quote:
      "with a striking economy of effect, Bert and Nasi are worthy heirs to Monty Python",
    source: "Le Monde",
  },
  {
    quote: "Tim Etchells's score and the duo of performers are enchanting",
    source: "Telerama",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="px-4 md:px-8">
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center space-y-8 px-12 md:px-20">
            <blockquote className="text-lg md:text-xl lg:text-2xl xl:text-3xl italic leading-relaxed font-light">
              &ldquo;{reviews[currentIndex].quote}&rdquo;
            </blockquote>
            <cite className="block text-base md:text-lg not-italic font-normal">
              {reviews[currentIndex].source}
            </cite>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-black hover:text-[var(--color-green)] transition-colors p-1"
            aria-label="Previous review"
          >
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:text-[var(--color-green)] transition-colors p-1"
            aria-label="Next review"
          >
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
