import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-4rem-2rem)] overflow-hidden">
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
