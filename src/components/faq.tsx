import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-data";

const faqs = [
  ["What is the waiting period?", "The waiting period is 6 months. Monthly payments must be maintained before a qualifying claim can be considered."],
  ["Who can be included?", "Nyoni offers options for 2, 3, 4, 5 or 8 members. Contact Nyoni for guidance on who qualifies."],
  ["What happens if I miss payments?", "A missed month pauses your six-month count — it does not reset it, and your progress is never lost. Three months without payment and the membership lapses, but pay again and it is active again. Nyoni is not a lender: if you stop paying, you owe Nyoni nothing."],
  ["How do I submit a claim?", "Contact Nyoni for the current claim process. Claims are subject to Department of Home Affairs verification."],
  ["When are benefits delivered?", "Qualifying benefits are provided within two days after verification."],
  ["Why is there a six-month waiting period?", "It protects members who are already paying. Without it, someone could join in the week they need to claim, and the fund could not support families who have contributed for years. It applies to everyone equally."],
  ["Are add-ons included in the basic price?", "No. On the Go and Food Support are separate options at R70 per month each."],
  ["How can I contact Nyoni?", "Call or WhatsApp Nyoni on 063 602 1868."],
] as const;

export function Faq() {
  return (
    <section id="faq" className="paper-grain bg-cream pb-20 sm:pb-28">
      <div className="container-shell grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div><h2 className="display-title text-5xl sm:text-6xl">Straight answers.</h2><a href={whatsappUrl("Hello Nyoni, I have a question about membership.")} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-cream hover:bg-gold"><MessageCircle size={16} />Ask Nyoni</a></div>
        <div className="grid gap-x-10 md:grid-cols-2">
          {faqs.map(([question, answer]) => <details key={question} className="group border-t border-charcoal/20 py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 transition-colors hover:text-gold"><span>{question}</span><span className="text-xl text-gold transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-prose pt-4 text-sm leading-6 text-muted">{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
