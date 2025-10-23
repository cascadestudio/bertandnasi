import { defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const review = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  icon: CommentIcon,
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: "The review quote or text.",
    },
    {
      name: "media",
      title: "Author / Media Source",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
      description: "The name of the publication, media outlet, or author.",
    },
    {
      name: "link",
      title: "Link to Review",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
      description: "Optional: Link to the full review or article.",
    },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description:
        "If checked, this review will appear in the reviews carousel on the homepage.",
      initialValue: false,
    },
  ],

  // Preview configuration
  preview: {
    select: {
      quote: "quote",
      media: "media",
      featured: "featured",
    },
    prepare(selection) {
      const { quote, media, featured } = selection;

      // Truncate quote for preview
      const truncatedQuote =
        quote && quote.length > 60 ? `${quote.substring(0, 60)}...` : quote;

      const subtitle = `${media}${featured ? " • ⭐ Featured" : ""}`;

      return {
        title: truncatedQuote || "No quote",
        subtitle,
      };
    },
  },

  // Ordering
  orderings: [
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    {
      title: "Newest First",
      name: "newestFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Media A-Z",
      name: "mediaAsc",
      by: [{ field: "media", direction: "asc" }],
    },
  ],
});
