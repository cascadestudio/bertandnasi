'use client'

import { useState } from 'react'

const reviews = [
  {
    quote: "with a striking economy of effect, Bert and Nasi are worthy heirs to Monty Python",
    source: "Le Monde",
  },
  {
    quote: "Tim Etchells's score and the duo of performers are enchanting",
    source: "Telerama",
  },
]

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? reviews.length - 1 : prev - 1
    )
  }

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center space-y-6 px-16">
          <blockquote className="text-xl md:text-2xl lg:text-3xl italic leading-relaxed">
            "{reviews[currentIndex].quote}"
          </blockquote>
          <cite className="block text-lg md:text-xl not-italic font-medium">
            {reviews[currentIndex].source}
          </cite>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 -translate-y-1/2 hover:text-[var(--color-green)] transition-colors p-2"
          aria-label="Previous review"
        >
          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-[var(--color-green)] transition-colors p-2"
          aria-label="Next review"
        >
          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

