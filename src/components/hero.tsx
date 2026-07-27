"use client";

import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { packages, whatsappUrl } from "@/lib/site-data";

export function Hero() {
  const [selectedMembers, setSelectedMembers] = useState(5);
  const selectedPlan = packages.find((plan) => plan.members === selectedMembers) ?? packages[0];
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const logoY = useTransform(scrollYProgress, [0, .25], [0, reduced ? 0 : 55]);
  const logoScale = useTransform(scrollYProgress, [0, .25], [1, reduced ? 1 : .92]);
  const entrance = reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section id="home" className="relative overflow-hidden bg-slate pt-[72px] text-cream sm:pt-[104px]">
      <div className="absolute inset-0 opacity-35" aria-hidden="true"><svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">{[0, 1, 2, 3, 4].map((line) => <motion.path key={line} d={`M -100 ${180 + line * 115} C 300 ${30 + line * 80}, 560 ${390 + line * 45}, 900 ${170 + line * 80} S 1320 ${210 + line * 120}, 1540 ${80 + line * 100}`} fill="none" stroke={line % 2 ? "#c5a165" : "#ffffff"} strokeOpacity={line % 2 ? .11 : .045} strokeWidth="1" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={reduced ? undefined : { pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: line * .12, ease: "easeOut" }} />)}</svg></div>
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(41,40,37,.38),transparent_58%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-[radial-gradient(circle_at_center,rgba(197,161,101,.16),transparent_64%)] lg:block" aria-hidden="true" />
      <div className="container-shell relative grid min-h-[calc(100dvh-72px)] items-center gap-10 py-12 sm:min-h-[calc(100dvh-104px)] sm:py-16 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div className="relative z-10 max-w-3xl" {...entrance} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-7 flex items-center gap-4"><span className="h-px w-12 bg-[#d8bd8a]" /><span className="eyebrow text-[#ead8b4]">Nyoni family cover</span></div>
          <h1 className="display-title text-[clamp(3.75rem,7.5vw,7rem)] leading-[.86] text-white">Practical support.<span className="mt-2 block text-[#e2c99c]">When it matters.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Affordable monthly family cover with clearly defined food, firewood, cow and bakkie support after the waiting period and verification.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80"><span className="flex items-center gap-2"><Check size={16} className="text-[#d8bd8a]" />From R100 per month</span><span className="flex items-center gap-2"><Check size={16} className="text-[#d8bd8a]" />Cover up to 8 members</span></div>
          <div className="glass-dark mt-7 max-w-xl rounded-lg p-4"><div className="flex items-end justify-between gap-4"><div><p className="text-[.62rem] font-bold uppercase tracking-[.15em] text-white/60">Choose family size</p><div className="mt-3 flex gap-2">{packages.map((plan) => <button key={plan.members} type="button" onClick={() => setSelectedMembers(plan.members)} aria-pressed={selectedMembers === plan.members} className={`grid size-9 place-items-center border text-sm font-bold transition ${selectedMembers === plan.members ? "border-[#d8bd8a] bg-[#d8bd8a] text-charcoal" : "border-white/20 text-white hover:border-[#d8bd8a]"}`}>{plan.members}</button>)}</div></div><div className="text-right"><p className="font-display text-4xl text-[#e2c99c]">R{selectedPlan.price}</p><p className="text-[.62rem] uppercase tracking-wider text-white/60">per month</p></div></div></div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={`/?option=${selectedMembers}#join`} className="focus-ring inline-flex items-center justify-center gap-3 bg-[#8d6a35] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#a7844d]">Apply for {selectedMembers} members <ArrowRight size={17} /></a><a href={whatsappUrl("Hello Nyoni, I would like to learn more about your membership options.")} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-3 border border-white/30 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:border-white/60"><MessageCircle size={17} />WhatsApp us</a></div>
        </motion.div>
        <motion.div className="relative mx-auto flex aspect-square w-full max-w-[30rem] items-center justify-center" style={{ y: logoY, scale: logoScale }} {...(reduced ? {} : { initial: { opacity: 0, scale: .88 }, animate: { opacity: 1, scale: 1 } })} transition={{ delay: .15, duration: .9 }}>
          <motion.div className="absolute inset-[12%] rounded-full border border-[#d8bd8a]/30" animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }} aria-hidden="true" /><div className="absolute inset-[20%] rounded-full bg-[#c5a165]/10 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 size-[62%] overflow-hidden rounded-full border-2 border-[#d8bd8a]/40 bg-white shadow-2xl"><Image src="/images/nyoni-logo.png" width={1100} height={1430} priority sizes="(max-width:1024px) 55vw,25vw" alt="Nyoni cow and sunrise emblem" className="absolute left-1/2 top-0 w-[104%] max-w-none -translate-x-1/2" /></div>
          {[["One cow", "left-[1%] top-[20%]"], ["Maize meal", "right-0 top-[18%]"], ["Firewood", "bottom-[16%] left-[2%]"], ["Bakkie service", "bottom-[13%] right-0"]].map(([label, position], index) => <motion.div key={label} className={`glass-dark absolute z-20 rounded-md px-3 py-2 text-[.62rem] font-bold uppercase tracking-[.13em] text-white ${position}`} initial={reduced ? false : { opacity: 0, scale: .8 }} animate={reduced ? undefined : { opacity: 1, scale: 1, y: [0, index % 2 ? -5 : 5, 0] }} transition={{ opacity: { delay: .7 + index * .12 }, scale: { delay: .7 + index * .12 }, y: { delay: 1.2 + index * .2, duration: 4 + index * .35, repeat: Infinity } }}><span className="mr-2 text-[#d8bd8a]">0{index + 1}</span>{label}</motion.div>)}
        </motion.div>
      </div>
    </section>
  );
}
