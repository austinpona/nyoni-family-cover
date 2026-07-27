"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function NumberTicker({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: .8 });
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, value, { duration: .9, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [count, inView, reduced, value]);

  return <span ref={ref}>{prefix}<motion.span>{rounded}</motion.span>{suffix}</span>;
}
