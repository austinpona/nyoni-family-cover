import type { Metadata } from "next";
import { Conditions } from "@/components/conditions";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/how-it-works";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { PageHeader } from "@/components/page-header";
import { WaitingPeriod } from "@/components/waiting-period";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { organizationSchema } from "@/lib/schema";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How Nyoni Membership Works",
  description:
    "Choose your family size, apply, keep six months paid, then claim. Every stage of Nyoni membership, and the conditions that apply to each one.",
  path: PAGES.howItWorks.path,
});

/*
  The "not a lender" line is business rule A4b, already in the conditions list
  in site-data.ts. It stays on this page because the page is about what happens
  over time, and "what if I fall behind" is the question that actually stops
  people joining. Nyoni tracks no arrears — never write anything here that
  implies a balance owed.
*/
export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-charcoal px-4 py-3 text-sm font-bold text-cream transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <PageHeader
          trail={[
            { name: "Home", path: "/" },
            { name: "How it works", path: PAGES.howItWorks.path },
          ]}
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
        <HowItWorks />
        <WaitingPeriod />
        <Conditions />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
