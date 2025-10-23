import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bert & Nasi - Contemporary Performance Duo",
    short_name: "Bert&Nasi",
    description:
      "Contemporary performance duo creating minimalist shows that blend performance, dance, and theatre",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00ff00",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
