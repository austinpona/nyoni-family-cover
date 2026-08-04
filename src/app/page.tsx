import { ApplicationForm } from "@/components/application-form";
import { Benefits } from "@/components/benefits";
import { Conditions } from "@/components/conditions";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Navigation } from "@/components/navigation";
import { Packages } from "@/components/packages";
import { TrustIntro } from "@/components/trust-intro";
import { TrustStrip } from "@/components/trust-strip";
import { WaitingPeriod } from "@/components/waiting-period";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollProgress } from "@/components/scroll-progress";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nyoni",
  description: "Community funeral-support membership providing practical support to families during difficult times.",
  telephone: "+27636021868",
  slogan: "We Are Family",
  areaServed: { "@type": "Country", name: "South Africa" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyonicover.co.za",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-charcoal px-4 py-3 text-sm font-bold text-cream transition-transform focus:translate-y-0">Skip to main content</a>
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        {/* Ordered around the two days that matter: the day you join, and the
            day you need it. What arrives leads, because it is the one thing
            no competitor states this plainly. */}
        <Hero />
        <TrustStrip />
        <Benefits />
        <Packages />
        <WaitingPeriod />
        <TrustIntro />
        <HowItWorks />
        <Conditions />
        <ApplicationForm />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
