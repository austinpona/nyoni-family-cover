export const WHATSAPP_NUMBER = "27636021868";
export const PHONE_DISPLAY = "063 602 1868";

/**
 * Public contact address. Confirmed by Austin on 31 August 2026.
 *
 * Note the application form still deliberately does NOT email anything — it
 * builds a WhatsApp message the visitor sends themselves, so ID numbers never
 * travel through a mail server. This address is for enquiries, not for
 * receiving applications. See the POPIA note in README before changing that.
 */
export const EMAIL = "austin@nyonicover.co.za";

interface MembershipPackage {
  members: number;
  price: number;
  featured?: boolean;
}

interface Benefit {
  title: string;
  detail: string;
  image: string;
  alt: string;
  note?: string;
}

export const packages: readonly MembershipPackage[] = [
  { members: 2, price: 100 },
  { members: 3, price: 140 },
  { members: 4, price: 180 },
  { members: 5, price: 210, featured: true },
  { members: 8, price: 300 },
] as const;

export const benefits: readonly Benefit[] = [
  { title: "One cow", detail: "1 × cow", image: "/images/benefits/cow.svg", alt: "A cow representing Nyoni's basic support benefit" },
  { title: "Maize meal", detail: "2 × 50kg maize meal", image: "/images/benefits/maize-meal.svg", alt: "Two bags of maize meal for practical family support" },
  { title: "Firewood", detail: "1 × full load of wood", image: "/images/benefits/firewood.svg", alt: "A full load of neatly stacked firewood" },
  { title: "Bakkie service", detail: "1-day bakkie service", note: "You choose the day", image: "/images/benefits/bakkie.svg", alt: "A white bakkie providing community transport support" },
] as const;

// Wording here is bound to the claim register (nyoni marketing tean/CLAIMS.md)
// and to BUSINESS_RULES.md A4b. Nyoni tracks no arrears, so the site must never
// imply a balance owed — the old "outstanding payments must be settled" line
// contradicted the business rules and has been removed.
export const conditions = [
  "Three months without payment and the membership lapses. Pay again and the membership is active again.",
  "A missed month pauses your count. It does not reset it. Your progress is never lost.",
  "Nyoni is not a lender. If you stop paying, you owe Nyoni nothing. Your months must simply be paid up to claim.",
  "Claims are subject to Department of Home Affairs verification.",
  "Qualifying benefits are provided within two days after verification.",
  "If one person is registered by more than one family member, only one cow is issued and each affected membership receives R1 500.",
] as const;

/**
 * Verified from the CIPC COR 14.3 certificate on 25 August 2026.
 *
 * Registration means the company legally exists. It does NOT mean the product
 * is approved, underwritten or insured, and it must never be printed near those
 * words. The registered office is a private home and is deliberately omitted.
 */
export const company = {
  registeredName: "Nyoni Community Cover (Pty) Ltd",
  registrationNumber: "2026/657999/07",
  manager: "Austin Pona",
  managerRole: "Manager",
  town: "Phalaborwa",
  province: "Limpopo",
  areaServed: "Limpopo. All of it.",
} as const;

/**
 * Business hours. Confirmed by Austin on 31 August 2026.
 *
 * One source of truth for three consumers: the contact section, the
 * LocalBusiness JSON-LD in lib/schema.ts, and the Google Business Profile.
 * If these ever disagree, Google shows whichever it likes and a family is
 * given the wrong information — so change this constant, never the copies.
 *
 * `display` is for people. `schema` is the machine form: 24-hour times and
 * schema.org day names, which is what OpeningHoursSpecification requires.
 */
export const businessHours = {
  display: "Monday to Friday, 08:30 – 17:00",
  schema: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "17:00",
  },
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
