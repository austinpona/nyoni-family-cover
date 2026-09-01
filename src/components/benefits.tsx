import Image from "next/image";
import { Check } from "lucide-react";
import { addOns, benefits } from "@/lib/site-data";
import { Reveal } from "./reveal";

/*
  The manifest.

  This section answers the only question that matters on this site: what
  actually arrives. Until now it answered it in words alone, which for a
  product that is literally a cow, four bags and a bakkie was the weakest
  possible way to say it.

  Three constraints from DESIGN.md shaped the layout:

  1. "Never let three light sections run consecutively." This section is now
     dark, which fixes the run on /funeral-cover-limpopo as a side effect.
  2. "Three identical feature cards" is banned, and so is an identical card
     grid. The four tiles are deliberately unequal — two wide, two narrow,
     alternating — which also suits the images, all of which are landscape.
  3. Gold stays under ~10%. It appears on the eyebrow, one serif phrase in the
     heading, and the add-on prices. Nowhere else.

  The tiles are cream on the dark ground because the product images already sit
  on cream, and because the logo rule in BRAND.md — never place the mark on a
  photograph — sets the same instinct for the goods.
*/

const TILE = "group relative overflow-hidden rounded-xl bg-soft-cream";
const TILE_IMAGE = "flex items-center justify-center px-6 pt-7 pb-3";
const TILE_FOOT = "flex items-baseline justify-between gap-3 border-t border-charcoal/12 px-6 py-4";

/** Wide tiles take the landscape images; narrow ones take the squarer pair. */
const SPAN = ["sm:col-span-3", "sm:col-span-2", "sm:col-span-2", "sm:col-span-3"];

export function Benefits() {
  return (
    <section id="benefits" className="section-pad bg-deep-black text-cream">
      <div className="container-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-light-gold">Basic benefits</p>
          <h2 className="display-title mt-4 text-5xl sm:text-7xl">
            Not a promise. <span className="serif-accent text-[#e2c99c]">A delivery.</span>
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-cream/75">
            Every membership option includes the same four things. This is the whole list —
            there is no tier that gets more, and nothing here is decided later.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-5">
          {benefits.map((benefit, index) => (
            <li key={benefit.title} className={SPAN[index]}>
              <Reveal delay={index * 0.05}>
                <article className={TILE}>
                  <div className={TILE_IMAGE}>
                    <Image
                      src={benefit.image}
                      alt={benefit.alt}
                      width={benefit.width}
                      height={benefit.height}
                      sizes="(min-width: 640px) 22rem, 90vw"
                      className="h-32 w-auto object-contain sm:h-36"
                    />
                  </div>
                  <div className={TILE_FOOT}>
                    <div>
                      <h3 className="font-display text-2xl uppercase leading-none text-charcoal sm:text-3xl">
                        {benefit.title}
                      </h3>
                      {benefit.note && (
                        <p className="mt-1.5 text-[.68rem] font-semibold uppercase tracking-wider text-gold">
                          {benefit.note}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 text-sm text-muted">{benefit.detail}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-3 font-display text-sm text-charcoal/25"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Add-ons sit quieter than the manifest on purpose: they are optional,
            they cost extra, and the claim register requires that never read as
            part of the basic price. */}
        <div className="mt-16 grid gap-10 border-t border-white/12 pt-12 lg:grid-cols-[.6fr_1.4fr]">
          <Reveal>
            <p className="eyebrow text-light-gold">Optional add-ons</p>
            <h3 className="display-title mt-4 text-4xl sm:text-5xl">Add more practical help.</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-cream/70">
              Separate from the basic price, and separate from each other. R70 a month each.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {addOns.map((addOn, index) => (
              <Reveal key={addOn.name} delay={index * 0.05} className="border-t border-white/12 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-3xl uppercase">{addOn.name}</h4>
                  <p className="font-display text-3xl text-light-gold">
                    R{addOn.price}
                    <span className="ml-1 font-sans text-xs text-cream/60">pm</span>
                  </p>
                </div>
                <ul className="mt-5 grid gap-3">
                  {addOn.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-soft-cream">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          sizes="56px"
                          className="h-10 w-auto object-contain"
                        />
                      </span>
                      <span className="flex items-center gap-2 text-sm text-cream/80">
                        <Check size={15} className="shrink-0 text-light-gold" aria-hidden="true" />
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
