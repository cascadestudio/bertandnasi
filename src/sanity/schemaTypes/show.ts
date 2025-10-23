import { defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const show = defineType({
  name: "show",
  title: "Shows",
  type: "document",
  icon: DocumentIcon,
  fields: [
    // Basic Information
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(new Date().getFullYear() + 5),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // Credits
    {
      name: "credits",
      title: "Credits",
      type: "array",
      description:
        'Each credit will display as "Role → Name" (e.g., "Director → John Smith").',
      of: [
        {
          type: "object",
          fields: [
            {
              name: "role",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "role",
              subtitle: "name",
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: `${title} - ${subtitle}`,
              };
            },
          },
        },
      ],
    },
    {
      name: "trailer",
      title: "YouTube Video URL",
      type: "url",
      description: "Paste the YouTube video URL",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
    {
      name: "collaborators",
      title: "Collaborators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
            },
          },
        },
      ],
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },

    // Reviews (now references to review documents)
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "review" }],
        },
      ],
      description:
        "Add reviews for this show by selecting from the Reviews collection. Reviews will automatically be linked to this show.",
    },

    // SEO and Metadata
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
          description:
            'The title that appears in search results and browser tabs. Keep it under 60 characters. Include the show name and year. Example: "Hamlet: A Modern Retelling (2024)"',
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.max(160),
          description:
            'A brief summary that appears in search results. Write 150-160 characters. Hook readers with what makes this production unique. Example: "A haunting reimagining of Shakespeare\'s classic, set in modern corporate boardrooms. Directed by [Name]."',
        },
      ],
    },
  ],

  // Preview configuration
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? `${subtitle}` : "No year set",
        media,
      };
    },
  },

  // Ordering
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Year, Oldest First",
      name: "yearAsc",
      by: [{ field: "year", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
