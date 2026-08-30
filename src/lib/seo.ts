import type { Metadata } from "next";

/**
 * The canonical origin, stated once.
 *
 * The fallback is the real production domain, not a placeholder and not the
 * retired GitHub Pages URL. `robots.ts` and `sitemap.ts` previously fell back
 * to austinpona.github.io, which is the exact failure that tells Google the
 * site lives somewhere it no longer does.
 *
 * Trailing slashes are stripped because every consumer concatenates a path
 * that already begins with one.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyonicover.co.za").replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** One row per indexable URL. Sitemap, breadcrumbs and navigation all read this. */
export const PAGES = {
  home: { path: "/", label: "Home", changeFrequency: "monthly", priority: 1 },
  cover: { path: "/funeral-cover-limpopo", label: "Funeral cover", changeFrequency: "monthly", priority: 0.9 },
  howItWorks: { path: "/how-it-works", label: "How it works", changeFrequency: "monthly", priority: 0.8 },
  faq: { path: "/faq", label: "FAQ", changeFrequency: "monthly", priority: 0.7 },
  contact: { path: "/contact", label: "Contact", changeFrequency: "yearly", priority: 0.6 },
  terms: { path: "/terms", label: "Membership terms", changeFrequency: "yearly", priority: 0.3 },
  privacy: { path: "/privacy", label: "Privacy notice", changeFrequency: "yearly", priority: 0.3 },
} as const;

export type PageKey = keyof typeof PAGES;

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Set for the 404 and anything else Google must not index. */
  noindex?: boolean;
}

/**
 * Per-page metadata with a self-referential canonical.
 *
 * The canonical is the point of this helper. Without it, www.nyonicover.co.za
 * and nyoni-family-cover.vercel.app are three copies of the same site as far
 * as Google is concerned, and it picks the winner, not us.
 */
export function pageMetadata({ title, description, path, noindex = false }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "en_ZA", siteName: "Nyoni" },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
