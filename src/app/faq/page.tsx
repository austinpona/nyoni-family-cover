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
            { name: "FAQ", path: PAGES.faq.path },
          ]}
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
