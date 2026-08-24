import { describe, expect, it } from "vitest";

import { person, siteUrl } from "@/config/site";
import {
  ORGANIZATION_ID,
  PERSON_ID,
  buildStructuredData,
  serializeStructuredData,
} from "@/lib/seo/structured-data";

const graph = buildStructuredData()["@graph"] as Record<string, any>[];
const node = (type: string) => graph.find((entry) => entry["@type"] === type)!;

describe("JSON-LD graph", () => {
  it("declares the schema.org context", () => {
    expect(buildStructuredData()["@context"]).toBe("https://schema.org");
  });

  it("contains Person, Organization and WebSite nodes", () => {
    expect(graph.map((entry) => entry["@type"]).sort()).toEqual([
      "Organization",
      "Person",
      "WebSite",
    ]);
  });

  it("gives the Person the fields an agent needs for entity resolution", () => {
    const personNode = node("Person");

    expect(personNode.name).toBe(person.name);
    expect(personNode.url).toBe(`${siteUrl}/`);
    expect(personNode.description).toBeTruthy();
    expect(personNode.jobTitle).toBe(person.jobTitle);
    expect(personNode.image).toBe(person.image);
    expect(personNode.sameAs).toEqual([...person.sameAs]);
    expect(personNode.address["@type"]).toBe("PostalAddress");
  });

  it("gives the Organization both a contactPoint and a postal address", () => {
    const organization = node("Organization");

    expect(organization.name).toBeTruthy();
    expect(organization.url).toBe(`${siteUrl}/`);
    expect(organization.description).toBeTruthy();

    expect(organization.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: person.address.locality,
      addressCountry: person.address.country,
    });

    expect(Array.isArray(organization.contactPoint)).toBe(true);
    const [contact] = organization.contactPoint;
    expect(contact["@type"]).toBe("ContactPoint");
    expect(contact.contactType).toBeTruthy();
    expect(contact.email).toBe(person.email);
    expect(contact.telephone).toBe(person.telephone);
  });

  it("cross-references its nodes by @id rather than duplicating them", () => {
    expect(node("Person").worksFor).toEqual({ "@id": ORGANIZATION_ID });
    expect(node("Organization").founder).toEqual({ "@id": PERSON_ID });
    expect(node("WebSite").publisher).toEqual({ "@id": ORGANIZATION_ID });
  });

  it("uses absolute URLs everywhere", () => {
    const urls = JSON.stringify(graph).match(/"(https?:[^"]+)"/g) ?? [];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(() => new URL(url.slice(1, -1))).not.toThrow();
    }
  });
});

describe("serializeStructuredData", () => {
  it("produces JSON that parses back to the same graph", () => {
    const data = buildStructuredData();
    expect(JSON.parse(serializeStructuredData(data))).toEqual(data);
  });

  it("escapes characters that could break out of the script tag", () => {
    const serialized = serializeStructuredData({ evil: "</script><img src=x>&" });

    expect(serialized).not.toContain("</script>");
    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain(">");
    expect(serialized).not.toContain("&");
    expect(JSON.parse(serialized)).toEqual({ evil: "</script><img src=x>&" });
  });
});
