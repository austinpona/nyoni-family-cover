import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

export function TrustIntro() {
  return (
    <section className="paper-grain bg-cream py-16 sm:py-24">
      <div className="container-shell grid gap-10 border-y border-charcoal/15 py-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <Reveal>
          <div className="relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-xl bg-deep-black p-8 text-cream shadow-[0_30px_80px_-50px_rgba(24,23,20,.8)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(197,161,101,.16),transparent_55%)]" aria-hidden="true" />
            <span className="serif-accent absolute -right-4 -top-10 select-none text-[13rem] leading-none text-light-gold/10" aria-hidden="true">”</span>
            <span className="relative h-px w-14 bg-light-gold" aria-hidden="true" />
            <div className="relative">
              <p className="serif-accent max-w-md text-4xl leading-[1.08] text-[#ead8b4] sm:text-5xl">Family support should be clear, practical and within reach.</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-light-gold">We are family</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="eyebrow">Why Nyoni</p>
          <h2 className="display-title mt-4 text-5xl sm:text-6xl">Cover you can <span className="serif-accent text-gold">understand.</span></h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Nyoni helps families prepare for difficult times with straightforward monthly options and practical support after the waiting period and verification process.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border-t border-charcoal/20 pt-5"><CheckCircle2 className="text-gold" size={22} /><strong className="mt-4 block text-charcoal">Clear monthly options</strong><p className="mt-2 text-sm leading-6 text-muted">Choose cover according to the number of people in your family.</p></div>
            <div className="border-t border-charcoal/20 pt-5"><ShieldCheck className="text-gold" size={22} /><strong className="mt-4 block text-charcoal">Defined practical benefits</strong><p className="mt-2 text-sm leading-6 text-muted">See what the basic cover includes before you apply.</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
