import { Logo } from "./logo";
import { PHONE_DISPLAY } from "@/lib/site-data";

const links = [["Home", "#home"], ["Packages", "#packages"], ["Benefits", "#benefits"], ["How it works", "#how-it-works"], ["Conditions", "#conditions"], ["FAQ", "#faq"]] as const;

export function Footer() {
  return (
    <footer className="paper-grain border-t border-charcoal/20 bg-cream py-10 text-charcoal">
      <div className="container-shell grid gap-10 md:grid-cols-[1fr_1fr_.7fr]">
        <div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-muted">Dignified, practical community support for families.</p></div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm text-muted">{links.map(([label, href]) => <a key={href} href={href} className="hover:text-gold">{label}</a>)}</nav>
        <div><p className="text-xs font-bold uppercase tracking-widest text-gold">Contact</p><a href="tel:+27636021868" className="mt-3 block font-display text-2xl">{PHONE_DISPLAY}</a><div className="mt-5 flex gap-4 text-xs text-muted"><a href="/terms" className="hover:text-charcoal">Terms</a><a href="/privacy" className="hover:text-charcoal">Privacy</a></div></div>
      </div>
      <div className="container-shell mt-10 flex flex-col gap-3 border-t border-charcoal/15 pt-6 text-xs leading-5 text-muted sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Nyoni. All rights reserved.</p><p>Website content is subject to official Nyoni membership terms and verification.</p></div>
    </footer>
  );
}
