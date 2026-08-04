import { Clock3 } from "lucide-react";
import { Reveal } from "./reveal";

// The six-month wait is the main objection. Answering "why" plainly converts
// suspicion into evidence of competence; stating it flatly does not.
export function WaitingPeriod() {
  return (
    <section id="waiting-period" aria-labelledby="waiting-title" className="bg-deep-black py-20 text-cream sm:py-28">
      <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="eyebrow text-light-gold">The honest part</p>
          <h2 id="waiting-title" className="display-title mt-4 text-5xl sm:text-6xl">Why six <span className="serif-accent text-[#e2c99c]">months?</span></h2>
          <div className="mt-8 flex items-center gap-5">
            <Clock3 className="size-12 shrink-0 text-light-gold" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-display text-6xl tabular-nums leading-none">6 months</p>
          </div>
        </Reveal>
        <Reveal delay={.06} className="space-y-6 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="max-w-xl text-lg leading-8 text-cream/85">The waiting period protects the members who are already paying.</p>
          <p className="max-w-xl text-sm leading-7 text-cream/70">Without it, someone could join in the week they need to claim. A support fund that allows this cannot pay the families who have been contributing for years — it runs out. The six months is what keeps Nyoni able to deliver when it is your turn.</p>
          <p className="max-w-xl text-sm leading-7 text-cream/70">It applies to every member equally, including the people who started Nyoni. Payments must be maintained through the period and afterwards for a claim to be considered.</p>
          <p className="border-t border-white/12 pt-6 text-sm leading-7 text-light-gold">We would rather tell you this on the first page than in the fine print.</p>
        </Reveal>
      </div>
    </section>
  );
}
