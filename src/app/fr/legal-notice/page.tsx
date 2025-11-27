import type { Metadata } from "next";
import Marquee from "@/components/home/Marquee";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales et informations sur l'éditeur du site Bert & Nasi.",
  alternates: {
    canonical: "/fr/legal-notice",
    languages: {
      en: "/legal-notice",
      fr: "/fr/legal-notice",
    },
  },
};

export default function LegalNoticePageFrench() {
  return (
    <div>
      <Marquee
        pageName="legal-notice"
        customText="Mentions légales"
        sticky={true}
        hidden={false}
      />
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-5 py-16">
          <h1 className="text-4xl font-bold mb-8">Mentions légales</h1>

          <section className="space-y-6 text-base leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
              <p>
                <strong>Nom :</strong> Bert&Nasi
                <br />
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:info@bertandnasi.com"
                  className="text-[var(--color-green)] hover:underline"
                >
                  info@bertandnasi.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789
                <br />
                États-Unis
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble de ce site relève de la législation française et
                internationale sur le droit d&apos;auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Crédits</h2>
              <p>
                <strong>Conception et développement du site :</strong>{" "}
                <a
                  href="https://cascadestudio.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-green)] hover:underline"
                >
                  Cascade Studio
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Protection des données personnelles
              </h2>
              <p>
                Ce site ne collecte aucune donnée personnelle des visiteurs.
                Aucun cookie n&apos;est utilisé pour le suivi ou l&apos;analyse.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
