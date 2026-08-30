# Nyoni — We Are Family

Premium, mobile-first website for Nyoni, a South African community funeral-support membership. Pricing, benefits, waiting period and conditions are taken from the supplied Nyoni poster.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Pages

Eight indexable URLs, listed once in `PAGES` in `src/lib/seo.ts`. The sitemap,
the navigation and the footer are all generated from that table, so adding a
page means adding a row there — nothing else stays in sync by hand.

| URL | h1 |
|---|---|
| `/` | Practical support. When it matters. |
| `/funeral-cover-limpopo` | Funeral cover in Limpopo, from R100 a month. |
| `/how-it-works` | How Nyoni membership actually works. |
| `/faq` | The questions families actually ask. |
| `/contact` | Contact Nyoni directly. |
| `/terms` | Membership terms |
| `/privacy` | Privacy notice |
| 404 (`not-found.tsx`) | That page is not here. — `noindex`, no canonical |

The four middle pages mount the same section components the homepage does,
under their own `h1` and lede. That keeps the copy in one place, but it does
mean their body content overlaps the homepage. If Search Console ever reports
them as duplicates, trim the shared sections per page — do not add more pages.

## Images

The August 2026 redesign removed the hero video and the AI-generated preview
imagery entirely, and the files were deleted on 30 August 2026. The site now
carries exactly two photographic assets and four line icons:

```text
/public/images/nyoni-logo.png            the supplied logo (see the defect below)
/public/images/nyoni-cattle-limpopo.webp Nyoni's own cattle, Limpopo, Aug 2026
/public/images/benefits/*.svg            four benefit icons, currently unrendered
```

`HIGGSFIELD-PROMPTS.md` describes a media plan the site no longer follows. Treat
it as history, not as instructions.

### A defect in nyoni-logo.png

The supplied logo has **no alpha channel**. Its "transparent" background is a
checkerboard pattern baked into the pixels — someone exported a transparent PNG
flattened against the editor's preview grid. It cannot be fixed by flattening or
trimming, because the checker is real image data.

`scripts/generate-brand-assets.mjs` works around this: it crops the circular
emblem out of the roundel and masks it to a circle, discarding the checkered
area, then places it on cream because the artwork is dark navy and disappears on
the brand black. Run it after replacing the logo:

```bash
node scripts/generate-brand-assets.mjs
```

That regenerates `favicon.ico`, `icon.png`, `apple-icon.png`, the two PWA icons
and the 1200×630 `opengraph-image.png` from that one source file. If a clean
vector logo ever arrives, replace the source and delete the `EMBLEM` crop
constant in the script.

## Application flow and privacy

There is no pretend backend. The form validates in the browser, omits the applicant’s ID number, address and email from the generated WhatsApp message, and asks the visitor to review and send it. The application is not submitted until the visitor sends the WhatsApp message.

To add a secure backend later, create a server-only route or Server Action, add rate limiting and bot protection, encrypt sensitive data, define a retention policy, and obtain professional POPIA/privacy review. Do not send ID numbers through URLs, analytics or ordinary logs.

## Configuration

Copy `.env.example` to `.env.local` and set the final public site URL. No secrets are currently required.

## Deploy to Vercel

1. Push the project to a Git provider.
2. Import it in Vercel as a Next.js project.
3. Set `NEXT_PUBLIC_SITE_URL` to **`https://nyonicover.co.za`** — the apex host,
   https, **no `www`, no trailing slash**. Set it for production, preview and
   development. Environment variables only apply to the *next* build, so
   redeploy after changing it.
4. Deploy, then confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt`, the WhatsApp
   links and the application flow.

### Canonical host

`nyonicover.co.za` is the only indexable host. Two others used to answer 200
with no redirect, which meant Google was ranking three identical copies of the
site against each other:

- `www.nyonicover.co.za` → 308-redirected to the apex by `redirects()` in
  `next.config.ts`. Done in config rather than the Vercel dashboard so it is
  version-controlled and survives a re-import. Both hosts must stay attached to
  the project in Vercel for the redirect to fire.
- `*.vercel.app` preview hosts → served `X-Robots-Tag: noindex, nofollow` by
  `headers()` in the same file.

Every page also carries a self-referential `<link rel="canonical">`, built by
`pageMetadata()` in `src/lib/seo.ts`. That module is the single place the
production URL is written — do not hard-code it anywhere else.

### Search Console

Indexing does not start until Google is told the site exists. This needs
Austin's own Google login and cannot be automated: add the property as a URL
prefix, verify it, submit `sitemap.xml`, then request indexing on the new URLs.
A new URL takes days to two weeks to appear regardless of how often it is
checked.

A **Google Business Profile** will likely bring more real enquiries than organic
search for a Phalaborwa service business, and shows up in Maps within days
rather than weeks.

## Information still required

Verified and now on the site (30 August 2026): the manager's name and town, the
registered company and registration number, the service area, and one real
photograph. See [TRUST-TODO.md](./TRUST-TODO.md) for provenance and for the
wording rules that govern them.

Still outstanding:

- Official full-resolution/vector Nyoni logo and confirmation that the supplied
  mark may be used online. The current file has the checkerboard defect
  described under [Images](#images).
- Complete official membership terms, eligibility definitions and
  cancellation/refund rules.
- **Attorney-reviewed** `/terms` and `/privacy`. The site collects SA ID numbers
  today, so this is a live POPIA exposure, and no Information Officer is named.
- A photograph of Austin, and photographs of a real delivery with the family's
  written permission. The next delivery should be photographed.
- How long Nyoni has operated, a verified member count, and any testimonial —
  none of which may be estimated.
- **Verified business hours.** Still the one live gap on the contact page: that
  column now shows the registered town instead, and `openingHours` is
  deliberately absent from the `LocalBusiness` JSON-LD in `src/lib/schema.ts`.
  Add both together, once the hours are real.
- Confirmation of the exact meaning/time period of "20 loaves of bread per day".

The domain is settled: `nyonicover.co.za`, live, with `NEXT_PUBLIC_SITE_URL`
already set correctly in Vercel production.

No address, email, registration number, licence, social account or insurance/FSP
claim has been invented. Everything published traces to
`../nyoni marketing tean/CLAIMS.md`.

## Open risks recorded, not fixed

The 25 August 2026 restructure briefing raises three things that touch this site
and are **not** resolved in code — the R1 500 duplicate-registration cash rule,
the unreviewed legal pages, and the "no age limit" pricing question. They are
written up in [TRUST-TODO.md](./TRUST-TODO.md) under "Open risks carried into the
site". Read that before changing pricing or conditions copy.
