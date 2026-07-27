"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { whatsappUrl } from "@/lib/site-data";

const links = [["Packages", "#packages"], ["Benefits", "#benefits"], ["How it works", "#how-it-works"], ["Conditions", "#conditions"], ["FAQ", "#faq"]] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll); };
  }, [open]);

  return (
    <header className={`glass-light fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 transition-shadow ${scrolled ? "shadow-[0_12px_35px_-24px_rgba(41,40,37,.55)]" : ""}`}>
      <div className="hidden bg-charcoal text-cream sm:block"><div className="container-shell flex h-8 items-center justify-between text-[.65rem] font-semibold uppercase tracking-[.12em]"><p>Practical support for South African families</p><a href={whatsappUrl("Hello Nyoni, I would like help with membership.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#d8bd8a] hover:text-white"><MessageCircle size={13} />Speak to Nyoni on WhatsApp</a></div></div>
      <div className="container-shell flex h-[72px] items-center justify-between">
        <a href="#home" aria-label="Nyoni home"><Logo compact /></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="focus-ring text-[.7rem] font-semibold uppercase tracking-[.1em] text-muted hover:text-gold">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+27636021868" className="focus-ring inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold"><Phone size={15} aria-hidden="true" />063 602 1868</a>
          <a href="#join" className="focus-ring rounded-md bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream hover:bg-gold">Join Nyoni</a>
        </div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="focus-ring grid size-11 place-items-center border border-charcoal/20 lg:hidden">
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" className={`fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-cream px-5 py-6 transition duration-200 sm:top-[104px] sm:h-[calc(100dvh-104px)] lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <nav aria-label="Mobile navigation" className="mx-auto flex max-w-xl flex-col border-t border-charcoal/15">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-charcoal/15 py-4 font-display text-3xl uppercase">{label}</a>)}
          <a href="#join" onClick={() => setOpen(false)} className="mt-6 bg-charcoal px-5 py-4 text-center text-sm font-bold uppercase tracking-widest text-cream">Join Nyoni</a>
          <a href="tel:+27636021868" className="mt-4 text-center text-sm font-semibold">Call 063 602 1868</a>
        </nav>
      </div>
    </header>
  );
}
