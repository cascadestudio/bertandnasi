import { defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export const pageSettings = defineType({
  name: "pageSettings",
  title: "Marquee Texts",
  type: "document",
  icon: TextIcon,
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
      title: "Marquee Text (English)",
      type: "string",
      description:
        "Custom marquee text for this page. If empty, will show: 'The contemporary performance duo'",
    }),
    defineField({
      name: "marqueeTextFr",
      title: "Marquee Text (French)",
      type: "string",
      description:
        "Custom marquee text for this page in French. If empty, will show: 'Le duo d'artistes-performeurs'",
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
          : "Marquee Text",
        subtitle: subtitle || "Default: The contemporary performance duo",
      };
    },
  },
});
