import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

export function TrustIntro() {
  return (
    <section className="paper-grain bg-cream py-16 sm:py-24">
      <div className="container-shell grid gap-10 border-y border-charcoal/15 py-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <Reveal>
          <div className="glass-dark rounded-xl border-l-4 border-l-gold p-8 text-cream sm:p-10">
            <HeartHandshake className="text-light-gold" size={36} aria-hidden="true" />
            <p className="serif-title mt-8 text-3xl font-semibold leading-tight sm:text-4xl">“Family support should be clear, practical and within reach.”</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-light-gold">We are family</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="eyebrow">Why Nyoni</p>
          <h2 className="display-title mt-4 text-5xl sm:text-6xl">Cover you can understand.</h2>
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
