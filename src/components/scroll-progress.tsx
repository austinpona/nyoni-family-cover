"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  if (reduced) return null;
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-light-gold" style={{ scaleX }} />;
}
