import Image from "next/image";
import { company } from "@/lib/site-data";
import { Reveal } from "./reveal";

/**
 * The site's largest remaining weakness was that it carried no evidence Nyoni
 * is real. Every fact below is verified — the CIPC COR 14.3 certificate of
 * 25 August 2026, and Austin's own confirmation of 7 August 2026.
 *
 * Two rules govern this section and must not be relaxed:
 *
 * 1. Registration is not approval. A family reads "registered" as the state
 *    having checked the product. It has not. The caveat below is deliberate —
 *    telling people the hard part first is the whole brand position.
 * 2. Austin Pona is the manager. Never "founder", "owner" or "director" —
 *    those belong to the sole CIPC director, and printing them for Pona would
 *    be a false statement about who controls a funeral business.
 *
 * The registered office is a private home and is deliberately not published.
 */
export function WhoWeAre() {
  return (
    <section id="who-we-are" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell grid gap-10 border-t border-charcoal/15 pt-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        {/* On a phone the heading must come first: a photo of cattle with no
            context above it does not tell anyone who they are dealing with. */}
        <Reveal className="order-2 lg:order-1">
          <figure className="m-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-charcoal/5 shadow-[0_30px_80px_-55px_rgba(41,40,37,.75)]">
              <Image
                src="/images/nyoni-cattle-limpopo.webp"
                alt="Nyoni's cattle feeding in a kraal in the Limpopo bushveld"
                fill
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover"
              />
            </div>
            {/* Captioned as what it is. It is not a delivery to a family, and
                nothing here may suggest that it is. */}
            <figcaption className="mt-3 text-xs leading-5 text-muted">
              Nyoni&rsquo;s own cattle, Limpopo &mdash; August 2026.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <p className="eyebrow">Who you are dealing with</p>
          <h2 className="display-title mt-4 text-5xl sm:text-6xl">
            Real people, <span className="serif-accent text-gold">in a real town.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Nyoni is run by <strong className="font-semibold text-charcoal">{company.manager}</strong>,{" "}
            {company.managerRole.toLowerCase()}, from {company.town} in {company.province}. When you call the
            number on this page, that is who answers.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            We serve {company.areaServed} We do not claim to cover the country, because we do not.
          </p>

          <dl className="mt-9 grid gap-px overflow-hidden rounded-xl border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2">
            <div className="bg-cream p-6">
              <dt className="text-[.65rem] font-bold uppercase tracking-[.18em] text-gold">Registered name</dt>
              <dd className="mt-2 font-display text-xl uppercase leading-tight text-charcoal">{company.registeredName}</dd>
            </div>
            <div className="bg-cream p-6">
              <dt className="text-[.65rem] font-bold uppercase tracking-[.18em] text-gold">Registration number</dt>
              <dd className="mt-2 font-display text-xl uppercase leading-tight text-charcoal">{company.registrationNumber}</dd>
            </div>
          </dl>

          {/* The caveat is the point of the section, not a footnote to it. */}
          <div className="mt-6 border-l-2 border-gold bg-charcoal/[.04] p-6">
            <p className="text-sm leading-7 text-muted">
              <strong className="font-semibold text-charcoal">What that registration does and does not mean.</strong>{" "}
              It means the company legally exists and can be looked up. It does not mean anyone has approved,
              guaranteed or insured what Nyoni provides. We would rather tell you that now than let you assume
              otherwise &mdash; and we are working on the next step openly.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
