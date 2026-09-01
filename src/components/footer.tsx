import Link from "next/link";
import { Logo } from "./logo";
import { PAGES } from "@/lib/seo";
import { EMAIL, PHONE_DISPLAY, PHONE_E164, company } from "@/lib/site-data";

// The footer is now the site index, and it is what a crawler follows from
// every page. Every indexable URL appears here exactly once — Terms and
// Privacy included, which is why they were removed from the contact column.
const links = [
  ["Home", "/"],
  ["Funeral cover", PAGES.cover.path],
  ["How it works", PAGES.howItWorks.path],
  ["FAQ", PAGES.faq.path],
  ["Contact", PAGES.contact.path],
  ["Who we are", "/#who-we-are"],
  ["Membership terms", PAGES.terms.path],
  ["Privacy notice", PAGES.privacy.path],
] as const;

export function Footer() {
  return (
    <footer className="bg-deep-black pt-14 pb-10 text-cream">
      <div className="container-shell border-b border-white/12 pb-12">
        <p className="serif-accent text-[clamp(2.6rem,8vw,5.5rem)] leading-none text-[#e2c99c]">We are family.</p>
      </div>
      <div className="container-shell grid gap-10 pt-10 md:grid-cols-[1fr_1fr_.7fr]">
        <div><Logo compact inverse /><p className="mt-5 max-w-xs text-sm leading-6 text-cream/65">Dignified, practical community support for families across Limpopo.</p><p className="mt-5 max-w-xs text-xs leading-5 text-cream/45">{company.registeredName}<br />Registration {company.registrationNumber}<br />{company.town}, {company.province}</p></div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm text-cream/65">{links.map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-light-gold">{label}</Link>)}</nav>
        <div><p className="text-xs font-bold uppercase tracking-widest text-light-gold">Contact</p><a href={`tel:${PHONE_E164}`} className="mt-3 block font-display text-2xl hover:text-light-gold">{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`} className="mt-2 block break-all text-sm text-cream/65 hover:text-light-gold">{EMAIL}</a></div>
      </div>
      <div className="container-shell mt-10 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs leading-5 text-cream/55 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Nyoni. All rights reserved.</p><p>Website content is subject to official Nyoni membership terms and verification.</p></div>
    </footer>
  );
}
