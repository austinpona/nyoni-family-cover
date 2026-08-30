import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nyoni Family Cover",
    short_name: "Nyoni",
    description: "Community funeral support for families across Limpopo.",
    start_url: "/",
    display: "standalone",
    background_color: "#181714",
    theme_color: "#181714",
    lang: "en-ZA",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
