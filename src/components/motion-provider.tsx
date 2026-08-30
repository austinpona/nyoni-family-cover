"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the motion features this site actually uses.
 *
 * domAnimation = animations + exit + hover/focus/press gestures + inView.
 * It excludes layout animations and drag, and nothing here uses either —
 * verified against framer-motion 12.42.2's features-animation.mjs and
 * features-max.mjs. `whileInView` in Reveal and TrustStrip keeps working
 * because inView ships inside gestureAnimations, which domAnimation spreads.
 *
 * `strict` makes a stray `motion.*` component throw at runtime rather than
 * silently pulling the full bundle back in, which is the usual way this
 * optimisation quietly stops working months later.
 *
 * Children are passed through, so server components below this stay server
 * components.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
