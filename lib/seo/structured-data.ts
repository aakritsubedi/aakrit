import { absoluteUrl, person, siteName, siteUrl } from "@/config/site";

/**
 * schema.org JSON-LD for the site identity, emitted server-side in the document
 * head so it is present in the initial HTML rather than injected after hydration.
 */

export const PERSON_ID = `${siteUrl}/#person`;
export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: person.address.locality,
    addressRegion: person.address.region,
    addressCountry: person.address.country,
  };
}

function contactPoints() {
  const base = {
    "@type": "ContactPoint",
    contactType: "business inquiries",
    email: person.email,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Nepali"],
  };

  return [person.telephone ? { ...base, telephone: person.telephone } : base];
}

export function buildStructuredData() {
  const personNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    url: `${siteUrl}/`,
    description: person.description,
    jobTitle: person.jobTitle,
    email: `mailto:${person.email}`,
    ...(person.telephone ? { telephone: person.telephone } : {}),
    image: person.image,
    address: postalAddress(),
    knowsAbout: [...person.knowsAbout],
    sameAs: [...person.sameAs],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Kantipur Engineering College, Tribhuvan University",
    },
    worksFor: { "@id": ORGANIZATION_ID },
  };

  const organizationNode = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteName,
    legalName: person.name,
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
    },
    image: person.image,
    description:
      "Independent software engineering practice of Aakrit Subedi: full-stack product development, LLM application work, and engineering leadership for distributed teams.",
    email: `mailto:${person.email}`,
    ...(person.telephone ? { telephone: person.telephone } : {}),
    address: postalAddress(),
    contactPoint: contactPoints(),
    founder: { "@id": PERSON_ID },
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
  };

  const websiteNode = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${siteName} — ${person.jobTitle}`,
    url: `${siteUrl}/`,
    description: person.description,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": PERSON_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [personNode, organizationNode, websiteNode],
  };
}

/**
 * JSON-LD is injected as raw HTML, so `<` must not be able to close the script
 * tag early. Escaping the three characters below is the standard mitigation.
 */
export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
