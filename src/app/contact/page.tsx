import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { PageHeader } from "@/components/page-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { WhoWeAre } from "@/components/who-we-are";
import { organizationSchema } from "@/lib/schema";
import { PAGES, pageMetadata } from "@/lib/seo";
import { PHONE_DISPLAY } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata({
  title: "Contact Nyoni | Funeral Support in Limpopo",
  absoluteTitle: true,
  description:
    `Call or WhatsApp Nyoni on ${PHONE_DISPLAY} for membership, add-ons, applications or claims. Run from Phalaborwa and serving families across Limpopo.`,
  path: PAGES.contact.path,
});

/*
  WhoWeAre sits directly under the contact details on purpose. Someone looking
  up how to reach a funeral business is deciding whether it is real, and the
  registration caveat in that section is the honest answer to the question they
  are actually asking.

  Austin Pona is the manager. Never founder, owner or director — those belong
  to the sole CIPC director, and printing them here would be a false statement
  about who controls a funeral business.
*/
export default function ContactPage() {
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
            { name: "Contact", path: PAGES.contact.path },
          ]}
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
        <Contact />
        <WhoWeAre />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
