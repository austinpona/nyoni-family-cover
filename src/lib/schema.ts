import { SITE_URL, absoluteUrl } from "./seo";
import { businessHours, company } from "./site-data";

/*
  Every value here already appears on the site. Note what is deliberately
  absent, and do not add it:

  - No `streetAddress`. The registered office is a private home.
  - No `priceRange`, no `aggregateRating`. There are no reviews. Fabricating
    social proof on a funeral product is fraud.
  - `LocalBusiness`, never `InsuranceAgency` or `FinancialService`. Nyoni is
    registered, not underwritten, and the markup must not imply otherwise.
  - `areaServed` is Limpopo. Never widen it to South Africa.
*/

const ORG_ID = `${SITE_URL}/#organisation`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": ORG_ID,
  name: "Nyoni",
  legalName: company.registeredName,
  identifier: company.registrationNumber,
  description:
    "Community funeral-support membership providing practical support to families during difficult times.",
  slogan: "We Are Family",
  telephone: "+27636021868",
  url: SITE_URL,
  logo: absoluteUrl("/icons/icon-512.png"),
  image: absoluteUrl("/opengraph-image.png"),
  areaServed: { "@type": "AdministrativeArea", name: "Limpopo, South Africa" },
  // Confirmed by Austin, 31 August 2026. Read from site-data so this and the
  // visible contact section cannot disagree — if Google and the page state
  // different hours, Google's version is the one a family acts on.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: businessHours.schema.days,
    opens: businessHours.schema.opens,
    closes: businessHours.schema.closes,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: company.town,
    addressRegion: company.province,
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27636021868",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: ["en"],
  },
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nyoni Family Cover",
  inLanguage: "en-ZA",
  publisher: { "@id": ORG_ID },
} as const;

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(trail: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(entries: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
