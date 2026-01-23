import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const aboutPageImages = defineType({
  name: "aboutPageImages",
  title: "About Page Images",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Page Images",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Drag and drop to reorder images",
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
        title: "About Page Images",
        subtitle: `${images?.length || 0} image(s)`,
        media: images?.[0],
      };
    },
  },
});
