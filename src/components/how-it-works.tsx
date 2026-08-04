import { Reveal } from "./reveal";

const steps = [
  ["Choose", "Select the number of family members you want to register."],
  ["Apply", "Complete your application with the information Nyoni needs."],
  ["Maintain", "Keep monthly payments up to date through the waiting period."],
  ["Claim", "Submit for verification and receive qualifying support."],
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-deep-black py-20 text-cream sm:py-28">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-[#ead8b4]">The journey</p>
            <h2 className="display-title mt-4 text-5xl sm:text-6xl">From joining <span className="serif-accent text-[#e2c99c]">to support.</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-cream/70">Four clear stages, with the six-month waiting period shown upfront.</p>
          </Reveal>
          <ol className="border-t border-white/12">
            {steps.map(([title, text], index) => <li key={title} className="border-b border-white/12"><Reveal delay={index * .05} className="group grid gap-4 py-8 transition-colors hover:bg-white/5 sm:grid-cols-[5rem_1fr] sm:items-center"><span className="font-display text-4xl text-light-gold/70 transition-colors group-hover:text-light-gold">0{index + 1}</span><div><h3 className="font-display text-3xl uppercase">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-cream/70">{text}</p></div></Reveal></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
