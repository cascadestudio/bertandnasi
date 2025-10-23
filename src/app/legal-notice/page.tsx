import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal information and notices for Bert & Nasi website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-white px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Publisher Information</h2>
          <p className="mb-2">
            <strong>Name:</strong> Association BERT & NASI
          </p>
          <p className="mb-2">
            <strong>Legal Form:</strong> Registered Association (Association
            déclarée)
          </p>
          <p className="mb-2">
            <strong>Registered Office:</strong> 1435 Chemin du Mont Robert,
            13290 Aix-en-Provence, France
          </p>
          <p className="mb-2">
            <strong>SIRET:</strong> 928 827 005 00010
          </p>
          <p className="mb-2">
            <strong>Publication Director:</strong> Nasi Voutsas
          </p>
          <p className="mb-2">
            <strong>Contact:</strong> bertandnasi@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hosting</h2>
          <p className="mb-2">This website is hosted by:</p>
          <p className="mb-2">
            <strong>Vercel Inc.</strong>
          </p>
          <p className="mb-2">340 S Lemon Ave #4133</p>
          <p className="mb-2">Walnut, CA 91789, United States</p>
          <p className="mb-2">
            <strong>Phone:</strong> +1-888-880-4880
          </p>
          <p className="mb-2">
            <strong>Email:</strong> support@vercel.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-2">
            All content on this website, including but not limited to text,
            images, graphics, and videos, is the property of Association BERT &
            NASI unless otherwise noted. Any reproduction, distribution,
            modification, or unauthorized use of the content is prohibited
            without prior written consent from Association BERT & NASI.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Personal Data Protection
          </h2>
          <p className="mb-2">
            In accordance with the French &quot;Informatique et Libertés&quot;
            law of January 6, 1978 as amended and the General Data Protection
            Regulation (GDPR), you have the right to access, rectify, delete,
            and object to the processing of your personal data.
          </p>
          <p className="mb-2">
            To exercise these rights or for any questions regarding the
            protection of your data, you can contact us at:
            bertandnasi@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
