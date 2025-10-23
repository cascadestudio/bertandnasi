import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { TextIcon } from "@sanity/icons";
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
          .title("Website")
          .items([
            S.listItem()
              .title("Marquee Texts")
              .icon(TextIcon)
              .child(S.documentTypeList("pageSettings").title("Marquee Texts")),
            ...S.documentTypeListItems().filter(
              (listItem) => !["pageSettings"].includes(listItem.getId()!)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
