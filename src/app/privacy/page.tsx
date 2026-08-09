import Link from "next/link";
import { Logo } from "@/components/logo";
import { PHONE_DISPLAY } from "@/lib/site-data";

export const metadata = { title: "Privacy Notice" };

/*
  Written 9 August 2026. Replaces a placeholder that stated ID numbers, email
  and residential address were NOT placed in the WhatsApp message. They are —
  see application-form.tsx, where the message is assembled. Saying otherwise to
  someone handing over an ID number is the thing POPIA most directly forbids.

  TWO FACTS STILL MISSING. Both need Austin, and neither may be invented:
    1. The Information Officer's name. POPIA requires a responsible person.
       Until one is named here, the phone number carries that role.
    2. How long information is kept. Business rule R17 is still open, and the
       notice says so plainly rather than promising a period nobody decided.

  This has not been reviewed by an attorney. It is honest, which the previous
  version was not, but honest is not the same as legally sufficient.
*/

const collected = [
  ["Full name", "To know who the membership belongs to"],
  ["South African ID number", "To confirm identity and to make sure the same person is not registered twice by two different families"],
  ["Mobile number", "To reach you about your membership and payments"],
  ["Email address (optional)", "Only if you choose to give it"],
  ["Residential address, town and province", "To deliver the benefits to the right place"],
  ["Joining date and preferred payment day", "To work out which months are paid"],
  ["Membership option and add-ons", "To know what you have chosen"],
  ["For each additional member: name, ID number, relationship and date of birth", "To know who is covered"],
];

const rights = [
  "Ask what information Nyoni holds about you",
  "Ask for anything incorrect to be corrected",
  "Object to how your information is used",
  "Ask for your information to be deleted",
  "Complain to the Information Regulator of South Africa",
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream py-12">
      <div className="container-shell max-w-3xl">
        <Link href="/"><Logo /></Link>

        <p className="eyebrow mt-16">Privacy</p>
        <h1 className="display-title mt-4 text-5xl">Privacy Notice</h1>
        <p className="mt-4 text-sm text-muted">Last updated 9 August 2026</p>

        <div className="mt-8 space-y-4 leading-7 text-muted">
          <p>
            This notice explains what Nyoni asks for, where it goes, and what you can
            ask us to do about it. It is written plainly on purpose.
          </p>
        </div>

        <div className="mt-8 border-l-2 border-gold bg-soft-cream p-6">
          <h2 className="text-lg font-bold text-charcoal">The important part, first</h2>
          <p className="mt-3 leading-7 text-muted">
            When you finish the application form, this website does not send or store
            anything. It prepares a <strong>WhatsApp message</strong> and opens it for you.
            You can read the whole message before you send it, and you can change or
            delete anything in it.
          </p>
          <p className="mt-3 leading-7 text-muted">
            <strong>That message does contain your ID number, your email address and your
            residential address</strong>, along with the ID number and date of birth of every
            person you add to the membership. Nothing is sent until you press send in
            WhatsApp. If you would rather not send those details that way, phone us
            instead on{" "}
            <a className="font-semibold text-gold" href={`tel:+27${PHONE_DISPLAY.replace(/\D/g, "").slice(1)}`}>
              {PHONE_DISPLAY}
            </a>{" "}
            and we will take the application another way.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">What we ask for, and why</h2>
        <dl className="mt-6 space-y-5">
          {collected.map(([field, why]) => (
            <div key={field} className="border-l border-charcoal/15 pl-4">
              <dt className="font-semibold text-charcoal">{field}</dt>
              <dd className="mt-1 leading-7 text-muted">{why}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 leading-7 text-muted">
          We do not ask about your health, your religion or your race, and you should
          not send us that information.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">Where your information goes</h2>
        <div className="mt-4 space-y-4 leading-7 text-muted">
          <p>
            The message goes to Nyoni&apos;s WhatsApp number and is received on a phone
            belonging to one of the two people who run Nyoni. WhatsApp is operated by
            Meta, and their handling of the message is governed by their own terms, not
            by this notice.
          </p>
          <p>
            Your details are then captured into Nyoni&apos;s own membership records, which
            only the two people who run Nyoni can open. We do not sell your information,
            and we do not give it to anyone for marketing.
          </p>
          <p>
            We may have to share information where the law requires it, or where it is
            necessary to verify a death with the Department of Home Affairs when a claim
            is made.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">How long we keep it</h2>
        <div className="mt-4 space-y-4 leading-7 text-muted">
          <p>
            Nyoni has not yet set a retention period, and we would rather say that than
            print a number we have not decided. Payment records must be kept for tax and
            accounting reasons for several years. Where we no longer need to identify
            you, we remove your identifying details and keep only the financial record.
          </p>
          <p>This notice will be updated as soon as that period is settled.</p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">What you can ask us to do</h2>
        <p className="mt-4 leading-7 text-muted">Under the Protection of Personal Information Act you may:</p>
        <ul className="mt-4 space-y-2 leading-7 text-muted">
          {rights.map((right) => (
            <li key={right} className="flex gap-3">
              <span aria-hidden="true" className="text-gold">—</span>
              <span>{right}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-7 text-muted">
          To ask for any of these, phone{" "}
          <a className="font-semibold text-gold" href={`tel:+27${PHONE_DISPLAY.replace(/\D/g, "").slice(1)}`}>
            {PHONE_DISPLAY}
          </a>. We will ask a few questions to make sure it is really you before we
          change or remove anything — otherwise somebody else could delete your
          membership.
        </p>
        <p className="mt-4 leading-7 text-muted">
          One thing we cannot do is erase a payment record. If money moved, that entry
          stays so the books can still be explained. We remove your name and ID from it
          instead.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-charcoal">Who to contact</h2>
        <p className="mt-4 leading-7 text-muted">
          Nyoni operates in Limpopo and is run by two partners. For anything in this
          notice, phone{" "}
          <a className="font-semibold text-gold" href={`tel:+27${PHONE_DISPLAY.replace(/\D/g, "").slice(1)}`}>
            {PHONE_DISPLAY}
          </a>.
        </p>
        <p className="mt-4 leading-7 text-muted">
          If you are not satisfied with how we answer, you may complain to the
          Information Regulator of South Africa.
        </p>

        <Link href="/" className="mt-12 inline-block text-sm font-bold text-gold">← Return home</Link>
      </div>
    </main>
  );
}
