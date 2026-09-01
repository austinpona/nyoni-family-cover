import { MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, whatsappUrl } from "@/lib/site-data";

// Exported so /faq can build its FAQPage JSON-LD from the same array the page
// renders. Markup that disagrees with the visible answer is the usual reason
// Google rejects an FAQ rich result.
export const faqs = [
  ["What is the waiting period?", "The waiting period is 6 months. Monthly payments must be maintained before a qualifying claim can be considered."],
  ["Who can be included?", "Nyoni offers options for 2, 3, 4, 5 or 8 members. Contact Nyoni for guidance on who qualifies."],
  ["What happens if I miss payments?", "A missed month pauses your six-month count — it does not reset it, and your progress is never lost. Three months without payment and the membership lapses, but pay again and it is active again. Nyoni is not a lender: if you stop paying, you owe Nyoni nothing."],
  ["How do I submit a claim?", "Contact Nyoni for the current claim process. Claims are subject to Department of Home Affairs verification."],
  ["When are benefits delivered?", "Qualifying benefits are provided within two days after verification."],
  ["Why is there a six-month waiting period?", "It protects members who are already paying. Without it, someone could join in the week they need to claim, and the fund could not support families who have contributed for years. It applies to everyone equally."],
  ["Are add-ons included in the basic price?", "No. On the Go and Food Support are separate options at R70 per month each."],
  ["How can I contact Nyoni?", `Call or WhatsApp Nyoni on ${PHONE_DISPLAY}.`],
] as const;

/*
  Dark on purpose. DESIGN.md forbids three consecutive light sections, and the
  homepage tail ran Conditions, the application form, the FAQ and Contact all
  on cream — four in a row. Flipping the FAQ breaks the run without touching
  the application form, which is the one component worth leaving alone.
*/
export function Faq() {
  return (
    <section id="faq" className="section-pad bg-deep-black text-cream">
      <div className="container-shell grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div><h2 className="display-title text-5xl sm:text-6xl">Straight <span className="serif-accent text-[#e2c99c]">answers.</span></h2><a href={whatsappUrl("Hello Nyoni, I have a question about membership.")} target="_blank" rel="noreferrer" className="focus-ring mt-7 inline-flex items-center gap-2 bg-light-gold px-5 py-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-cream"><MessageCircle size={16} />Ask Nyoni</a></div>
        <div className="grid gap-x-10 md:grid-cols-2">
          {faqs.map(([question, answer]) => <details key={question} className="group border-t border-white/12 py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 transition-colors hover:text-light-gold"><span>{question}</span><span className="text-xl text-light-gold transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-prose pt-4 text-sm leading-6 text-cream/70">{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
