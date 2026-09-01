export const WHATSAPP_NUMBER = "27636021868";
export const PHONE_DISPLAY = "063 602 1868";

/**
 * The dial string for tel: links, in E.164.
 *
 * This exists because the number was hardcoded in eight separate files, and on
 * 1 September 2026 the printed poster was found carrying a completely
 * different number (068 848 6283) from the site. One number, one place. If it
 * ever changes, it changes here and nowhere else — and the poster, the Google
 * Business Profile and the WhatsApp account have to be checked by hand.
 */
export const PHONE_E164 = "+27636021868";

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
  /** Native pixel size. These are never upscaled — see the note below. */
  width: number;
  height: number;
  note?: string;
}

interface AddOnItem {
  label: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

interface AddOn {
  name: string;
  price: number;
  items: readonly AddOnItem[];
}

export const packages: readonly MembershipPackage[] = [
  { members: 2, price: 100 },
  { members: 3, price: 140 },
  { members: 4, price: 180 },
  { members: 5, price: 210, featured: true },
  { members: 8, price: 300 },
] as const;

/*
  The images are extracted from Austin's own poster by
  scripts/extract-poster-benefits.mjs. They are AI-rendered composites, not
  photographs of Nyoni's goods, and they top out at 344px wide.

  Two consequences, both deliberate:
    - the layout uses them at or below native size, never upscaled
    - the alt text describes the item, and never claims to be a photograph

  They are placeholders until Austin's own delivery photographs arrive. When
  they do, caption them the way who-we-are.tsx captions the cattle photo:
  as what they are, on a stated date.
*/
export const benefits: readonly Benefit[] = [
  { title: "One cow", detail: "1 × cow", image: "/images/benefits/cow.webp", width: 188, height: 154, alt: "One cow, the largest single item in the basic benefits" },
  { title: "Maize meal", detail: "2 × 50kg maize meal", image: "/images/benefits/maize-meal.webp", width: 156, height: 154, alt: "Two 50kg bags of maize meal" },
  { title: "Firewood", detail: "1 × full load of wood", image: "/images/benefits/firewood.webp", width: 217, height: 154, alt: "A full load of firewood" },
  { title: "Bakkie service", detail: "1-day bakkie service", note: "You choose the day", image: "/images/benefits/bakkie.webp", width: 236, height: 154, alt: "The bakkie provided for one day" },
] as const;

/**
 * The two optional add-ons. R70 each per month, and NOT included in the basic
 * price — that distinction is a claim-register rule, not a layout preference,
 * so it must stay visible wherever these appear.
 */
export const addOns: readonly AddOn[] = [
  {
    name: "On the Go",
    price: 70,
    items: [
      { label: "20 loaves of bread per day", image: "/images/benefits/bread.webp", width: 344, height: 116, alt: "Twenty loaves of bread" },
    ],
  },
  {
    name: "Food Support",
    price: 70,
    items: [
      { label: "6 × 5kg mixed-portion chicken", image: "/images/benefits/chicken.webp", width: 174, height: 116, alt: "Six 5kg packs of mixed-portion chicken" },
      { label: "20 cabbages", image: "/images/benefits/cabbage.webp", width: 157, height: 116, alt: "Twenty cabbages" },
      { label: "5 × 10kg bags of potatoes", image: "/images/benefits/potatoes.webp", width: 179, height: 116, alt: "Five 10kg bags of potatoes" },
    ],
  },
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
