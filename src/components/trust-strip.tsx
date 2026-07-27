"use client";

import { Clock3, PackageCheck, UsersRound, WalletCards } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { NumberTicker } from "./number-ticker";

const facts = [
  { value: 100, prefix: "From R", suffix: "", label: "Monthly membership", icon: WalletCards },
  { value: 8, prefix: "2 to ", suffix: "", label: "Registered members", icon: UsersRound },
  { value: 6, prefix: "", suffix: " months", label: "Waiting period", icon: Clock3 },
  { value: 2, prefix: "Within ", suffix: " days", label: "After verification", icon: PackageCheck },
] as const;

export function TrustStrip() {
  const reduced = useReducedMotion();
  return <section aria-label="Nyoni membership facts" className="bg-slate text-cream"><div className="container-shell grid grid-cols-2 lg:grid-cols-4">{facts.map(({ value, prefix, suffix, label, icon: Icon }, index) => <motion.div key={label} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ delay: index * .08, duration: .5 }} className="border-b border-r border-white/15 px-4 py-6 last:border-r-0 lg:border-b-0 lg:px-6"><Icon size={20} className="mb-4 text-[#e2c99c]" aria-hidden="true" /><p className="font-display text-2xl uppercase sm:text-3xl"><NumberTicker value={value} prefix={prefix} suffix={suffix} /></p><p className="mt-1 text-[.65rem] font-semibold uppercase tracking-[.13em] text-white/75">{label}</p></motion.div>)}</div></section>;
}

