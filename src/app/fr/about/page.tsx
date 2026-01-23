import Marquee from "@/components/home/Marquee";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchAllTeamMembers, fetchAboutPageImages } from "@/sanity/lib/queries";
import { getImageUrl } from "@/lib/sanityImage";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Bertand et Nasi sont un duo d'artistes-performeurs qui travaillent ensemble depuis 2015. Artistes primés se produisant internationalement dans les grands festivals incluant PuSh Festival, Festival de Otoño, et Adelaide International Festival.",
  alternates: {
    canonical: "/fr/about",
    languages: {
      en: "/about",
      fr: "/fr/about",
    },
  },
  openGraph: {
    title: "À propos de Bert & Nasi - Duo d'artistes-performeurs",
    description:
      "Bertand et Nasi sont un duo d'artistes-performeurs qui travaillent ensemble depuis 2015. Artistes primés se produisant internationalement dans les grands festivals.",
    url: "https://bertandnasi.com/fr/about",
    type: "profile",
    locale: "fr_FR",
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
    title: "À propos de Bert & Nasi",
    description:
      "duo d'artistes-performeurs primé se produisant internationalement depuis 2015.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
};

export default async function AboutPageFrench() {
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
                Bertand et Nasi sont un duo d&apos;artistes-performeurs qui se
                sont rencontrés en 2015 et ont depuis créé un répertoire entier
                de spectacles au milieu d&apos;une période d&apos;austérité
                nationale et internationale. Leur travail, à son tour, est
                dépouillé et minimaliste, tout en traitant d&apos;idées et
                d&apos;émotions complexes. Leurs spectacles se situent quelque
                part entre la performance, la danse et le théâtre, mais si vous
                deviez les coincer là-dessus, ils diraient probablement que
                c&apos;est du théâtre.
              </p>
              <p className="text-black text-base leading-relaxed">
                Ensemble, ils ont présenté leurs spectacles sur les scènes
                internationales du PuSh Festival (Canada), du Festival de Otoño
                (Espagne), de Sarajevo Mess (Bosnie), de l&apos;Adelaide
                International Festival (Australie), d&apos;InTeatro (Italie), du
                Festival d&apos;Avignon (France) ainsi que du MiTsp (Brésil).
              </p>
              <p className="text-black text-base leading-relaxed">
                En 2020, Bertand et Nasi ont reçu le Forced Entertainment Award
                à la mémoire de Huw Chadbourn, qui célèbre le travail
                d&apos;artistes contemporains réinventant le théâtre et la
                performance de nouvelles manières et pour de nouveaux publics.
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
            <h3 className="text-sm font-mono text-black mb-4">Équipe</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member._id}>
                  <h4 className="font-sans text-black font-normal">
                    {member.name}
                  </h4>
                  <p className="text-black text-xs mt-1">
                    {member.roleFr || member.role}
                  </p>
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
                  Bertand et Nasi sont un duo d&apos;artistes-performeurs qui se
                  sont rencontrés en 2015 et ont depuis créé un répertoire
                  entier de spectacles au milieu d&apos;une période
                  d&apos;austérité nationale et internationale. Leur travail, à
                  son tour, est dépouillé et minimaliste, tout en traitant
                  d&apos;idées et d&apos;émotions complexes. Leurs spectacles se
                  situent quelque part entre la performance, la danse et le
                  théâtre, mais si vous deviez les coincer là-dessus, ils
                  diraient probablement que c&apos;est du théâtre.
                </p>
                <p className="text-black text-base leading-relaxed">
                  Ensemble, ils ont présenté leurs spectacles sur les scènes
                  internationales du PuSh Festival (Canada), du Festival de
                  Otoño (Espagne), de Sarajevo Mess (Bosnie), de l&apos;Adelaide
                  International Festival (Australie), d&apos;InTeatro (Italie),
                  du Festival d&apos;Avignon (France) ainsi que du MiTsp
                  (Brésil).
                </p>
                <p className="text-black text-base leading-relaxed">
                  En 2020, Bertand et Nasi ont reçu le Forced Entertainment
                  Award à la mémoire de Huw Chadbourn, qui célèbre le travail
                  d&apos;artistes contemporains réinventant le théâtre et la
                  performance de nouvelles manières et pour de nouveaux publics.
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
                <h3 className="text-sm font-mono text-black mb-4">Équipe</h3>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member._id}>
                      <h4 className="font-sans text-black font-normal">
                        {member.name}
                      </h4>
                      <p className="text-black text-xs mt-1">
                        {member.roleFr || member.role}
                      </p>
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
