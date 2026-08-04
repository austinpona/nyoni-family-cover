"use client";

import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { packages, whatsappUrl } from "@/lib/site-data";

export function Hero() {
  const [selectedMembers, setSelectedMembers] = useState(5);
  const selectedPlan = packages.find((plan) => plan.members === selectedMembers) ?? packages[0];
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-deep-black pt-[72px] text-cream sm:pt-[104px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(197,161,101,.16),transparent_58%),radial-gradient(ellipse_at_10%_85%,rgba(137,102,47,.14),transparent_52%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-45" aria-hidden="true"><svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">{[0, 1, 2, 3, 4].map((line) => <motion.path key={line} d={`M -100 ${180 + line * 115} C 300 ${30 + line * 80}, 560 ${390 + line * 45}, 900 ${170 + line * 80} S 1320 ${210 + line * 120}, 1540 ${80 + line * 100}`} fill="none" stroke={line % 2 ? "#c5a165" : "#ffffff"} strokeOpacity={line % 2 ? .16 : .06} strokeWidth="1" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={reduced ? undefined : { pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: line * .12, ease: "easeOut" }} />)}</svg></div>
      <div className="absolute right-[6%] top-[16%] hidden select-none lg:block" aria-hidden="true"><span className="serif-accent text-[11rem] leading-none text-light-gold/8">N</span></div>
      <div className="container-shell relative grid min-h-[calc(100dvh-72px)] items-center gap-10 py-12 sm:min-h-[calc(100dvh-104px)] sm:py-16 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div className="relative z-10 min-w-0 max-w-3xl" initial={reduced ? false : { opacity: 0, y: 30 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-7 flex items-center gap-4"><span className="h-px w-12 bg-[#d8bd8a]" /><span className="eyebrow text-[#ead8b4]">Nyoni family cover</span></div>
          <h1 className="display-title text-[clamp(3.05rem,14vw,7rem)] leading-[.9] text-white sm:text-[clamp(3.75rem,7.5vw,7rem)]">Practical support.<span className="serif-accent mt-2 block leading-[1.02] text-[#e2c99c]">When it matters.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">When the day comes, your family receives <strong className="font-semibold text-white">one cow, 100kg of maize meal, a full load of firewood and a bakkie for the day</strong> — not a promise to work out later.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85"><span className="flex items-center gap-2"><Check size={16} className="text-[#d8bd8a]" />From R100 per month</span><span className="flex items-center gap-2"><Check size={16} className="text-[#d8bd8a]" />Cover up to 8 members</span></div>
          <div className="glass-dark mt-7 max-w-xl rounded-lg p-4 sm:p-5"><div className="flex items-end justify-between gap-4"><div><p className="text-[.65rem] font-bold uppercase tracking-[.15em] text-white/70">Choose family size</p><div className="mt-3 flex gap-2">{packages.map((plan) => <button key={plan.members} type="button" onClick={() => setSelectedMembers(plan.members)} aria-pressed={selectedMembers === plan.members} className={`focus-ring grid size-10 place-items-center border text-sm font-bold transition ${selectedMembers === plan.members ? "border-[#d8bd8a] bg-[#d8bd8a] text-charcoal" : "border-white/25 text-white hover:border-[#d8bd8a] hover:text-[#e2c99c]"}`}>{plan.members}</button>)}</div></div><div className="text-right"><p className="font-display text-4xl text-[#e2c99c] sm:text-5xl">R{selectedPlan.price}</p><p className="text-[.65rem] font-semibold uppercase tracking-wider text-white/70">per month</p></div></div></div>
          {/* WhatsApp leads: that is where this conversation actually happens for
              families on mobile data. The online form is the secondary path. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={whatsappUrl(`Hello Nyoni, I would like to join with ${selectedMembers} family members (R${selectedPlan.price} per month).`)} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-3 bg-whatsapp px-6 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_18px_40px_-22px_rgba(0,0,0,.55)] hover:bg-[#1f6440]"><MessageCircle size={17} />Chat on WhatsApp</a><a href={`?option=${selectedMembers}#join`} className="focus-ring inline-flex items-center justify-center gap-3 border border-white/35 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:border-white/70 hover:bg-white/5">Apply online <ArrowRight size={17} /></a></div>
          <p className="mt-4 text-xs leading-5 text-white/65">Six-month waiting period applies — <a href="#waiting-period" className="underline underline-offset-4 transition-colors hover:text-[#e2c99c]">here is why</a>.</p>
        </motion.div>
        <motion.aside initial={reduced ? false : { opacity: 0, y: 34 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .75, delay: .18, ease: [0.22, 1, 0.36, 1] }} className="support-ledger relative mx-auto min-w-0 w-full max-w-[29rem] overflow-hidden rounded-xl p-6 text-white sm:p-8" aria-label="Basic membership support summary">
          <div className="flex items-center justify-between border-b border-white/15 pb-5"><div><p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-white/70">Included support</p><p className="mt-2 font-display text-3xl uppercase">Basic benefits</p></div><div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-light-gold/35 bg-white"><Image src="/images/nyoni-logo.png" width={1100} height={1430} priority sizes="64px" alt="" className="absolute left-1/2 top-0 w-[105%] max-w-none -translate-x-1/2" /></div></div>
          <ol className="divide-y divide-white/12">{["One cow", "2 × 50kg maize meal", "One full load of firewood", "One-day bakkie service"].map((label, index) => <li key={label} className="flex items-center justify-between gap-4 py-4"><span className="text-sm font-medium text-white/90">{label}</span><span className="font-display text-xl text-light-gold">0{index + 1}</span></li>)}</ol>
          <p className="border-t border-white/15 pt-5 text-xs leading-5 text-white/70">Benefits apply after the six-month waiting period and successful verification.</p>
        </motion.aside>
      </div>
    </section>
  );
}
