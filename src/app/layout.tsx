import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import LanguageSetter from "@/components/layout/LanguageSetter";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bert&Nasi - Contemporary Performance Duo",
    template: "%s | Bert&Nasi",
  },
  description:
    "Bert and Nasi are a contemporary performance duo creating minimalist shows that blend performance, dance, and theatre.",
  keywords: [
    "contemporary performance",
    "performance art",
    "theatre",
    "dance",
    "Bert and Nasi",
    "live performance",
    "minimalist theatre",
  ],
  authors: [{ name: "Bert&Nasi" }],
  creator: "Bert&Nasi",
  publisher: "Bert&Nasi",
  metadataBase: new URL("https://bertandnasi.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
  openGraph: {
    title: "Bert&Nasi - Contemporary Performance Duo",
    description:
      "Bert and Nasi are a contemporary performance duo creating minimalist shows that blend performance, dance, and theatre.",
    url: "https://bertandnasi.com",
    siteName: "Bert&Nasi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bertandnasi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bert & Nasi - Contemporary Performance Duo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bert&Nasi - Contemporary Performance Duo",
    description:
      "Bert and Nasi are a contemporary performance duo creating minimalist shows that blend performance, dance, and theatre.",
    images: ["https://bertandnasi.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PerformingGroup",
    name: "Bert & Nasi",
    url: "https://bertandnasi.com",
    description:
      "Contemporary performance duo creating minimalist shows that blend performance, dance, and theatre",
    foundingDate: "2015",
    email: "info@bertandnasi.com",
    sameAs: [
      "https://instagram.com/bertandnasi",
      "https://youtube.com/@bertandnasi7388",
    ],
  };

  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${ibmPlexSans.className} antialiased`}>
        <UmamiAnalytics />
        <LanguageSetter />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
