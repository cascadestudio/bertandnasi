import {
  fetchShowBySlug,
  fetchAllShows,
  fetchTrailerForShow,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ShowDetailClient from "@/app/shows/[slug]/ShowDetailClient";
import { urlFor } from "@/lib/sanityImage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const shows = await fetchAllShows();
  return shows.map((show) => ({
    slug: show.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = await fetchShowBySlug(slug);

  if (!show) {
    return {
      title: "Spectacle introuvable",
    };
  }

  const imageUrl = show.mainImage
    ? urlFor(show.mainImage).width(1200).height(630).url()
    : "https://bertandnasi.com/og-image.jpg";

  const title = show.title;
  const description =
    show.seo?.metaDescription ||
    `${title} - Une performance de ${show.year} par Bert & Nasi`;

  return {
    title: show.seo?.metaTitle || title,
    description: description,
    keywords: show.seo?.keywords || [],
    alternates: {
      canonical: `/fr/shows/${slug}`,
      languages: {
        en: `/shows/${slug}`,
        fr: `/fr/shows/${slug}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://bertandnasi.com/fr/shows/${slug}`,
      type: "article",
      locale: "fr_FR",
      publishedTime: show._createdAt,
      modifiedTime: show._updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: show.mainImage?.alt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function ShowDetailPageFrench({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await fetchShowBySlug(slug);
  const allShows = await fetchAllShows();

  if (!show) {
    notFound();
  }

  // Fetch trailer from videos collection
  const trailer = await fetchTrailerForShow(show._id);

  return <ShowDetailClient show={show} allShows={allShows} trailer={trailer} />;
}
