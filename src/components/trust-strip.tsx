"use client";

import { Clock3, PackageCheck, UsersRound, WalletCards } from "lucide-react";
import { m } from "framer-motion";
import { NumberTicker } from "./number-ticker";

// These are membership terms, not social proof. Labelled as such deliberately:
// dressing product specs up as trust signals is the thing that erodes trust.
const facts = [
  { value: 100, prefix: "From R", suffix: "", label: "Per month", icon: WalletCards },
  { value: 8, prefix: "2 to ", suffix: "", label: "People covered", icon: UsersRound },
  { value: 6, prefix: "", suffix: " months", label: "Before you can claim", icon: Clock3 },
  { value: 2, prefix: "Within ", suffix: " days", label: "Support delivered", icon: PackageCheck },
] as const;

export function TrustStrip() {
  return <section aria-label="Membership terms at a glance" className="border-t border-gold/30 bg-deep-black text-cream"><div className="container-shell grid grid-cols-2 lg:grid-cols-4">{facts.map(({ value, prefix, suffix, label, icon: Icon }, index) => <m.div key={label} initial={false} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="border-b border-r border-white/12 px-4 py-7 last:border-r-0 lg:border-b-0 lg:px-6"><Icon size={20} className="mb-4 text-light-gold" aria-hidden="true" /><p className="font-display text-3xl uppercase sm:text-4xl"><NumberTicker value={value} prefix={prefix} suffix={suffix} /></p><p className="mt-2 text-[.65rem] font-semibold uppercase tracking-[.13em] text-white/85">{label}</p></m.div>)}</div></section>;
}

