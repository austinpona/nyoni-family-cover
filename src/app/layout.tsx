import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import "./globals.css";

const franklin = Libre_Franklin({ subsets: ["latin"], variable: "--font-franklin", display: "swap" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyonicover.co.za"),
  title: { default: "Nyoni | Affordable Community Funeral Support", template: "%s | Nyoni" },
  description: "Explore affordable Nyoni monthly support options for families, including practical food, transport and community assistance during difficult times.",
  keywords: ["Nyoni", "funeral support", "community support", "family support", "South Africa", "Limpopo"],
  openGraph: {
    title: "Nyoni | Affordable Community Funeral Support",
    description: "Practical, affordable community support for families during difficult times.",
    type: "website",
    locale: "en_ZA",
    images: [{ url: "/images/nyoni-logo.png", width: 1100, height: 1430, alt: "Nyoni cow and sunrise logo" }],
  },
  twitter: { card: "summary_large_image", title: "Nyoni | We Are Family", description: "Affordable community funeral-support membership for families.", images: ["/images/nyoni-logo.png"] },
  icons: { icon: "/logo.svg", apple: "/logo.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${franklin.variable} ${barlow.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
