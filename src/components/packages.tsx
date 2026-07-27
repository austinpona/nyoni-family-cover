import { ArrowUpRight, MessageCircle } from "lucide-react";
import { packages, whatsappUrl } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Packages() {
  return (
    <section id="packages" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Basic monthly options</p>
          <h2 className="display-title mt-4 text-5xl sm:text-7xl">One family. A plan that fits.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-muted">Select the number of family members you want to register. Every option includes the same basic benefits.</p>
        </Reveal>
        <div className="mt-12 border-y border-charcoal/20">
          <div className="hidden grid-cols-[1.2fr_.8fr_1fr] border-b border-charcoal/15 py-3 text-[.65rem] font-bold uppercase tracking-[.14em] text-muted sm:grid"><span>Registered family</span><span>Monthly payment</span><span className="text-right">Choose an option</span></div>
          {packages.map((item, index) => (
            <Reveal key={item.members} delay={index * .04} className={`group grid items-center gap-4 border-b border-charcoal/15 py-6 last:border-b-0 sm:grid-cols-[1.2fr_.8fr_1fr] ${item.featured ? "bg-gold/10" : ""}`}>
              <div className="flex items-baseline gap-3 px-3 sm:px-0"><span className="font-display text-5xl tabular-nums">{item.members}</span><span className="text-sm font-semibold uppercase tracking-wider">members</span>{item.featured && <span className="border border-gold px-2 py-1 text-[.6rem] font-bold uppercase tracking-widest text-gold">Popular</span>}</div>
              <p className="px-3 font-display text-4xl text-gold sm:px-0">R{item.price}<span className="ml-1 font-sans text-xs text-muted">/ month</span></p>
              <div className="flex items-center gap-2 px-3 sm:justify-end sm:px-0">
                <a href={whatsappUrl(`Hello Nyoni, I would like to enquire about the ${item.members}-member option at R${item.price} per month.`)} target="_blank" rel="noreferrer" aria-label={`Ask about the ${item.members}-member option on WhatsApp`} className="focus-ring grid size-11 place-items-center border border-charcoal/20 hover:border-gold hover:text-gold"><MessageCircle size={18} /></a>
                <a href={`?option=${item.members}#join`} className="focus-ring inline-flex min-h-11 items-center gap-3 bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream hover:bg-gold">Apply now <ArrowUpRight size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">A six-month waiting period and the important conditions below apply to every membership option.</p>
      </div>
    </section>
  );
}
