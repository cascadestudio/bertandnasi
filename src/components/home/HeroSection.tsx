import Image from "next/image";
import { getImageUrl } from "@/lib/sanityImage";
import type { HeroImages } from "@/sanity/lib/queries";

interface HeroSectionProps {
  images?: HeroImages;
}

export default function HeroSection({ images }: HeroSectionProps) {
  const desktopSrc = images?.desktopImage
    ? getImageUrl(images.desktopImage.asset, 1920)
    : "/images/hero-image-desktop.jpg";
  const desktopAlt = images?.desktopImage?.alt || "Bert and Nasi performance with red lighting";

  const mobileSrc = images?.mobileImage
    ? getImageUrl(images.mobileImage.asset, 1024)
    : "/images/hero-image-mobile.jpg";
  const mobileAlt = images?.mobileImage?.alt || "Bert and Nasi performance with red lighting";

  return (
    <section className="relative w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] overflow-hidden mb-0">
      {/* Mobile: portrait image */}
      <div className="absolute inset-0 block lg:hidden">
        <Image
          src={mobileSrc}
          alt={mobileAlt}
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="(max-width: 1023px) 100vw, 0vw"
        />
      </div>
      {/* Desktop: landscape image */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src={desktopSrc}
          alt={desktopAlt}
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="(min-width: 1024px) 100vw, 0vw"
        />
      </div>
    </section>
  );
}
