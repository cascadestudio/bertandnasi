import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
  },
  openGraph: {
    title: "Bert&Nasi - Contemporary Performance Duo",
    description:
      "Bert and Nasi are a contemporary performance duo creating minimalist shows that blend performance, dance, and theatre.",
    url: "https://bertandnasi.com",
    siteName: "Bert&Nasi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bert&Nasi - Contemporary Performance Duo",
    description:
      "Bert and Nasi are a contemporary performance duo creating minimalist shows that blend performance, dance, and theatre.",
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className={`${ibmPlexSans.className} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
