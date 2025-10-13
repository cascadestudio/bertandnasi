import { defineField, defineType } from "sanity";

export const marquee = defineType({
  name: "marquee",
  title: "Marquee Text",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Marquee Text",
      type: "string",
      description: "The text that will scroll in the marquee",
      validation: (Rule) => Rule.required().max(100),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || "Untitled Marquee Text",
        subtitle: "Site-wide marquee text",
      };
    },
  },
});
