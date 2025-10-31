import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] overflow-hidden mb-0">
      {/* Mobile: hero-image-2.jpg */}
      <div className="absolute inset-0 block lg:hidden">
        <Image
          src="/images/hero-image-2.jpg"
          alt="Bert and Nasi performance with red lighting"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="(max-width: 1023px) 100vw, 0vw"
        />
      </div>
      {/* Desktop: hero-image-1.jpg */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero-image-1.jpg"
          alt="Bert and Nasi performance with red lighting"
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
