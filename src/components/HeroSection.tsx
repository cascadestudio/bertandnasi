import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <Image
        src="/images/hero-image.jpg"
        alt="Bert and Nasi performance with red lighting"
        fill
        priority
        className="object-cover object-center"
        quality={90}
      />
    </section>
  )
}

