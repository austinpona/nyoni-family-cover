import Link from "next/link";
import { Logo } from "@/components/logo";
import { packages, benefits, PHONE_DISPLAY, company } from "@/lib/site-data";
import { PAGES, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership Terms",
  description:
    "The decided conditions of Nyoni membership: what you pay, the six-month waiting period, what lapsing means, and how qualifying claims are verified.",
  path: PAGES.terms.path,
});

/*
  Written 9 August 2026. Replaces a placeholder saying the terms "have not yet
  been supplied" — while the application form asked people to tick that they
  agreed to them.

  Everything on this page is either already published elsewhere on this site or
  is a business rule recorded as DECIDED in the operations repo
  (docs/BUSINESS_RULES.md, Part A). Nothing here is invented.

  THIS IS NOT THE FULL CONTRACT, deliberately. Whether Nyoni is legally
  insurance, a funeral policy or a burial-society arrangement has not been
  settled by an attorney, and that answer changes what the full terms must say.
  Until then this page states the conditions that are decided, honestly, rather
  than either staying blank or inventing a contract.
*/

const tel = `tel:+27${PHONE_DISPLAY.replace(/\D/g, "").slice(1)}`;

const sections = [
  {
    heading: "What you pay",
    points: [
      "Membership is paid monthly. The amount depends on how many people are covered.",
      "A month counts only when it is paid in full. A part payment does not advance your cover.",
      "You choose your preferred payment day when you join.",
    ],
  },
  {
    heading: "The waiting period",
    points: [
      "Cover begins after six paid months — counted in months actually paid, not months on the calendar.",
      "Missing a month pauses the count. It does not reset it, and you never lose the months you have already paid.",
      "Someone added to your membership later is not covered immediately. Their own waiting period starts when they are added.",
    ],
  },
  {
    heading: "Falling behind",
    points: [
      "One or two months unpaid: your membership is behind, and we will phone you.",
      "Three or more months unpaid: the membership has lapsed and cannot be claimed on.",
      "A lapse is not the end. Pay again and the membership becomes active, and if you return within twelve months your paid months are still counted.",
      "Your months must be paid up before a claim can be made. Nyoni tracks no arrears and does not lend: if you stop paying, you owe Nyoni nothing.",
    ],
  },
  {
    heading: "Making a claim",
    points: [
      "Claims are verified with the Department of Home Affairs.",
      "Once verified, the qualifying benefits are provided within two days.",
      "The benefits are delivered in kind. Nyoni does not pay out a cash sum in place of them.",
    ],
  },
  {
    heading: "If someone is registered twice",
    points: [
      "If the same person is registered by more than one family member, only one cow is issued for that person.",
      "Each affected membership receives R1 500. This amount is per affected membership and is not split between them.",
      "This is why we ask for ID numbers — so we can warn you before it happens rather than after.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream py-12">
      <div className="container-shell max-w-3xl">
        <Link href="/"><Logo /></Link>

        <p className="eyebrow mt-16">Legal information</p>
        <h1 className="display-title mt-4 text-5xl">Membership Terms</h1>
        <p className="mt-4 text-sm text-muted">Last updated 9 August 2026</p>

        <div className="mt-8 border-l-2 border-gold bg-soft-cream p-6">
          <p className="leading-7 text-muted">
            These are the conditions that apply to a Nyoni membership today. Nyoni&apos;s
            full written contract is still being finalised, and this page will be
            replaced when it is ready. Nothing on this page will be changed to your
            disadvantage without telling you first.
          </p>
          <p className="mt-3 leading-7 text-muted">
            If anything here is unclear, phone{" "}
            <a className="font-semibold text-gold" href={tel}>{PHONE_DISPLAY}</a> and ask
            before you join. We would rather answer the question than have you find out later.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">Monthly contributions</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-charcoal/15">
                <th className="py-3 text-sm font-bold text-charcoal">People covered</th>
                <th className="py-3 text-sm font-bold text-charcoal">Each month</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((item) => (
                <tr key={item.members} className="border-b border-charcoal/10">
                  <td className="py-3 text-muted">{item.members} members</td>
                  <td className="py-3 font-semibold text-charcoal">R{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">What a claim provides</h2>
        <ul className="mt-4 space-y-2 leading-7 text-muted">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex gap-3">
              <span aria-hidden="true" className="text-gold">—</span>
              <span><strong className="text-charcoal">{benefit.title}:</strong> {benefit.detail}</span>
            </li>
          ))}
        </ul>

        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mt-12 text-2xl font-bold text-charcoal">{section.heading}</h2>
            <ul className="mt-4 space-y-3 leading-7 text-muted">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="text-gold">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <h2 className="mt-12 text-2xl font-bold text-charcoal">Your information</h2>
        <p className="mt-4 leading-7 text-muted">
          How Nyoni handles your personal details is set out in the{" "}
          <Link className="font-semibold text-gold" href="/privacy">Privacy Notice</Link>.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">Questions</h2>
        <p className="mt-4 leading-7 text-muted">
          Phone <a className="font-semibold text-gold" href={tel}>{PHONE_DISPLAY}</a>.
          Nyoni is run by {company.manager}, {company.managerRole.toLowerCase()}, from{" "}
          {company.town}, and serves {company.province}. The registered entity is{" "}
          {company.registeredName}, registration {company.registrationNumber}. Registration
          confirms the company exists; it is not an approval, guarantee or insurance licence.
        </p>

        <Link href="/" className="mt-12 inline-block text-sm font-bold text-gold">← Return home</Link>
      </div>
    </main>
  );
}
