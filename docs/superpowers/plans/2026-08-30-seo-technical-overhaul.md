# Nyoni SEO & Technical Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn nyonicover.co.za from three indexable URLs with no canonical tags, three live duplicate hosts and a default 404 into eight properly-canonicalised pages with per-page metadata, structured data, real favicons, a correct Open Graph image and a smaller JavaScript bundle.

**Architecture:** Keep `/` as the full single-page scroll — it is what converts and what Google has already indexed. Add four real pages that mount the *existing* section components underneath a page-specific `<h1>` and unique lede copy, so nothing is duplicated in source. All URL and metadata construction moves behind one module (`src/lib/seo.ts`) so the canonical host is stated once. All JSON-LD moves behind one module (`src/lib/schema.ts`). Host-level duplication (www, `*.vercel.app`) is solved in `next.config.ts` rather than the Vercel dashboard, so it is version-controlled.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS 4, framer-motion 12.42.2, lucide-react, sharp 0.34.5 (already present as a Next transitive dependency, used offline for asset generation only).

## Global Constraints

Every task's requirements implicitly include this section. Several of these are not style preferences; they are the difference between an honest funeral product and a fraudulent one.

**Truth constraints — copied from `TRUST-TODO.md` and `src/lib/site-data.ts`:**

- **Nothing may be invented, estimated or rounded up.** If a fact is not already in `src/lib/site-data.ts`, `TRUST-TODO.md`, `src/app/terms/page.tsx` or `src/app/privacy/page.tsx`, it does not go on the site. New *pages* are allowed; new *claims* are not. Re-framing an existing verified fact in new words is allowed.
- **Registration is not approval.** Never write, or let schema.org markup imply, that Nyoni is insurance, underwritten, approved, guaranteed or regulated. Do not use `@type: "InsuranceAgency"` or `"FinancialService"` — use `LocalBusiness`.
- **Austin Pona is the `manager`.** Never "founder", "owner", "director", "CEO". Those belong to Humphrey Kurisani Mandlazi, the sole CIPC director.
- **Never imply arrears or a balance owed.** Business rule A4b: Nyoni tracks no arrears. "Outstanding", "settle your account", "catch up payments" are forbidden.
- **`areaServed` is Limpopo, not South Africa.** Never widen it.
- **No street address anywhere**, including in JSON-LD. The registered office is a private home. `PostalAddress` may carry `addressLocality: "Phalaborwa"`, `addressRegion: "Limpopo"`, `addressCountry: "ZA"` and nothing more.
- **Business hours are not known.** Do not invent `openingHours` in JSON-LD or on the contact page. Flag to Austin instead.

**Technical constraints:**

- Canonical host is exactly `https://nyonicover.co.za` — apex, https, **no** `www`, **no** trailing slash.
- Every page has exactly one `<h1>`, a unique `<title>`, a unique meta description of 120–160 characters, and a self-referential `<link rel="canonical">`.
- The 404 page and any `*.vercel.app` host must be `noindex`.
- Do not weaken the CSP in `next.config.ts`. Inline `<script type="application/ld+json">` is already permitted by `script-src 'unsafe-inline'`; no CSP change is needed for structured data.
- No new runtime npm dependencies. `sharp` is used only in a throwaway generation script, never imported by application code.

**Commands (measured costs on this machine — do not re-derive):**

```bash
npm run typecheck                                                    # ~27 s
npm run lint -- --cache --cache-location node_modules/.cache/eslint/ # ~11 s warm, ~154 s cold
npm run build                                                        # slow; never run alongside a browser
```

Never run a build and a headless browser at the same time — this machine has ~1 GB free RAM.

**Git:** Work on branch `seo-overhaul`, cut from `main`. There are already uncommitted changes on `main` (see Task 0) — they must be carried across, not lost. **Do not push and do not merge without Austin's approval.**

---

### Task 0: Branch, and take the baseline measurement

Nothing is optimised before it is measured, and nothing is restructured before the existing work is safe.

**Files:**
- Create: `docs/superpowers/plans/baseline.txt` (scratch record, deleted in Task 12)

- [ ] **Step 1: Confirm what is uncommitted and carry it onto a branch**

```bash
git status --short
git checkout -b seo-overhaul
git status --short   # the same list must still be present
```

Expected: `README.md`, `TRUST-TODO.md`, `src/app/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/components/faq.tsx`, `src/components/footer.tsx`, `src/components/navigation.tsx`, `src/lib/site-data.ts` still modified; `assets/photographs/`, `nyoni new poster/`, `public/images/nyoni-cattle-limpopo.webp`, `src/components/who-we-are.tsx` still untracked. A branch checkout carries working-tree changes; if any are missing, **stop** and tell Austin.

- [ ] **Step 2: Commit the existing work first, so the SEO diff is readable**

```bash
git add -A
git commit -m "Carry in the who-we-are section and trust copy before the SEO work"
```

- [ ] **Step 3: Record the baseline bundle sizes**

```bash
npm run build 2>&1 | tee docs/superpowers/plans/baseline.txt
```

Expected: a "Route (app)" table. Record the **First Load JS shared by all** figure and the per-route First Load JS for `/`. These are the numbers Task 11 must beat. If the build fails, fix that before going further — every later task depends on a green build.

- [ ] **Step 4: Commit the baseline**

```bash
git add docs/superpowers/plans/
git commit -m "Record pre-overhaul bundle baseline"
```

---

### Task 1: One module that owns the canonical URL

Today the production URL is written in five places and two of them still say `austinpona.github.io`. That is the most damaging class of SEO bug there is, and it must become impossible rather than merely fixed.

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

**Interfaces:**
- Produces: `SITE_URL: string`, `absoluteUrl(path: string): string`, `pageMetadata(input: PageMeta): Metadata`, and the `PAGES` route table used by Tasks 6, 7, 8 and 9.

- [ ] **Step 1: Create `src/lib/seo.ts`**

```ts
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
```

- [ ] **Step 2: Replace the URL handling in `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

- [ ] **Step 3: Replace `src/app/sitemap.ts` so it is generated from `PAGES`**

```ts
import type { MetadataRoute } from "next";
import { PAGES, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(PAGES).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
```

- [ ] **Step 4: Fix the root metadata in `src/app/layout.tsx`**

Replace the `metadata` export with the block below. Three changes matter: `metadataBase` now comes from `SITE_URL`; a root `alternates.canonical` is added so any page that forgets one still resolves; and the Open Graph image is dropped here so the `opengraph-image.png` file convention from Task 4 can supply a correctly-sized one. The current image is the 1100×1430 portrait logo, which every social platform crops into an unrecognisable strip.

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nyoni Family Cover | Funeral Support in Limpopo",
    template: "%s | Nyoni",
  },
  description:
    "Community funeral support in Limpopo from R100 a month. One cow, 100kg of maize meal, firewood and a bakkie for the day, after six paid months.",
  applicationName: "Nyoni",
  alternates: { canonical: SITE_URL },
  keywords: [
    "funeral cover Limpopo",
    "affordable funeral support South Africa",
    "community funeral membership",
    "Nyoni family cover",
    "Phalaborwa funeral support",
  ],
  openGraph: {
    title: "Nyoni Family Cover | Funeral Support in Limpopo",
    description: "Practical, affordable community funeral support for families across Limpopo.",
    url: SITE_URL,
    siteName: "Nyoni",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyoni Family Cover | Funeral Support in Limpopo",
    description: "Practical, affordable community funeral support for families across Limpopo.",
  },
  robots: { index: true, follow: true },
};
```

Add `import { SITE_URL } from "@/lib/seo";`. **Delete the `icons:` key entirely** — it currently forces `/logo.svg` and would override the real icon files Task 4 adds through the App Router file convention. **Delete the explicit `openGraph.images` and `twitter.images` arrays** for the same reason.

- [ ] **Step 5: Add per-page metadata to the two existing subpages**

In `src/app/privacy/page.tsx`, replace `export const metadata = { title: "Privacy Notice" };` with:

```ts
export const metadata = pageMetadata({
  title: "Privacy Notice",
  description:
    "What personal information Nyoni collects when you apply, why each item is needed, who it is shared with, and the POPIA rights you have over it.",
  path: PAGES.privacy.path,
});
```

In `src/app/terms/page.tsx`, replace `export const metadata = { title: "Membership Terms" };` with:

```ts
export const metadata = pageMetadata({
  title: "Membership Terms",
  description:
    "The decided conditions of Nyoni membership: what you pay, the six-month waiting period, what lapsing means, and how qualifying claims are verified.",
  path: PAGES.terms.path,
});
```

Add `import { PAGES, pageMetadata } from "@/lib/seo";` to both files.

- [ ] **Step 6: Verify**

```bash
npm run typecheck && npm run build
cat .next/server/app/sitemap.xml.body
cat .next/server/app/robots.txt.body
grep -rn "github.io" src/ && echo "FAIL: stale host still referenced" || echo "OK: no stale host"
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo.ts src/app/layout.tsx src/app/robots.ts src/app/sitemap.ts src/app/privacy/page.tsx src/app/terms/page.tsx
git commit -m "State the canonical URL once, and give every page a canonical tag"
```

---

### Task 2: Close the duplicate hosts and stop shipping source maps

`www.nyonicover.co.za` and `nyoni-family-cover.vercel.app` both answer 200 with no redirect. Google is looking at three identical sites and choosing which to rank. Canonical tags from Task 1 help; a 301 and a `noindex` header settle it.

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add the source-map setting, the www redirect and the preview-host noindex header**

Insert above the `const nextConfig` declaration:

```ts
/**
 * The apex host, derived from the same env var the canonical tags use, so the
 * redirect can never disagree with the canonical.
 */
const canonicalHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyonicover.co.za").host;
```

Add these keys to `nextConfig`, alongside the existing `images` and `headers`:

```ts
  // Source maps are not emitted for production browser bundles by default in
  // Next 16; stated explicitly so an upstream default change cannot silently
  // start publishing this site's source to anyone who opens devtools.
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      {
        // www -> apex, permanent. Done here rather than in the Vercel
        // dashboard so it lives in version control and survives a re-import.
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
    ];
  },
```

Extend the existing `headers()` return array with a second entry, **after** the existing `/:path*` entry:

```ts
      {
        // Vercel preview deployments are a third copy of the site. Tell
        // crawlers to ignore them; the apex is the only indexable host.
        source: "/:path*",
        has: [{ type: "host", value: "(?<preview>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
```

- [ ] **Step 2: Verify the redirect and header reach the build manifest**

```bash
npm run build
node -e "const m=require('./.next/routes-manifest.json');console.log(JSON.stringify({redirects:m.redirects,headerGroups:m.headers.length},null,2))" | head -40
```

Expected: a redirect entry with statusCode 308 (Next's `permanent: true`) whose `has` clause matches `www.nyonicover.co.za`, and two header groups.

- [ ] **Step 3: Confirm no browser source maps are emitted**

```bash
find .next/static -name "*.js.map" | head
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "Redirect www to the apex, noindex preview hosts, pin source maps off"
```

---

### Task 3: A custom 404 that sends people somewhere useful

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create the page**

It must be a real page in the site's identity, must be `noindex`, and must link to the routes a lost visitor most likely wanted. Do not use `<Navigation />` — it is a client component built around homepage anchors and would render dead links here.

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { PAGES, pageMetadata } from "@/lib/seo";
import { PHONE_DISPLAY } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata({
  title: "Page Not Found",
  description:
    "That page does not exist on the Nyoni site. Here is where to find membership options, how it works, answers to common questions and how to reach us.",
  path: "/404",
  noindex: true,
});

const destinations = [PAGES.home, PAGES.cover, PAGES.howItWorks, PAGES.faq, PAGES.contact] as const;

export default function NotFound() {
  return (
    <>
      <main className="paper-grain flex min-h-[70vh] flex-col justify-center bg-cream py-20">
        <div className="container-shell">
          <Link href="/" aria-label="Nyoni home" className="focus-ring inline-block"><Logo compact /></Link>
          <p className="eyebrow mt-12 text-gold">Error 404</p>
          <h1 className="display-title mt-4 max-w-3xl text-5xl sm:text-7xl">
            That page is not <span className="serif-accent text-gold">here.</span>
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            The address you followed does not exist on this site. Nothing has gone wrong with your
            membership. Here is everything on nyonicover.co.za.
          </p>
          <nav aria-label="Site pages" className="mt-10 max-w-xl border-t border-charcoal/20">
            {destinations.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="focus-ring flex items-center justify-between border-b border-charcoal/15 py-5 font-display text-2xl uppercase transition-colors hover:text-gold"
              >
                {page.label}
                <span aria-hidden="true" className="text-gold">&rarr;</span>
              </Link>
            ))}
          </nav>
          <p className="mt-8 text-sm leading-6 text-muted">
            Or call Nyoni on{" "}
            <a href="tel:+27636021868" className="font-semibold text-charcoal underline underline-offset-4 hover:text-gold">
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify it renders and still returns HTTP 404**

```bash
npm run build && npm run start &
sleep 8
curl -s -o /dev/null -w "status=%{http_code}\n" http://localhost:3000/no-such-page
curl -s http://localhost:3000/no-such-page | grep -o '<h1\|noindex' | head
```

Expected: `status=404`, one `<h1>`, and `noindex` present. Kill the server afterwards.

- [ ] **Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "Add a custom 404 that lists every page and the phone number"
```

---

### Task 4: Real favicons, a web manifest, and a correctly-sized Open Graph image

The tab currently loads `/logo.svg`. The social image is a 1100×1430 portrait, which is the wrong aspect ratio for every platform that consumes it.

**Files:**
- Create: `scripts/generate-brand-assets.mjs`
- Create (generated): `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`, `public/icons/icon-192.png`, `public/icons/icon-512.png`
- Create: `src/app/manifest.ts`
- Keep: `src/app/favicon.ico` (already present and correctly located)

- [ ] **Step 1: Write the generation script**

`sharp` is present at 0.34.5 as a Next transitive dependency. This script runs once, by hand, and is committed for reproducibility. It is never imported by the app, so it adds nothing to the bundle.

```js
// scripts/generate-brand-assets.mjs
// Run: node scripts/generate-brand-assets.mjs
// Regenerates every icon and the Open Graph card from the single source logo.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "public/images/nyoni-logo.png";
const DEEP_BLACK = "#181714";

await mkdir("public/icons", { recursive: true });

// The source logo is portrait (1100x1430), so it is contained on the brand
// background rather than cropped, which would cut the cow's head off.
const square = async (size, out) => {
  const inner = Math.round(size * 0.84);
  const logo = await sharp(SOURCE).resize(inner, inner, { fit: "inside" }).png().toBuffer();
  const meta = await sharp(logo).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: DEEP_BLACK } })
    .composite([{
      input: logo,
      top: Math.round((size - meta.height) / 2),
      left: Math.round((size - meta.width) / 2),
    }])
    .png()
    .toFile(out);
};

await square(32, "src/app/icon.png");
await square(180, "src/app/apple-icon.png");
await square(192, "public/icons/icon-192.png");
await square(512, "public/icons/icon-512.png");

// Open Graph: 1200x630 is the size every platform actually crops to.
const ogLogo = await sharp(SOURCE).resize({ height: 430, fit: "inside" }).png().toBuffer();
const ogMeta = await sharp(ogLogo).metadata();

await sharp({ create: { width: 1200, height: 630, channels: 4, background: DEEP_BLACK } })
  .composite([{ input: ogLogo, top: 100, left: Math.round((1200 - ogMeta.width) / 2) }])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log("Generated icons and opengraph-image.png");
```

- [ ] **Step 2: Run it and verify the dimensions**

```bash
node scripts/generate-brand-assets.mjs
node -e "const s=require('sharp');for (const f of ['src/app/icon.png','src/app/apple-icon.png','src/app/opengraph-image.png','public/icons/icon-192.png','public/icons/icon-512.png']) s(f).metadata().then(m=>console.log(f, m.width+'x'+m.height))"
```

Expected: `32x32`, `180x180`, `1200x630`, `192x192`, `512x512`.

- [ ] **Step 3: Open `src/app/opengraph-image.png` and look at it.** If the logo is clipped, off-centre or illegible on the dark ground, fix the script rather than shipping it. This image is the site's handshake in every WhatsApp forward, and WhatsApp forwarding is how this business actually spreads.

- [ ] **Step 4: Add the web manifest at `src/app/manifest.ts`**

```ts
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
```

- [ ] **Step 5: Verify the icon and OG tags reach the HTML**

```bash
npm run build && npm run start &
sleep 8
curl -s http://localhost:3000/ | grep -o '<link rel="icon"[^>]*>\|<link rel="apple-touch-icon"[^>]*>\|<link rel="manifest"[^>]*>\|<meta property="og:image[^>]*>' | head
```

Expected: an `icon` link to a hashed `/icon.png` route, an `apple-touch-icon`, a `manifest` link, and `og:image` plus `og:image:width` 1200 / `og:image:height` 630. Kill the server.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-brand-assets.mjs src/app/icon.png src/app/apple-icon.png src/app/opengraph-image.png src/app/manifest.ts public/icons/
git commit -m "Generate real favicons, a manifest and a 1200x630 Open Graph card"
```

---

### Task 5: Structured data and breadcrumbs behind one module

**Files:**
- Create: `src/lib/schema.ts`, `src/components/json-ld.tsx`, `src/components/breadcrumbs.tsx`
- Modify: `src/app/page.tsx` (move the inline `businessSchema` out)

**Interfaces:**
- Produces: `organizationSchema`, `websiteSchema`, `breadcrumbSchema(trail)`, `faqSchema(entries)`, `Crumb`, `<JsonLd data={…} />`, `<Breadcrumbs trail={…} />`. Tasks 6 and 7 consume all of them.

- [ ] **Step 1: Create `src/lib/schema.ts`**

Every value below already exists on the site. Note what is deliberately absent: no `streetAddress` (private home), no `openingHours` (not known), no `priceRange` guess, no `aggregateRating` (there are no reviews and inventing one is fraud), and `LocalBusiness` rather than `InsuranceAgency` because Nyoni is not insurance.

```ts
import { SITE_URL, absoluteUrl } from "./seo";
import { company } from "./site-data";

const ORG_ID = `${SITE_URL}/#organisation`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": ORG_ID,
  name: "Nyoni",
  legalName: company.registeredName,
  identifier: company.registrationNumber,
  description:
    "Community funeral-support membership providing practical support to families during difficult times.",
  slogan: "We Are Family",
  telephone: "+27636021868",
  url: SITE_URL,
  logo: absoluteUrl("/images/nyoni-logo.png"),
  image: absoluteUrl("/opengraph-image.png"),
  // Limpopo, never South Africa. Over-claiming coverage is a promise that
  // would be broken on the worst possible day.
  areaServed: { "@type": "AdministrativeArea", name: "Limpopo, South Africa" },
  // Street address is omitted on purpose: the registered office is a private home.
  address: {
    "@type": "PostalAddress",
    addressLocality: company.town,
    addressRegion: company.province,
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27636021868",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: ["en"],
  },
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nyoni Family Cover",
  inLanguage: "en-ZA",
  publisher: { "@id": ORG_ID },
} as const;

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(trail: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(entries: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
```

- [ ] **Step 2: Create `src/components/json-ld.tsx`**

```tsx
/**
 * JSON-LD is injected as an inline script. The existing CSP already allows
 * 'unsafe-inline' for script-src, so no CSP change is needed — and none should
 * be made. The payload is built from constants in this repo, never from user
 * input, so there is nothing here for an injection to ride in on.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

- [ ] **Step 3: Create `src/components/breadcrumbs.tsx`**

A visible breadcrumb and its matching JSON-LD, emitted together so they can never disagree.

```tsx
import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className="text-[.7rem] font-semibold uppercase tracking-[.12em] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-charcoal">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path} className="focus-ring transition-colors hover:text-gold">{crumb.name}</Link>
                )}
                {!last && <span aria-hidden="true" className="text-gold">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
```

- [ ] **Step 4: Move the inline schema out of `src/app/page.tsx`**

Delete the `businessSchema` const and its `<script …>` line. Add as the first children of the fragment:

```tsx
<JsonLd data={organizationSchema} />
<JsonLd data={websiteSchema} />
```

Add `import { JsonLd } from "@/components/json-ld";` and `import { organizationSchema, websiteSchema } from "@/lib/schema";`. Remove the now-unused `import { company } from "@/lib/site-data";`.

- [ ] **Step 5: Verify the JSON-LD parses and says the right things**

```bash
npm run typecheck && npm run build && npm run start &
sleep 8
curl -s http://localhost:3000/ | grep -o '<script type="application/ld+json">[^<]*'
```

**Read the output.** Confirm: `@type` is `LocalBusiness`, `areaServed` says Limpopo, there is no `streetAddress`, no `openingHours`, no `aggregateRating`, and nothing anywhere says insurance, underwritten or approved. Kill the server.

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema.ts src/components/json-ld.tsx src/components/breadcrumbs.tsx src/app/page.tsx
git commit -m "Move structured data into one module and add breadcrumb markup"
```

---

### Task 6: A page header for subpages

Every existing section component leads with an `<h2>`. Subpages need exactly one `<h1>` above them, plus lede copy genuinely different from the homepage so the page is worth indexing rather than a near-duplicate.

**Files:**
- Create: `src/components/page-header.tsx`

**Interfaces:**
- Consumes: `Breadcrumbs`, `Crumb` from Task 5.
- Produces: `<PageHeader eyebrow title accent lede trail />`, used by all four pages in Task 7.

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import type { Crumb } from "@/lib/schema";

/**
 * The one h1 on a subpage. Sections mounted below this all lead with h2, so
 * the document outline stays correct without touching those components.
 *
 * The top padding clears the fixed header: 72px on mobile, 104px once the
 * charcoal contact bar appears at the sm breakpoint.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  trail,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: ReactNode;
  trail: readonly Crumb[];
}) {
  return (
    <section className="paper-grain bg-cream pt-[72px] sm:pt-[104px]">
      <div className="container-shell pb-14 pt-10 sm:pb-16">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow mt-8 text-gold">{eyebrow}</p>
        <h1 className="display-title mt-4 max-w-4xl text-5xl sm:text-7xl">
          {title}
          {accent && <span className="serif-accent text-gold"> {accent}</span>}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-8 text-muted">{lede}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/page-header.tsx
git commit -m "Add the subpage header that carries the single h1 and breadcrumb"
```

---

### Task 7: The four new pages

Each page mounts existing section components under its own `<h1>`. **The lede copy below restates facts already on the site in page-specific words — it introduces no new claim.** Check each sentence against the Global Constraints before writing it.

**Files:**
- Create: `src/app/funeral-cover-limpopo/page.tsx`, `src/app/how-it-works/page.tsx`, `src/app/faq/page.tsx`, `src/app/contact/page.tsx`
- Modify: `src/components/faq.tsx` (export the `faqs` array so the FAQ page can build `FAQPage` JSON-LD from the same source)

**Interfaces:**
- Consumes: `PageHeader` (Task 6), `pageMetadata`/`PAGES` (Task 1), `JsonLd`/`faqSchema`/`organizationSchema` (Task 5), and the existing `Benefits`, `Packages`, `WaitingPeriod`, `Conditions`, `HowItWorks`, `Faq`, `Contact`, `WhoWeAre`, `Navigation`, `Footer`, `WhatsAppFloat` components.

- [ ] **Step 1: Export the FAQ data from `src/components/faq.tsx`**

Change `const faqs = [` to `export const faqs = [`. Nothing else in that file changes.

- [ ] **Step 2: Create `src/app/funeral-cover-limpopo/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { PageHeader } from "@/components/page-header";
import { Packages } from "@/components/packages";
import { WaitingPeriod } from "@/components/waiting-period";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { organizationSchema } from "@/lib/schema";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Funeral Cover in Limpopo from R100 a Month",
  description:
    "Nyoni membership options for 2 to 8 family members, R100 to R300 a month. See exactly what arrives when a death is verified, and what the add-ons cost.",
  path: PAGES.cover.path,
});

export default function FuneralCoverPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Navigation />
      <main id="main-content">
        <PageHeader
          trail={[{ name: "Home", path: "/" }, { name: "Funeral cover", path: PAGES.cover.path }]}
          eyebrow="Membership options"
          title="Funeral cover in Limpopo,"
          accent="from R100 a month."
          lede={
            <>
              <p>
                Nyoni covers between two and eight people on one membership, at R100 to R300 a month.
                Every option includes the same basic benefits, so the only thing the price changes is
                how many people are registered.
              </p>
              <p className="mt-4">
                A six-month waiting period applies to every membership, and it is counted in months
                actually paid rather than months on the calendar.
              </p>
            </>
          }
        />
        <Packages />
        <Benefits />
        <WaitingPeriod />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 3: Create `src/app/how-it-works/page.tsx`**

Same file shape as Step 2. Imports: `Conditions`, `Footer`, `HowItWorks`, `JsonLd`, `Navigation`, `PageHeader`, `WaitingPeriod`, `WhatsAppFloat`, `organizationSchema`, `PAGES`, `pageMetadata`.

```ts
export const metadata: Metadata = pageMetadata({
  title: "How Nyoni Membership Works",
  description:
    "Choose your family size, apply, keep six months paid, then claim. Every stage of Nyoni membership, and the conditions that apply to each one.",
  path: PAGES.howItWorks.path,
});
```

```tsx
        <PageHeader
          trail={[{ name: "Home", path: "/" }, { name: "How it works", path: PAGES.howItWorks.path }]}
          eyebrow="The journey"
          title="How Nyoni membership"
          accent="actually works."
          lede={
            <>
              <p>
                Four stages: choose how many people to register, apply, keep the monthly payments up
                to date, and claim once the waiting period is behind you.
              </p>
              <p className="mt-4">
                A missed month pauses your count rather than resetting it, and you never lose months
                you have already paid. Nyoni is not a lender — if you stop paying, you owe Nyoni
                nothing.
              </p>
            </>
          }
        />
```

Sections below the header, in this order: `<HowItWorks />`, `<WaitingPeriod />`, `<Conditions />`.

- [ ] **Step 4: Create `src/app/faq/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Faq, faqs } from "@/components/faq";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { PageHeader } from "@/components/page-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { faqSchema, organizationSchema } from "@/lib/schema";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Questions Families Ask",
  description:
    "Straight answers on the six-month waiting period, missed payments, who can be covered, how claims are verified, and when Nyoni benefits are delivered.",
  path: PAGES.faq.path,
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      {/* Built from the same array the page renders, so the markup and the
          visible answers can never drift apart. */}
      <JsonLd data={faqSchema(faqs)} />
      <Navigation />
      <main id="main-content">
        <PageHeader
          trail={[{ name: "Home", path: "/" }, { name: "FAQ", path: PAGES.faq.path }]}
          eyebrow="Straight answers"
          title="The questions families"
          accent="actually ask."
          lede={
            <p>
              The waiting period, missed payments, who can be included, and how a claim is verified.
              If your question is not here, call or WhatsApp Nyoni and ask it directly.
            </p>
          }
        />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 5: Create `src/app/contact/page.tsx`**

Same shape. Imports add `Contact` and `WhoWeAre`.

```ts
export const metadata: Metadata = pageMetadata({
  title: "Contact Nyoni",
  description:
    "Call or WhatsApp Nyoni on 063 602 1868 for membership, add-ons, applications or claims. Run from Phalaborwa and serving families across Limpopo.",
  path: PAGES.contact.path,
});
```

```tsx
        <PageHeader
          trail={[{ name: "Home", path: "/" }, { name: "Contact", path: PAGES.contact.path }]}
          eyebrow="Talk to a person"
          title="Contact Nyoni"
          accent="directly."
          lede={
            <p>
              Nyoni is run by Austin Pona, manager, from Phalaborwa in Limpopo. When you call the
              number on this page, that is who answers.
            </p>
          }
        />
```

Sections below: `<Contact />`, then `<WhoWeAre />`.

- [ ] **Step 6: Verify every page has one h1, a unique title, a unique description and a self-referential canonical**

```bash
npm run typecheck && npm run build && npm run start &
sleep 10
for p in / /funeral-cover-limpopo /how-it-works /faq /contact /privacy /terms; do
  html=$(curl -s "http://localhost:3000$p")
  echo "-- $p"
  echo "   h1 count: $(echo "$html" | grep -o '<h1' | wc -l)"
  echo "   $(echo "$html" | grep -o '<title>[^<]*</title>')"
  echo "   $(echo "$html" | grep -o '<link rel="canonical"[^>]*>')"
  echo "   desc len: $(echo "$html" | grep -o '<meta name="description" content="[^"]*"' | sed 's/.*content="//;s/"$//' | wc -c)"
done
```

Expected for every row: `h1 count: 1`, a distinct `<title>`, a canonical matching that exact path on the apex domain, and `desc len` between 120 and 165. Any failing row is a defect to fix now, not later. Kill the server.

- [ ] **Step 7: Commit**

```bash
git add src/app/funeral-cover-limpopo src/app/how-it-works src/app/faq src/app/contact src/components/faq.tsx
git commit -m "Add four real pages, each with its own h1, metadata and canonical"
```

---

### Task 8: Internal linking

Navigation and footer are entirely `#anchors` today, so the four new pages have no inbound links and Google will never find them from the homepage. Anchors must keep working on `/` and become real links everywhere else.

**Files:**
- Modify: `src/components/navigation.tsx`, `src/components/footer.tsx`

- [ ] **Step 1: Point the navigation at real routes**

Replace the `links` const in `src/components/navigation.tsx`:

```tsx
const links = [
  ["Funeral cover", PAGES.cover.path],
  ["How it works", PAGES.howItWorks.path],
  ["Who we are", "/#who-we-are"],
  ["FAQ", PAGES.faq.path],
  ["Contact", PAGES.contact.path],
] as const;
```

Add `import Link from "next/link";` and `import { PAGES } from "@/lib/seo";`. Change both `.map(…)` bodies to render `<Link href={href} …>` instead of `<a href={href} …>`, keeping every existing class name and the mobile menu's `onClick={() => setOpen(false)}`. Change the logo's `<a href="#home">` to `<Link href="/">`, and both "Join Nyoni" buttons from `href="#join"` to `href="/#join"` so they work from any page.

- [ ] **Step 2: Point the footer at real routes**

The footer is now the site's index, and Google follows it. Replace the `links` const in `src/components/footer.tsx`:

```tsx
const links = [
  ["Home", "/"],
  ["Funeral cover", PAGES.cover.path],
  ["How it works", PAGES.howItWorks.path],
  ["FAQ", PAGES.faq.path],
  ["Contact", PAGES.contact.path],
  ["Who we are", "/#who-we-are"],
  ["Membership terms", PAGES.terms.path],
  ["Privacy notice", PAGES.privacy.path],
] as const;
```

Add the same two imports, render with `<Link>`, and remove the now-duplicated `Terms` / `Privacy` pair from the contact column so each page is linked once from the footer.

- [ ] **Step 3: Verify every internal link resolves**

```bash
npm run build && npm run start &
sleep 10
curl -s http://localhost:3000/ | grep -o 'href="/[^"#][^"]*"' | sort -u | sed 's/href="//;s/"//' | while read -r p; do
  printf "%-32s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$p")"
done
```

Expected: every path returns `200`. Any `404` is a broken internal link. Kill the server.

- [ ] **Step 4: Commit**

```bash
git add src/components/navigation.tsx src/components/footer.tsx
git commit -m "Link the new pages from the navigation and footer"
```

---

### Task 9: llms.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Write it**

`llms.txt` is a plain-text map of the site for language models. It must contain only facts already published on the site. The registration caveat is included deliberately: a model summarising this business must not tell someone it is approved insurance.

```text
# Nyoni Family Cover

> Community funeral-support membership for families across Limpopo, South
> Africa. Members pay monthly. After six paid months and Department of Home
> Affairs verification, a qualifying family receives one cow, two 50kg bags of
> maize meal, a full load of firewood and a one-day bakkie service.

Nyoni Community Cover (Pty) Ltd, registration 2026/657999/07. Run by Austin
Pona, manager, from Phalaborwa, Limpopo. Contact: 063 602 1868 (call or
WhatsApp).

Important: company registration means Nyoni legally exists and can be looked
up. It does not mean the product is approved, underwritten, guaranteed or
insured by anyone. Nyoni serves Limpopo only and does not claim national cover.

## Pages

- [Home](https://nyonicover.co.za/): what Nyoni is, what arrives, and the application form.
- [Funeral cover in Limpopo](https://nyonicover.co.za/funeral-cover-limpopo): membership options for 2 to 8 people, R100 to R300 a month, plus the two R70 add-ons.
- [How it works](https://nyonicover.co.za/how-it-works): the four stages from joining to claiming, the six-month waiting period, and the conditions.
- [Questions families ask](https://nyonicover.co.za/faq): waiting period, missed payments, eligibility, claims and delivery.
- [Contact](https://nyonicover.co.za/contact): phone, WhatsApp, and who runs Nyoni.
- [Membership terms](https://nyonicover.co.za/terms): the decided conditions of membership.
- [Privacy notice](https://nyonicover.co.za/privacy): what personal information is collected and the POPIA rights over it.

## Key facts

- Monthly options: 2 members R100, 3 members R140, 4 members R180, 5 members R210, 8 members R300.
- Add-ons, each R70 per month and not included in the basic price: On the Go (20 loaves of bread per day) and Food Support (6 x 5kg mixed-portion chicken, 20 cabbages, 5 x 10kg bags of potatoes).
- Waiting period: six months, counted in months actually paid, not calendar months. It applies to everyone equally.
- A missed month pauses the count. It does not reset it, and paid months are never lost.
- Three months without payment and the membership lapses. Paying again makes it active again.
- Nyoni is not a lender. If you stop paying you owe Nyoni nothing, and Nyoni does not track arrears.
- Claims are subject to Department of Home Affairs verification. Qualifying benefits are provided within two days after verification.
- If one person is registered by more than one family member, only one cow is issued and each affected membership receives R1 500.
```

- [ ] **Step 2: Verify it serves and every URL in it resolves**

```bash
npm run build && npm run start &
sleep 8
curl -s -o /dev/null -w "llms.txt=%{http_code}\n" http://localhost:3000/llms.txt
grep -o 'https://nyonicover.co.za[^)]*' public/llms.txt | sed 's|https://nyonicover.co.za||' | while read -r p; do
  printf "%-32s %s\n" "${p:-/}" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${p:-/}")"
done
```

Expected: `llms.txt=200` and every path `200`. Kill the server.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "Add llms.txt with the registration caveat models must not drop"
```

---

### Task 10: Remove every placeholder and dead asset

**Files:**
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`
- Delete: `public/images/nyoni-hero-generated.png`, `nyoni-hero-generated-v2.png`, `nyoni-community-generated.png`, `nyoni-benefits-real.webp`, `nyoni-community.svg`, `nyoni-community.webp`, `nyoni-hero-poster.svg`, `nyoni-hero-poster.webp`, `benefits/bread.svg`, `benefits/food-support.svg`
- Modify: `src/components/contact.tsx`, `README.md`

- [ ] **Step 1: Re-confirm nothing references the files before deleting them**

Deletion is the one irreversible step in this plan. Verify, do not assume:

```bash
for f in next.svg vercel.svg file.svg globe.svg window.svg \
         images/nyoni-hero-generated.png images/nyoni-hero-generated-v2.png \
         images/nyoni-community-generated.png images/nyoni-benefits-real.webp \
         images/nyoni-community.svg images/nyoni-community.webp \
         images/nyoni-hero-poster.svg images/nyoni-hero-poster.webp \
         images/benefits/bread.svg images/benefits/food-support.svg; do
  n=$(grep -rF "$f" src/ public/llms.txt 2>/dev/null | wc -l)
  echo "$n  $f"
done
```

Expected: `0` for every line. Any non-zero means **do not delete that file** — investigate instead.

- [ ] **Step 2: Delete them**

The five root `public/*.svg` are untouched Next.js starter placeholders. The generated PNG/WebP images are superseded AI previews the redesign stopped using. `bread.svg` and `food-support.svg` are add-on icons that `benefits.tsx` never renders.

```bash
git rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg \
       public/images/nyoni-hero-generated.png public/images/nyoni-hero-generated-v2.png \
       public/images/nyoni-community-generated.png public/images/nyoni-benefits-real.webp \
       public/images/nyoni-community.svg public/images/nyoni-community.webp \
       public/images/nyoni-hero-poster.svg public/images/nyoni-hero-poster.webp \
       public/images/benefits/bread.svg public/images/benefits/food-support.svg
```

- [ ] **Step 3: Fix the placeholder text on the contact section**

`src/components/contact.tsx` shows "Please confirm with Nyoni" as the operating area and "Please confirm on WhatsApp" as the business hours. The operating area **is** known — `company.areaServed` is `"Limpopo. All of it."` Use it, and add `company` to the existing `@/lib/site-data` import.

**Business hours are genuinely not known.** Do not invent them. Replace that third block with a fact that is known:

```tsx
<div className="flex gap-3"><MapPin size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Operating area</p><p className="mt-1 text-sm text-muted">{company.areaServed}</p></div></div>
<div className="flex gap-3"><Building2 size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Based in</p><p className="mt-1 text-sm text-muted">{company.town}, {company.province}</p></div></div>
```

Swap the `Clock` import for `Building2`. **Then tell Austin that business hours are still missing** and belong in `site-data.ts` and in the `LocalBusiness` schema's `openingHours` once he confirms them.

- [ ] **Step 4: Update the stale README sections**

The "Higgsfield asset handoff" section instructs an engineer to add files the redesign no longer uses, and names `trust-intro.tsx` and `benefits.tsx` as places to repoint image paths that no longer render images. Rewrite it to describe the site as it now is. Update "Deploy to Vercel" to state that `NEXT_PUBLIC_SITE_URL` must be `https://nyonicover.co.za` with no trailing slash, and that `www` is handled by a redirect in `next.config.ts` rather than the dashboard.

- [ ] **Step 5: Verify**

```bash
npm run typecheck && npm run build
grep -rn "Please confirm" src/ && echo "FAIL: placeholder copy remains" || echo "OK"
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Delete the Next starter placeholders and dead preview assets"
```

---

### Task 11: Reduce the JavaScript bundle

framer-motion ships its full feature set to every visitor. Nothing in this codebase uses `layout` or `drag` — verified against `node_modules/framer-motion/dist/es/render/dom/features-max.mjs`. `LazyMotion` with `domAnimation` drops those. `domAnimation` **does** include `inView` (it spreads `gestureAnimations`, which contains `InViewFeature`), so `whileInView` in `Reveal` and `TrustStrip` keeps working.

**Files:**
- Create: `src/components/motion-provider.tsx`
- Modify: `src/app/layout.tsx`, `src/components/hero.tsx`, `reveal.tsx`, `scroll-progress.tsx`, `trust-strip.tsx`, `number-ticker.tsx`, `next.config.ts`

- [ ] **Step 1: Create the provider**

```tsx
"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * domAnimation = animations + exit + hover/focus/press gestures + inView.
 * It excludes layout animations and drag, neither of which this site uses.
 * Confirmed against framer-motion 12.42.2's features-animation.mjs.
 *
 * `strict` makes a missed `motion.*` component throw loudly rather than
 * silently pulling the full bundle back in.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
```

- [ ] **Step 2: Wrap the body in `src/app/layout.tsx`**

```tsx
<body><MotionProvider>{children}</MotionProvider></body>
```

- [ ] **Step 3: Convert every `motion.*` to `m.*`**

In `hero.tsx`, `reveal.tsx`, `scroll-progress.tsx`, `trust-strip.tsx`: change the import from `motion` to `m`, and every `<motion.div>` / `<motion.path>` / `<motion.aside>` to `<m.div>` / `<m.path>` / `<m.aside>`, closing tags included. Check `number-ticker.tsx` for a rendered `motion.*` element and convert it the same way. Hooks (`useReducedMotion`, `useScroll`, `useSpring`, `useInView`, `useMotionValue`, `useTransform`, `animate`) are unaffected and keep importing from `framer-motion`.

```bash
grep -rn "<motion\.\|</motion\." src/components/
```

Expected after conversion: no output.

- [ ] **Step 4: Add package-import optimisation to `next.config.ts`**

```ts
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
```

- [ ] **Step 5: Measure against the baseline**

```bash
npm run build 2>&1 | tee after.txt
grep -A 30 "Route (app)" docs/superpowers/plans/baseline.txt
grep -A 30 "Route (app)" after.txt
```

Expected: "First Load JS shared by all" **lower** than the baseline. If it is not, the conversion did not take. Record both numbers — they go in the final report.

- [ ] **Step 6: Confirm the animations still run**

`LazyMotion strict` throws at runtime on a missed component, so this must be checked in a real browser, not just a build. **Run this with nothing else heavy running** — one browser at a time on this machine.

```bash
npm run start &
sleep 8
```

Open `http://localhost:3000/` and confirm: the hero fades in, the SVG lines draw, the trust-strip numbers count up, the scroll-progress bar tracks, and sections reveal on scroll. Check the console is clear. Kill the server.

- [ ] **Step 7: Commit**

```bash
rm after.txt
git add src/components/motion-provider.tsx src/app/layout.tsx src/components/hero.tsx src/components/reveal.tsx src/components/scroll-progress.tsx src/components/trust-strip.tsx src/components/number-ticker.tsx next.config.ts
git commit -m "Cut the motion bundle with LazyMotion and optimise package imports"
```

---

### Task 12: Console sweep, full verification, and the honest report

**Files:**
- Delete: `docs/superpowers/plans/baseline.txt`

- [ ] **Step 1: Sweep every page for console errors**

Serve the production build and visit all eight URLs, watching the browser console. Record every warning and error verbatim. Do not run a build at the same time.

Pages: `/`, `/funeral-cover-limpopo`, `/how-it-works`, `/faq`, `/contact`, `/privacy`, `/terms`, `/no-such-page`. Pay particular attention to CSP violations — the JSON-LD scripts are inline, and if `script-src` were ever tightened they would be the first thing to break.

- [ ] **Step 2: Run the full gate**

```bash
npm run typecheck
npm run lint -- --cache --cache-location node_modules/.cache/eslint/
npm run build
```

All three must pass. Report any failure rather than working around it.

- [ ] **Step 3: Final metadata audit across all eight URLs**

Re-run the loop from Task 7 Step 6, extended with `/no-such-page`. Every row must show one `<h1>`, a unique title, a unique 120–165 character description, and a correct self-referential canonical. The 404 must additionally show `noindex`.

Then confirm no two descriptions are identical:

```bash
for p in / /funeral-cover-limpopo /how-it-works /faq /contact /privacy /terms; do
  curl -s "http://localhost:3000$p" | grep -o '<meta name="description" content="[^"]*"'
done | sort | uniq -d
```

Expected: no output. Any output is two pages competing with each other.

- [ ] **Step 4: Validate the structured data externally**

Paste the rendered HTML of `/`, `/faq` and `/contact` into https://validator.schema.org/ and Google's Rich Results Test. Fix anything reported as an error. Warnings about optional properties are acceptable — do **not** silence them by inventing `openingHours`, `priceRange` or `aggregateRating`.

- [ ] **Step 5: Clean up and commit**

```bash
rm docs/superpowers/plans/baseline.txt
git add -A
git commit -m "Remove the bundle baseline scratch file"
```

- [ ] **Step 6: Report to Austin — including what is not done**

State plainly:

1. Before/after First Load JS.
2. Any console warning left unfixed, quoted.
3. **Business hours are still unknown** and are therefore absent from the contact page and from `LocalBusiness` JSON-LD.
4. **Three things need Austin's own Google login and cannot be automated:** adding the property in Search Console, submitting `sitemap.xml`, and requesting indexing on the new URLs. A new URL takes days to two weeks to appear regardless.
5. **A Google Business Profile** will likely drive more real enquiries than organic search for a Phalaborwa-based service business, and appears in Maps within days rather than weeks.
6. **The site is not deployed by this work.** The www redirect and canonical tags only take effect after a deploy, and `NEXT_PUBLIC_SITE_URL` must be `https://nyonicover.co.za` in Vercel's production environment.
7. Nothing is pushed or merged. The branch is `seo-overhaul`.

---

## Self-Review

**Spec coverage** — each item in the request mapped to a task:

| Request | Task |
|---|---|
| Custom domain | 1 (canonical module), 2 (www redirect, preview noindex) |
| Proper page structure / real pages | 6, 7 |
| Custom 404 | 3 |
| Unique titles + meta descriptions | 1, 7, 12 |
| Canonical tags | 1, 7 |
| One h1 per page | 6, 7, 12 |
| sitemap.xml | 1 |
| robots.txt | 1 |
| llms.txt | 9 |
| Favicons | 4 |
| Internal links | 8 |
| Breadcrumbs | 5, 6 |
| Structured data + LocalBusiness | 5 |
| Social share images | 4 |
| Alt text on images | verified already correct — see note below |
| Console errors | 12 |
| No production source maps | 2 |
| Reduce JS bundles | 11 |
| Browser tab not showing a framework default | 1 (title), 4 (icon) |
| No default placeholder content | 10 |

**Note on alt text:** an audit of every rendered image found the site already correct. `who-we-are.tsx` and the non-compact `logo.tsx` carry descriptive alt text; the two decorative logo instances in `hero.tsx` and compact `logo.tsx` correctly use `alt=""` because adjacent text already names the brand — adding alt text there would make screen readers announce it twice. The `alt` fields on `benefits` in `site-data.ts` are dead data, because `benefits.tsx` renders no images; Task 10 removes the two unused icon files but leaves the data, since changing that interface is outside this plan's scope. Flag it to Austin.

**Placeholder scan:** no `TBD`, no "add error handling", no "similar to Task N". Every code step carries real code. Task 7 Steps 3 and 5 give metadata and header props rather than whole files, because the file shape is fully shown in Step 2 of the same task and the section list is stated explicitly.

**Type consistency:** `SITE_URL`, `absoluteUrl`, `PAGES`, `pageMetadata` (Task 1) are used with those exact names in 3, 5, 6, 7, 8. `Crumb` is defined in `src/lib/schema.ts` (Task 5) and imported by `breadcrumbs.tsx` and `page-header.tsx` (Tasks 5, 6). `JsonLd`, `organizationSchema`, `websiteSchema`, `faqSchema`, `breadcrumbSchema` (Task 5) are used with those names in 5, 6, 7. `faqs` is exported in Task 7 Step 1 before Step 4 consumes it. `MotionProvider` (Task 11) is used only in `layout.tsx`.

**Known risk, stated rather than hidden:** the four new pages mount the same section components the homepage does, so the *body* content of `/funeral-cover-limpopo` overlaps the homepage substantially. The per-page `<h1>`, lede and canonical are what separate them. If Google later reports these as duplicates in Search Console, the fix is to trim the shared sections down per page — not to add more pages.
