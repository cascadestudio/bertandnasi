import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://bertandnasi.com"),
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
};

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
