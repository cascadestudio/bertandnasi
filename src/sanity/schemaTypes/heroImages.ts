import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const heroImages = defineType({
  name: "heroImages",
  title: "Hero Section Images",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Hero Section Images",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Image (Landscape)",
      description: "Image for desktop view - must be landscape format (width > height)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value?.asset?._ref) return "Desktop image is required";

          const client = context.getClient({ apiVersion: "2024-01-01" });
          const asset = await client.fetch(
            `*[_id == $id][0]{ metadata { dimensions } }`,
            { id: value.asset._ref }
          );

          const { width, height } = asset?.metadata?.dimensions || {};

          if (width && height && height >= width) {
            return "Desktop image must be landscape format (width > height)";
          }

          return true;
        }),
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Description of the image for accessibility",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image (Portrait)",
      description: "Image for mobile view - must be portrait format (height > width)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value?.asset?._ref) return "Mobile image is required";

          const client = context.getClient({ apiVersion: "2024-01-01" });
          const asset = await client.fetch(
            `*[_id == $id][0]{ metadata { dimensions } }`,
            { id: value.asset._ref }
          );

          const { width, height } = asset?.metadata?.dimensions || {};

          if (width && height && width >= height) {
            return "Mobile image must be portrait format (height > width)";
          }

          return true;
        }),
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Description of the image for accessibility",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      desktopImage: "desktopImage",
    },
    prepare(selection) {
      return {
        title: "Hero Section Images",
        subtitle: "Desktop & Mobile images",
        media: selection.desktopImage,
      };
    },
  },
});
