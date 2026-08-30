import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * The visible breadcrumb and its markup are emitted together, from one array,
 * so the two can never drift apart — which is the usual way breadcrumb rich
 * results get rejected.
 */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className="text-[.7rem] font-semibold uppercase tracking-[.12em] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-charcoal">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="focus-ring transition-colors hover:text-gold">
                    {crumb.name}
                  </Link>
                )}
                {!last && (
                  <span aria-hidden="true" className="text-gold">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
