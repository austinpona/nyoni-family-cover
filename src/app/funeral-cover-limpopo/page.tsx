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

/*
  Every claim in the lede is already published elsewhere on this site — the
  price range from `packages` in site-data.ts, the waiting period from the
  conditions list. Nothing here is new. If a fact needs adding, it goes into
  site-data.ts and TRUST-TODO.md first, and only if it is verified.
*/
export default function FuneralCoverPage() {
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
            { name: "Funeral cover", path: PAGES.cover.path },
          ]}
          eyebrow="Membership options"
          title="Funeral cover in Limpopo,"
          accent="from R100 a month."
          lede={
            <>
              <p>
                Nyoni covers between two and eight people on one membership, at R100 to R300 a
                month. Every option includes the same basic benefits, so the only thing the price
                changes is how many people are registered.
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
