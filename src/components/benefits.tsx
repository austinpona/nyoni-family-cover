import { ArrowRight, Check } from "lucide-react";
import { benefits } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Benefits() {
  return (
    <section id="benefits" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-xl bg-deep-black shadow-[0_30px_80px_-55px_rgba(41,40,37,.65)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(197,161,101,.18),transparent_55%),radial-gradient(ellipse_at_5%_100%,rgba(137,102,47,.14),transparent_50%)]" aria-hidden="true" />
          <span className="serif-accent absolute -right-6 bottom-[-3rem] hidden select-none text-[16rem] leading-none text-light-gold/8 sm:block" aria-hidden="true">04</span>
          <Reveal className="relative z-10 max-w-2xl p-7 text-cream sm:p-12 lg:p-16">
            <p className="eyebrow text-light-gold">Basic benefits</p>
            <h2 className="display-title mt-4 text-5xl sm:text-7xl">Practical help, <span className="serif-accent text-[#e2c99c]">clearly defined.</span></h2>
            <p className="mt-5 max-w-md leading-7 text-cream/80">Qualifying members receive the following support after verification.</p>
          </Reveal>
        </div>
        {/* Ledger rows, not a 4-up card grid: equal feature columns are the AI tell. */}
        <ol className="border-b border-charcoal/15">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * .05}>
              <li className="group grid items-baseline gap-x-6 gap-y-1 border-t border-charcoal/15 py-7 transition-colors hover:bg-gold/5 sm:grid-cols-[4rem_1fr_auto] sm:py-8">
                <span className="font-display text-3xl text-gold/60 transition-colors group-hover:text-gold sm:text-4xl">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">{benefit.title}</h3>
                  {benefit.note && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold">{benefit.note}</p>}
                </div>
                <p className="text-sm text-muted sm:text-right sm:text-base">{benefit.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 grid gap-8 border-y border-charcoal/15 py-10 lg:grid-cols-[.65fr_1.35fr]">
          <div><p className="eyebrow">Optional add-ons</p><h2 className="display-title mt-4 text-4xl sm:text-5xl">Add more practical help.</h2><p className="mt-4 text-sm leading-6 text-muted">These are separate add-ons. They are not included in the basic monthly price.</p></div>
          {/* Deliberately asymmetric: matched twin cards read as a template. */}
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-[.85fr_1.15fr]">
            <Reveal className="border-t border-charcoal/20 pt-6">
              <div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-3xl uppercase">On the Go</h3><p className="font-display text-3xl text-gold">R70<span className="font-sans text-xs text-muted"> pm</span></p></div>
              <p className="mt-5 flex gap-2 text-sm text-muted"><Check size={17} className="shrink-0 text-gold" />20 loaves of bread per day</p>
              <a href="#join" className="focus-ring mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:underline hover:underline-offset-4">Add to application <ArrowRight size={15} /></a>
            </Reveal>
            <Reveal className="border-t-2 border-charcoal pt-6">
              <div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-3xl uppercase sm:text-4xl">Food Support</h3><p className="font-display text-3xl text-gold sm:text-4xl">R70<span className="font-sans text-xs text-muted"> pm</span></p></div>
              <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2"><li className="flex gap-2"><Check size={17} className="shrink-0 text-gold" />6 × 5kg mixed-portion chicken</li><li className="flex gap-2"><Check size={17} className="shrink-0 text-gold" />20 cabbages</li><li className="flex gap-2"><Check size={17} className="shrink-0 text-gold" />5 × 10kg bags of potatoes</li></ul>
              <a href="#join" className="focus-ring mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:underline hover:underline-offset-4">Add to application <ArrowRight size={15} /></a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
