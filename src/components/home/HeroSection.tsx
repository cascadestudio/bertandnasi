import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] overflow-hidden mb-0">
      <Image
        src="/images/hero-image-1.jpg"
        alt="Bert and Nasi performance with red lighting"
        fill
        priority
        className="object-cover object-center"
        quality={90}
        sizes="100vw"
      />
    </section>
  );
}
