import {
  fetchShowBySlug,
  fetchAllShows,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ShowDetailClient from "./ShowDetailClient";
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
      title: "Show Not Found",
    };
  }

  const imageUrl = show.mainImage
    ? urlFor(show.mainImage).width(1200).height(630).url()
    : "https://bertandnasi.com/og-image.jpg";

  const description =
    show.seo?.metaDescription ||
    `${show.title} - A ${show.year} performance by Bert & Nasi`;

  return {
    title: show.seo?.metaTitle || show.title,
    description: description,
    keywords: show.seo?.keywords || [],
    openGraph: {
      title: show.title,
      description: description,
      url: `https://bertandnasi.com/shows/${slug}`,
      type: "article",
      publishedTime: show._createdAt,
      modifiedTime: show._updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: show.mainImage?.alt || show.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: show.title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function ShowDetailPage({
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

  return <ShowDetailClient show={show} allShows={allShows} />;
}
