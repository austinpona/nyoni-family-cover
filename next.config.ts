import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * This site has no database, no API routes and no third-party scripts, so the
 * usual attack surface is small. What it does have is an application form
 * holding up to eight people's ID numbers in browser memory, on a product
 * whose audience has good reason to be wary of scams.
 *
 * frame-ancestors is the one that earns its place: without it, anyone can put
 * nyonicover.co.za in an iframe under their own domain and collect real
 * applications through a real form. In South African funeral cover that is not
 * a hypothetical attack, it is the oldest one there is.
 *
 * script-src keeps 'unsafe-inline' because Next inlines its bootstrap and this
 * site has no middleware to issue a nonce. That is the weak line here — worth
 * knowing rather than pretending otherwise. Everything else is closed, so an
 * injected script still cannot reach an outside origin to send anything to.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // next/font/google self-hosts at build time, so no external font origin.
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * The apex host, derived from the same env var the canonical tags use, so the
 * redirect can never disagree with the canonical.
 */
const canonicalHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyonicover.co.za").host;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Source maps are not emitted for production browser bundles by default in
  // Next 16; stated explicitly so an upstream default change cannot silently
  // start publishing this site's source to anyone who opens devtools.
  productionBrowserSourceMaps: false,
  experimental: {
    // lucide-react and framer-motion both re-export large barrels. This
    // rewrites the named imports to deep paths so only what is used is bundled.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        // www -> apex, permanent. Done here rather than in the Vercel dashboard
        // so it lives in version control and survives a re-import. Both hosts
        // currently answer 200, which is three copies of one site to Google.
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // The application URL carries the applicant's details. Send no
          // referrer off-site so it cannot travel to another origin.
          { key: "Referrer-Policy", value: "no-referrer" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Vercel preview deployments are a third copy of the site, and
        // nyoni-family-cover.vercel.app currently answers 200. Tell crawlers to
        // ignore every preview host; the apex is the only indexable one.
        source: "/:path*",
        has: [{ type: "host", value: "(?<previewHost>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
