import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xp5syjl9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
