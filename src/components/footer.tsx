import { Logo } from "./logo";
import { PHONE_DISPLAY } from "@/lib/site-data";

const links = [["Home", "#home"], ["Packages", "#packages"], ["Benefits", "#benefits"], ["How it works", "#how-it-works"], ["Conditions", "#conditions"], ["FAQ", "#faq"]] as const;

export function Footer() {
  return (
    <footer className="bg-deep-black pt-14 pb-10 text-cream">
      <div className="container-shell border-b border-white/12 pb-12">
        <p className="serif-accent text-[clamp(2.6rem,8vw,5.5rem)] leading-none text-[#e2c99c]">We are family.</p>
      </div>
      <div className="container-shell grid gap-10 pt-10 md:grid-cols-[1fr_1fr_.7fr]">
        <div><Logo compact inverse /><p className="mt-5 max-w-xs text-sm leading-6 text-cream/65">Dignified, practical community support for families.</p></div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm text-cream/65">{links.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-light-gold">{label}</a>)}</nav>
        <div><p className="text-xs font-bold uppercase tracking-widest text-light-gold">Contact</p><a href="tel:+27636021868" className="mt-3 block font-display text-2xl hover:text-light-gold">{PHONE_DISPLAY}</a><div className="mt-5 flex gap-4 text-xs text-cream/55"><a href="/terms" className="transition-colors hover:text-cream">Terms</a><a href="/privacy" className="transition-colors hover:text-cream">Privacy</a></div></div>
      </div>
      <div className="container-shell mt-10 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs leading-5 text-cream/55 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Nyoni. All rights reserved.</p><p>Website content is subject to official Nyoni membership terms and verification.</p></div>
    </footer>
  );
}
