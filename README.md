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

## Higgsfield asset handoff

The site ships with realistic generated preview imagery, so it works without the final video or Higgsfield exports. Generate the approved production assets using [HIGGSFIELD-PROMPTS.md](./HIGGSFIELD-PROMPTS.md), then add exactly:

```text
/public/videos/nyoni-hero.mp4
/public/images/nyoni-hero-poster.webp
/public/images/benefits/cow.webp
/public/images/benefits/maize-meal.webp
/public/images/benefits/firewood.webp
/public/images/benefits/bakkie.webp
/public/images/benefits/bread.webp
/public/images/benefits/food-support.webp
/public/images/nyoni-community.webp
```

After adding the files, point the corresponding image paths in `src/app/layout.tsx`, `src/components/hero.tsx`, `src/components/trust-intro.tsx`, `src/components/benefits.tsx`, and `src/lib/site-data.ts` to the final `.webp` exports. Keep the hero MP4 below 6 MB, muted, without audio, and encoded for web playback (H.264 is the safest choice). The video automatically pauses for reduced-motion and data-saver users and falls back to the generated poster if missing.

Also replace `/public/logo.svg` with a clean, authorised vector export of the official Nyoni cow logo if one becomes available.

## Application flow and privacy

There is no pretend backend. The form validates in the browser, omits the applicant’s ID number, address and email from the generated WhatsApp message, and asks the visitor to review and send it. The application is not submitted until the visitor sends the WhatsApp message.

To add a secure backend later, create a server-only route or Server Action, add rate limiting and bot protection, encrypt sensitive data, define a retention policy, and obtain professional POPIA/privacy review. Do not send ID numbers through URLs, analytics or ordinary logs.

## Configuration

Copy `.env.example` to `.env.local` and set the final public site URL. No secrets are currently required.

## Deploy to Vercel

1. Push the project to a Git provider.
2. Import it in Vercel as a Next.js project.
3. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS URL.
4. Deploy and confirm `/robots.txt`, `/sitemap.xml`, WhatsApp links and the application flow.
5. Re-run Lighthouse on a throttled mobile profile after uploading the final video.

## Information still required

Verified and now on the site (30 August 2026): the manager's name and town, the
registered company and registration number, the service area, and one real
photograph. See [TRUST-TODO.md](./TRUST-TODO.md) for provenance and for the
wording rules that govern them.

Still outstanding:

- Official full-resolution/vector Nyoni logo and confirmation that the supplied
  mark may be used online.
- Final Higgsfield-generated media listed above.
- Complete official membership terms, eligibility definitions and
  cancellation/refund rules.
- **Attorney-reviewed** `/terms` and `/privacy`. The site collects SA ID numbers
  today, so this is a live POPIA exposure, and no Information Officer is named.
- A photograph of Austin, and photographs of a real delivery with the family's
  written permission. The next delivery should be photographed.
- How long Nyoni has operated, a verified member count, and any testimonial —
  none of which may be estimated.
- Verified business hours. The physical address is deliberately withheld: the
  registered office is a private home.
- A verified domain name for production metadata and structured data.
- Confirmation of the exact meaning/time period of "20 loaves of bread per day".

No address, email, registration number, licence, social account or insurance/FSP
claim has been invented. Everything published traces to
`../nyoni marketing tean/CLAIMS.md`.

## Open risks recorded, not fixed

The 25 August 2026 restructure briefing raises three things that touch this site
and are **not** resolved in code — the R1 500 duplicate-registration cash rule,
the unreviewed legal pages, and the "no age limit" pricing question. They are
written up in [TRUST-TODO.md](./TRUST-TODO.md) under "Open risks carried into the
site". Read that before changing pricing or conditions copy.
