import Marquee from "@/components/home/Marquee";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchAllTeamMembers, fetchAboutPageImages } from "@/sanity/lib/queries";
import { getImageUrl } from "@/lib/sanityImage";

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

export default async function AboutPage() {
  const [teamMembers, aboutImages] = await Promise.all([
    fetchAllTeamMembers(),
    fetchAboutPageImages(),
  ]);

  return (
    <div>
      <Marquee pageName="about" />
      <div className="min-h-screen bg-white">
        {/* Mobile Layout */}
        <main className="lg:hidden flex flex-col min-h-screen">
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
            </div>
          </div>

          {/* Images */}
          <div className="px-5 py-6 space-y-4">
            {aboutImages.map((image, index) => (
              <Image
                key={index}
                src={getImageUrl(image.asset, 800)}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            ))}
          </div>

          {/* Team */}
          <div className="px-5 pb-8">
            <h3 className="text-sm font-mono text-black mb-4">Team</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member._id}>
                  <h4 className="font-sans text-black font-normal">
                    {member.name}
                  </h4>
                  <p className="text-black text-xs mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Desktop Layout */}
        <main className="hidden lg:grid lg:grid-cols-3 min-h-screen">
          {/* Left Column - Content */}
          <div className="flex flex-col relative border-r-4 border-[var(--color-green)]">
            <div className="flex items-start justify-start pl-8 pr-5 pt-5 pb-8">
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
              </div>
            </div>
          </div>

          {/* Middle Column - Images */}
          <div className="flex flex-col relative border-r-4 border-[var(--color-green)]">
            <div className="flex flex-col items-start justify-start p-5 space-y-4">
              {aboutImages.map((image, index) => (
                <Image
                  key={index}
                  src={getImageUrl(image.asset, 800)}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Team */}
          <div className="flex flex-col relative">
            <div className="flex items-start pl-5 pr-8 pt-5 pb-8">
              <div>
                <h3 className="text-sm font-mono text-black mb-4">Team</h3>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member._id}>
                      <h4 className="font-sans text-black font-normal">
                        {member.name}
                      </h4>
                      <p className="text-black text-xs mt-1">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
