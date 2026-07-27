import { ArrowDown } from "lucide-react";
import { Reveal } from "./reveal";

const steps = [
  ["Choose", "Select the number of family members you want to register."],
  ["Apply", "Complete your application with the information Nyoni needs."],
  ["Maintain", "Keep monthly payments up to date through the waiting period."],
  ["Claim", "Submit for verification and receive qualifying support."],
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start"><h2 className="display-title text-5xl sm:text-6xl">From joining to support.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-muted">Four clear stages, with the six-month waiting period shown upfront.</p></Reveal>
          <ol className="border-t border-charcoal/20">
            {steps.map(([title, text], index) => <li key={title} className="grid gap-4 border-b border-charcoal/15 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center"><span className="font-display text-4xl text-gold">0{index + 1}</span><div><h3 className="font-display text-3xl uppercase">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-muted">{text}</p></div>{index < steps.length - 1 && <ArrowDown className="hidden text-gold sm:block" size={20} aria-hidden="true" />}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
