import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const franklin = Libre_Franklin({ subsets: ["latin"], variable: "--font-franklin", display: "swap" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-cormorant", display: "swap" });

/*
  No `icons` key and no explicit `openGraph.images` here on purpose. Both are
  supplied by the App Router file conventions — icon.png, apple-icon.png and
  opengraph-image.png in this directory — which emit the correct dimensions
  automatically. Declaring them here would override those files and put the
  1100x1430 portrait logo back into a 1200x630 slot, which every social
  platform crops into an unrecognisable strip.
*/
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

// #181714 is --color-deep-black from globals.css. It was #111111, which is
// close enough to look right and wrong enough to show a seam against the
// header on mobile Chrome.
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#181714" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${franklin.variable} ${barlow.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
