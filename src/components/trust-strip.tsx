"use client";

import { Clock3, PackageCheck, UsersRound, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { NumberTicker } from "./number-ticker";

const facts = [
  { value: 100, prefix: "From R", suffix: "", label: "Monthly membership", icon: WalletCards },
  { value: 8, prefix: "2 to ", suffix: "", label: "Registered members", icon: UsersRound },
  { value: 6, prefix: "", suffix: " months", label: "Waiting period", icon: Clock3 },
  { value: 2, prefix: "Within ", suffix: " days", label: "After verification", icon: PackageCheck },
] as const;

export function TrustStrip() {
  return <section aria-label="Nyoni membership facts" className="border-t border-gold/30 bg-deep-black text-cream"><div className="container-shell grid grid-cols-2 lg:grid-cols-4">{facts.map(({ value, prefix, suffix, label, icon: Icon }, index) => <motion.div key={label} initial={false} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="border-b border-r border-white/12 px-4 py-7 last:border-r-0 lg:border-b-0 lg:px-6"><Icon size={20} className="mb-4 text-light-gold" aria-hidden="true" /><p className="font-display text-3xl uppercase sm:text-4xl"><NumberTicker value={value} prefix={prefix} suffix={suffix} /></p><p className="mt-2 text-[.65rem] font-semibold uppercase tracking-[.13em] text-white/85">{label}</p></motion.div>)}</div></section>;
}

