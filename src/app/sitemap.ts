import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://austinpona.github.io/nyoni-family-cover"; return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/terms`, changeFrequency: "yearly", priority: .3 }, { url: `${base}/privacy`, changeFrequency: "yearly", priority: .3 }]; }
