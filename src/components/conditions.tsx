import { AlertCircle } from "lucide-react";
import { conditions } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Conditions() {
  return (
    <section id="conditions" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell">
        <Reveal className="max-w-3xl"><p className="eyebrow">Important conditions</p><h2 className="display-title mt-4 text-5xl sm:text-7xl">Know where you stand.</h2><p className="mt-5 max-w-xl leading-7 text-muted">These conditions are part of understanding whether support can be provided.</p></Reveal>
        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {conditions.map((condition, index) => <Reveal key={condition} delay={index * .04} className="grid grid-cols-[3rem_1fr] gap-4"><span className="font-display text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span><p className="border-l border-charcoal/15 pl-5 text-sm leading-7">{condition}</p></Reveal>)}
        </div>
        <div className="mt-12 flex max-w-3xl gap-3 bg-charcoal p-6 text-cream"><AlertCircle className="mt-0.5 shrink-0 text-light-gold" size={20} /><p className="text-sm leading-6">Final eligibility remains subject to Nyoni’s complete membership terms and verification process.</p></div>
      </div>
    </section>
  );
}
