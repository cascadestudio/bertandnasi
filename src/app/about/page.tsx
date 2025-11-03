import Marquee from "@/components/home/Marquee";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bert and Nasi are a contemporary performance duo that met in 2015. Award-winning artists performing internationally at major festivals including PuSh Festival, Festival de Otoño, and Adelaide International Festival.",
  openGraph: {
    title: "About Bert & Nasi - Contemporary Performance Duo",
    description:
      "Bert and Nasi are a contemporary performance duo that met in 2015. Award-winning artists performing internationally at major festivals.",
    url: "https://bertandnasi.com/about",
    type: "profile",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bert & Nasi",
    description:
      "Award-winning contemporary performance duo performing internationally since 2015.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div>
      <Marquee pageName="about" />
      <div className="min-h-screen bg-white">
        {/* Mobile Layout */}
        <main className="lg:hidden flex flex-col min-h-screen">
          {/* Title */}
          <div className="flex items-center px-5 border-b-4 border-[var(--color-green)] py-6">
            <h1 className="text-4xl show-title-hover">Bert & Nasi</h1>
          </div>

          {/* Content */}
          <div className="flex-1 py-6 px-5">
            <div className="text-left space-y-6">
              <p className="text-black text-base leading-relaxed">
                Bert and Nasi are a contemporary performance duo that met in
                2015 and have since created an entire repertoire of shows in the
                midst of a period of national and international austerity. Their
                work, in turn, is stripped back and minimalist, whilst dealing
                with complex ideas and emotions. Their shows lie somewhere
                between performance, dance and theatre but if you had to pin
                them down on it, they&apos;d probably say it&apos;s theatre.
              </p>
              <p className="text-black text-base leading-relaxed">
                Together they have performed their shows on the international
                stages of PuSh Festival (Canada), Festival de Otoño (Spain),
                Sarajevo Mess (Bosnia), Adelaide International Festival
                (Australia), InTeatro (Italy), Avignon Festival (France) as well
                as MiTsp (Brazil).
              </p>
              <p className="text-black text-base leading-relaxed">
                In 2020, Bert and Nasi received the Forced Entertainment Award
                in memory of Huw Chadbourn, which celebrates the work of
                contemporary artists reinventing theatre and performance in new
                ways and for new audiences.
              </p>

              <div className="mt-8 border-t-4 border-[var(--color-green)] -mx-5 px-5 pt-6">
                <h2 className="text-sm font-mono text-black mb-4">Team</h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-sans text-black font-normal">
                      Khénory Sok
                    </h4>
                    <p className="text-black text-xs mt-1">
                      Artistic Project Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6 border-t-4 border-[var(--color-green)] pt-6 px-5 pb-8">
            <Image
              src="/images/about-bert.jpg"
              alt="Bert"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
            <Image
              src="/images/about-nasi.jpg"
              alt="Nasi"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </main>

        {/* Desktop Layout */}
        <main className="hidden lg:grid lg:grid-cols-3 min-h-screen">
          {/* Left Column - Bert */}
          <div className="flex flex-col relative border-r-4 border-[var(--color-green)]">
            {/* Title row - Bert title */}
            <div className="flex items-center justify-start border-b-4 border-[var(--color-green)] pl-8 pr-5 py-5">
              <h1 className="text-6xl md:text-8xl show-title-hover">Bert</h1>
            </div>
            {/* Image row - Bert image */}
            <div className="flex items-start justify-start pl-8 pr-5 pt-5">
              <Image
                src="/images/about-bert.jpg"
                alt="Bert"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="flex flex-col relative border-r-4 border-[var(--color-green)]">
            {/* Title row - & symbol */}
            <div className="flex items-center border-b-4 border-[var(--color-green)] p-5">
              <h1 className="text-6xl md:text-8xl show-title-hover">&</h1>
            </div>
            {/* Content row */}
            <div className="flex items-start justify-start p-5 pb-8">
              <div className="text-left space-y-6 max-w-lg">
                <p className="text-black text-base leading-relaxed">
                  Bert and Nasi are a contemporary performance duo that met in
                  2015 and have since created an entire repertoire of shows in
                  the midst of a period of national and international austerity.
                  Their work, in turn, is stripped back and minimalist, whilst
                  dealing with complex ideas and emotions. Their shows lie
                  somewhere between performance, dance and theatre but if you
                  had to pin them down on it, they&apos;d probably say it&apos;s
                  theatre.
                </p>
                <p className="text-black text-base leading-relaxed">
                  Together they have performed their shows on the international
                  stages of PuSh Festival (Canada), Festival de Otoño (Spain),
                  Sarajevo Mess (Bosnia), Adelaide International Festival
                  (Australia), InTeatro (Italy), Avignon Festival (France) as
                  well as MiTsp (Brazil).
                </p>
                <p className="text-black text-base leading-relaxed">
                  In 2020, Bert and Nasi received the Forced Entertainment Award
                  in memory of Huw Chadbourn, which celebrates the work of
                  contemporary artists reinventing theatre and performance in
                  new ways and for new audiences.
                </p>

                <div className="mt-8">
                  <h3 className="text-sm font-mono text-black mb-4">Team</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-sans text-black font-normal">
                        Khénory Sok
                      </h4>
                      <p className="text-black text-xs mt-1">
                        Artistic Project Manager
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Nasi */}
          <div className="flex flex-col relative">
            {/* Title row - Nasi title */}
            <div className="flex items-center border-b-4 border-[var(--color-green)] pl-5 pr-8 py-5">
              <h1 className="text-6xl md:text-8xl show-title-hover">Nasi</h1>
            </div>
            {/* Image row - Nasi image */}
            <div className="flex items-start pl-5 pr-8 pt-5 pb-8">
              <Image
                src="/images/about-nasi.jpg"
                alt="Nasi"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
