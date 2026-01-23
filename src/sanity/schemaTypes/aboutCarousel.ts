import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const aboutCarousel = defineType({
  name: "aboutCarousel",
  title: "About Carousel Images",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Section Carousel",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "images",
      title: "Carousel Images",
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
              description: "Description of the image for accessibility",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one image is required"),
    }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare(selection) {
      const { images } = selection;
      return {
        title: "About Section Carousel",
        subtitle: `${images?.length || 0} image(s)`,
        media: images?.[0],
      };
    },
  },
});
