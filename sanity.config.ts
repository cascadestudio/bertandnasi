import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Bertandnasi",
  projectId: "xp5syjl9",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Marquee Text")
              .child(
                S.document()
                  .schemaType("marquee")
                  .documentId("marquee-singleton")
                  .title("Marquee Text")
              ),
            S.listItem()
              .title("Page Settings")
              .child(S.documentTypeList("pageSettings").title("Page Settings")),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["marquee", "pageSettings"].includes(listItem.getId()!)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
