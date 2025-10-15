import { defineField, defineType } from "sanity";

export const pageSettings = defineType({
  name: "pageSettings",
  title: "Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Calendar", value: "calendar" },
          { title: "Shows", value: "shows" },
          { title: "Videos", value: "videos" },
          { title: "About", value: "about" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marqueeText",
      title: "Marquee Text",
      type: "string",
      description:
        "Custom marquee text for this page. If empty, will use the global marquee.",
      validation: (Rule) => Rule.max(100),
    }),
  ],
  preview: {
    select: {
      title: "pageName",
      subtitle: "marqueeText",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title
          ? `${title.charAt(0).toUpperCase() + title.slice(1)} Page`
          : "Page Settings",
        subtitle: subtitle || "No marquee text set",
      };
    },
  },
});
