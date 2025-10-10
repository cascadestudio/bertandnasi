'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const carouselImages = [
  {
    src: '/images/carousel-image-1.png',
    alt: 'Bert and Nasi performing, jumping on stage',
  },
  {
    src: '/images/carousel-image-2.jpg',
    alt: 'Performer with curtains and dramatic lighting',
  },
]

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    )
  }

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
        {/* Text Content */}
        <div className="space-y-8">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose font-light">
            Bert and Nasi are a contemporary performance duo that met in 2015 and have since created an entire repertoire of shows in the midst of a period of national and international austerity. Their work, in turn, is stripped back and minimalist, whilst dealing with complex ideas and emotions. Their shows lie somewhere between performance, dance and theatre but if you had to pin them down on it, they&apos;d probably say it&apos;s theatre.
          </p>
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 text-base md:text-lg text-[var(--color-green)] hover:opacity-80 transition-opacity font-normal"
          >
            → See more
          </Link>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Navigation Arrows - Bottom Right */}
          <div className="flex gap-6 justify-end mt-6">
            <button
              onClick={prevImage}
              className="text-black hover:text-[var(--color-green)] transition-colors p-1"
              aria-label="Previous image"
            >
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="text-black hover:text-[var(--color-green)] transition-colors p-1"
              aria-label="Next image"
            >
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

