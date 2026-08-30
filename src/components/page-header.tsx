import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import type { Crumb } from "@/lib/schema";

/**
 * The one h1 on a subpage.
 *
 * Every section component on this site leads with an h2, because they were all
 * written to sit under the homepage's hero. Mounting them below this header
 * keeps the document outline correct without touching any of them.
 *
 * Top padding clears the fixed header: 72px on mobile, 104px once the charcoal
 * contact bar appears at the sm breakpoint.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  trail,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: ReactNode;
  trail: readonly Crumb[];
}) {
  return (
    <section className="paper-grain bg-cream pt-[72px] sm:pt-[104px]">
      <div className="container-shell pb-14 pt-10 sm:pb-16">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow mt-8 text-gold">{eyebrow}</p>
        <h1 className="display-title mt-4 max-w-4xl text-5xl sm:text-7xl">
          {title}
          {accent && <span className="serif-accent text-gold"> {accent}</span>}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-8 text-muted">{lede}</div>
      </div>
    </section>
  );
}
