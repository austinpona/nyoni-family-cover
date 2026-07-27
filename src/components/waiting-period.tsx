import { Clock3 } from "lucide-react";
import { Reveal } from "./reveal";

export function WaitingPeriod() {
  return (
    <section aria-labelledby="waiting-title" className="paper-grain bg-cream pb-20 sm:pb-28">
      <Reveal className="container-shell">
        <div className="glass-light grid overflow-hidden rounded-xl border-gold/35 md:grid-cols-[.65fr_1.35fr]">
          <div className="flex items-center gap-5 border-b border-gold/30 p-7 md:border-b-0 md:border-r sm:p-10"><Clock3 className="size-11 shrink-0 text-gold" strokeWidth={1.5} /><div><p className="text-xs font-bold uppercase tracking-widest text-gold">Waiting period</p><p className="font-display text-6xl tabular-nums">6 months</p></div></div>
          <div className="flex items-center p-7 sm:p-10"><div><h2 id="waiting-title" className="font-display text-3xl uppercase">Clear from the beginning</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">The waiting period must be completed and monthly payments maintained before a qualifying claim can be considered.</p></div></div>
        </div>
      </Reveal>
    </section>
  );
}
