import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { PAGES, pageMetadata } from "@/lib/seo";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site-data";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page Not Found",
    description:
      "That page does not exist on the Nyoni site. Here is where to find membership options, how it works, answers to common questions and how to reach us.",
    path: "/404",
    noindex: true,
  }),
  // Explicitly cancels the root layout's canonical, which would otherwise be
  // inherited here and claim the homepage as this page's canonical version.
  alternates: { canonical: null },
};

const destinations = [PAGES.home, PAGES.cover, PAGES.howItWorks, PAGES.faq, PAGES.contact] as const;

/*
  Deliberately does not render <Navigation />. That component is a client
  component built around homepage anchors, and half its links would be dead
  here. A person who has just hit a wrong address needs the plain list.

  The reassurance line is not filler. This is a funeral product; someone who
  lands on an error page after following an old link has a specific fear, and
  it is worth answering in one sentence.
*/
export default function NotFound() {
  return (
    <>
      <main className="paper-grain flex min-h-[70vh] flex-col justify-center bg-cream py-20">
        <div className="container-shell">
          <Link href="/" aria-label="Nyoni home" className="focus-ring inline-block">
            <Logo compact />
          </Link>
          <p className="eyebrow mt-12 text-gold">Error 404</p>
          <h1 className="display-title mt-4 max-w-3xl text-5xl sm:text-7xl">
            That page is not <span className="serif-accent text-gold">here.</span>
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            The address you followed does not exist on this site. Nothing has gone wrong with your
            membership. Here is everything on nyonicover.co.za.
          </p>
          <nav aria-label="Site pages" className="mt-10 max-w-xl border-t border-charcoal/20">
            {destinations.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="focus-ring flex items-center justify-between border-b border-charcoal/15 py-5 font-display text-2xl uppercase transition-colors hover:text-gold"
              >
                {page.label}
                <span aria-hidden="true" className="text-gold">
                  &rarr;
                </span>
              </Link>
            ))}
          </nav>
          <p className="mt-8 text-sm leading-6 text-muted">
            Or call Nyoni on{" "}
            <a
              href={`tel:${PHONE_E164}`}
              className="font-semibold text-charcoal underline underline-offset-4 hover:text-gold"
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
