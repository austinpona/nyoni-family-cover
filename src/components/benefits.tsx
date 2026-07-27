import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { benefits } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Benefits() {
  return (
    <section id="benefits" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell">
        <div className="relative min-h-[34rem] overflow-hidden rounded-xl bg-charcoal shadow-[0_30px_80px_-55px_rgba(41,40,37,.65)]">
          <Image src="/images/nyoni-benefits-generated.png" alt="A cow, maize meal, firewood and a white bakkie representing Nyoni basic benefits" fill sizes="(max-width:1280px) 100vw, 1248px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
          <Reveal className="relative z-10 max-w-lg p-7 text-cream sm:p-12 lg:p-16">
            <p className="eyebrow text-light-gold">Basic benefits</p>
            <h2 className="display-title mt-4 text-5xl sm:text-7xl">Practical help, clearly defined.</h2>
            <p className="mt-5 max-w-md leading-7 text-cream/75">Qualifying members receive the following support after verification.</p>
          </Reveal>
        </div>
        <div className="grid border-x border-b border-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => <div key={benefit.title} className="border-b border-charcoal/15 p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"><span className="font-display text-2xl text-gold">0{index + 1}</span><h3 className="mt-6 font-display text-3xl uppercase">{benefit.title}</h3><p className="mt-2 text-sm text-muted">{benefit.detail}</p>{benefit.note && <p className="mt-1 text-xs font-semibold text-gold">{benefit.note}</p>}</div>)}
        </div>
        <div className="mt-16 grid gap-8 border-y border-charcoal/15 py-10 lg:grid-cols-[.65fr_1.35fr]">
          <div><h2 className="display-title text-5xl">Add more practical help.</h2><p className="mt-4 text-sm leading-6 text-muted">These are separate add-ons. They are not included in the basic monthly price.</p></div>
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal className="border-l border-gold pl-6"><div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-3xl uppercase">On the Go</h3><p className="font-display text-3xl text-gold">R70<span className="font-sans text-xs text-muted"> pm</span></p></div><p className="mt-5 flex gap-2 text-sm"><Check size={17} className="text-gold" />20 loaves of bread per day</p><a href="#join" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">Add to application <ArrowRight size={15} /></a></Reveal>
            <Reveal className="border-l border-gold pl-6"><div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-3xl uppercase">Food Support</h3><p className="font-display text-3xl text-gold">R70<span className="font-sans text-xs text-muted"> pm</span></p></div><ul className="mt-5 space-y-2 text-sm"><li className="flex gap-2"><Check size={17} className="text-gold" />6 × 5kg mixed-portion chicken</li><li className="flex gap-2"><Check size={17} className="text-gold" />20 cabbages</li><li className="flex gap-2"><Check size={17} className="text-gold" />5 × 10kg bags of potatoes</li></ul><a href="#join" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">Add to application <ArrowRight size={15} /></a></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
