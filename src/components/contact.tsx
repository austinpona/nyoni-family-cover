import { Building2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, businessHours, company, whatsappUrl } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="paper-grain bg-cream pb-20 sm:pb-28">
      <Reveal className="container-shell">
        <div className="grid border-y border-charcoal/20 py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div><h2 className="display-title max-w-3xl text-5xl sm:text-7xl">Your family should not <span className="serif-accent text-gold">face it alone.</span></h2><p className="mt-5 max-w-xl leading-7 text-muted">Ask about membership, add-ons, applications or claims.</p></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-0"><a href={whatsappUrl("Hello Nyoni, I would like to speak to your team.")} target="_blank" rel="noreferrer" className="focus-ring flex min-h-12 items-center justify-center gap-3 bg-charcoal px-5 py-4 text-xs font-bold uppercase tracking-widest text-cream hover:bg-gold"><MessageCircle size={18} />WhatsApp</a><a href="tel:+27636021868" className="focus-ring flex min-h-12 items-center justify-center gap-3 border border-charcoal/30 px-5 py-4 text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold"><Phone size={18} />Call now</a><a href={`mailto:${EMAIL}`} className="focus-ring flex min-h-12 items-center justify-center gap-3 border border-charcoal/30 px-5 py-4 text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold sm:col-span-2"><Mail size={18} />Email</a></div>
        </div>
        <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4"><div className="flex gap-3"><Phone size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Contact</p><a href="tel:+27636021868" className="mt-1 block text-sm">{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-sm text-muted underline underline-offset-2 hover:text-gold">{EMAIL}</a></div></div>{/* Both facts here are verified: the operating area from the CIPC
              record, the hours confirmed by Austin on 31 August 2026. Neither
              is invented, and both read from site-data so this column, the
              JSON-LD and the Google Business Profile cannot drift apart. */}
          <div className="flex gap-3"><MapPin size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Operating area</p><p className="mt-1 text-sm text-muted">{company.areaServed}</p></div></div><div className="flex gap-3"><Clock size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Business hours</p><p className="mt-1 text-sm text-muted">{businessHours.display}</p></div></div><div className="flex gap-3"><Building2 size={18} className="mt-1 text-gold" /><div><p className="text-xs font-bold uppercase tracking-wider">Based in</p><p className="mt-1 text-sm text-muted">{company.town}, {company.province}</p></div></div></div>
      </Reveal>
    </section>
  );
}
