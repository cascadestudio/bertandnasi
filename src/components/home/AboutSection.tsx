"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const carouselImages = [
  {
    src: "/images/carousel-image-1.png",
    alt: "Bert and Nasi performing, jumping on stage",
  },
  {
    src: "/images/carousel-image-2.jpg",
    alt: "Performer with curtains and dramatic lighting",
  },
];

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full mb-20 lg:mb-0">
      <div className="grid grid-cols-7 gap-5 px-4 md:px-8">
        {/* Text Content - Spans 3 columns */}
        <div className="col-span-7 md:col-span-3 lg:space-y-8 py-5 lg:py-0 lg:pt-5">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-7 mb-3 lg:mb-0 font-light">
            Bert and Nasi are a contemporary performance duo that met in 2015
            and have since created an entire repertoire of shows in the midst of
            a period of national and international austerity. Their work, in
            turn, is stripped back and minimalist, whilst dealing with complex
            ideas and emotions. Their shows lie somewhere between performance,
            dance and theatre but if you had to pin them down on it, they&apos;d
            probably say it&apos;s theatre.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center font-mono gap-2 text-[var(--color-green)] hover:opacity-80 transition-opacity font-bold text-sm"
          >
            <Image
              src="/icons/link-arrow.svg"
              alt=""
              width={11}
              height={13}
              className="w-[11px] h-[13px] [&_path]:fill-current [&_line]:stroke-current"
            />
            See more
          </Link>
        </div>

        {/* Image Carousel - Spans 3 columns */}
        <div className="col-span-7 md:col-span-3 relative lg:border-l-4 lg:border-[var(--color-green)] lg:p-5 lg:pr-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Navigation Arrows - Last column */}
        <div className="col-span-7 md:col-span-1 flex items-end justify-center md:justify-end pb-5">
          <div className="flex items-center justify-center gap-8 w-full lg:gap-5 lg:justify-end max-w-32">
            <button
              onClick={prevImage}
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
              onClick={nextImage}
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
        </div>
      </div>
    </section>
  );
}
