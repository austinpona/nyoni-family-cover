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

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
