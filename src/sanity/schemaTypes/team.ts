import { defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const team = defineType({
  name: "team",
  title: "Team Members",
  type: "document",
  icon: UserIcon,
  description:
    "Manage team members that will appear on the About page. Team members are displayed in the order specified by the Display Order field.",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
      description: "The team member's full name.",
    },
    {
      name: "role",
      title: "Role (English)",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
      description: "The team member's role or position.",
    },
    {
      name: "roleFr",
      title: "Role (French)",
      type: "string",
      validation: (Rule) => Rule.max(100),
      description: "The team member's role or position in French.",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which team members appear (lower numbers appear first).",
      initialValue: 0,
    },
  ],

  // Preview configuration
  preview: {
    select: {
      name: "name",
      role: "role",
      order: "order",
    },
    prepare(selection) {
      const { name, role, order } = selection;
      return {
        title: name || "Unnamed team member",
        subtitle: `${role || "No role"}${order !== undefined ? ` • Order: ${order}` : ""}`,
      };
    },
  },

  // Ordering
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "newestFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
