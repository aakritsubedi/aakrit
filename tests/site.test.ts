import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { buildLlmsTxt } from "@/lib/content/llms-txt";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { aboutPage, contactPage, privacyPage, type LongFormPage } from "@/config/pages";
import {
  absoluteUrl,
  findRoute,
  isKnownRoute,
  normalizePath,
  siteRoutes,
  siteUrl,
} from "@/config/site";
import { markdownPathFor } from "@/lib/content/markdown";
import { alternatesFor, buildPageMetadata } from "@/lib/seo/metadata";

describe("route config", () => {
  it("has unique, normalised paths", () => {
    const paths = siteRoutes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(normalizePath(path)).toBe(path);
    }
  });

  it("gives every route a description and a concrete agent use case", () => {
    for (const route of siteRoutes) {
      expect(route.description.length).toBeGreaterThan(40);
      expect(route.agentUseCase.length).toBeGreaterThan(40);
    }
  });

  it("includes the trust-anchor pages agents check", () => {
    for (const path of ["/about", "/contact", "/privacy"]) {
      expect(isKnownRoute(path)).toBe(true);
    }
  });

  it("normalises trailing slashes and casing when matching", () => {
    expect(findRoute("/About/")?.path).toBe("/about");
    expect(isKnownRoute("/definitely-not-a-page")).toBe(false);
  });

  /**
   * Everything else in this suite is derived from `siteRoutes`, so a route
   * dropped from the config would fail nothing. This is the one check that
   * compares the config against what the app router actually serves: a page
   * missing here is a page missing from the sitemap, llms.txt and its markdown
   * twin.
   */
  it("matches the pages the app router actually renders", () => {
    const appDir = fileURLToPath(new URL("../app", import.meta.url));

    const rendered = readdirSync(appDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          !entry.name.startsWith("_") &&
          existsSync(join(appDir, entry.name, "page.tsx"))
      )
      .map((entry) => `/${entry.name}`);

    if (existsSync(join(appDir, "page.tsx"))) rendered.push("/");

    expect(rendered.sort()).toEqual(siteRoutes.map((route) => route.path).sort());
  });
});

describe("trust-anchor page content", () => {
  const pages: [string, LongFormPage][] = [
    ["/about", aboutPage],
    ["/contact", contactPage],
    ["/privacy", privacyPage],
  ];

  it.each(pages)("%s carries well over 500 characters of prose", (_path, page) => {
    const text = [
      ...page.intro,
      ...page.sections.flatMap((section) => [
        section.heading,
        ...(section.paragraphs ?? []),
        ...(section.bullets ?? []),
        ...(section.links ?? []).map((link) => `${link.label} ${link.note ?? ""}`),
      ]),
    ].join(" ");

    expect(text.length).toBeGreaterThan(500);
  });

  it.each(pages)("%s has a title and at least two sections", (_path, page) => {
    expect(page.title).toBeTruthy();
    expect(page.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("page metadata", () => {
  it("sets a canonical URL and a markdown alternate for every route", () => {
    for (const route of siteRoutes) {
      const alternates = alternatesFor(route.path) as {
        canonical: string;
        types: Record<string, string>;
      };

      expect(alternates.canonical).toBe(absoluteUrl(route.path));
      expect(alternates.types["text/markdown"]).toBe(
        absoluteUrl(markdownPathFor(route.path))
      );
    }
  });

  it("builds complete metadata for the pages that use the helper", () => {
    const metadata = buildPageMetadata("/contact") as any;

    expect(metadata.title).toBe("Contact | Aakrit Subedi");
    expect(metadata.alternates.canonical).toBe(`${siteUrl}/contact`);
    expect(metadata.openGraph.type).toBe("website");
    expect(metadata.openGraph.images[0].url).toContain("og-image.png");
  });

  it("refuses to build metadata for an unconfigured route", () => {
    expect(() => buildPageMetadata("/ghost")).toThrow();
  });
});

describe("sitemap", () => {
  it("lists exactly the configured routes as absolute URLs", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(
      siteRoutes.map((route) => absoluteUrl(route.path))
    );
  });
});

describe("robots", () => {
  it("allows crawling and points at the sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules!];

    expect(rules[0].userAgent).toBe("*");
    expect(rules[0].allow).toBe("/");
    expect(result.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });
});

describe("llms.txt", () => {
  const content = buildLlmsTxt();
  const lines = content.split("\n");

  it("starts with a single H1 naming the site", () => {
    expect(lines[0]).toBe("# Aakrit Subedi");
    expect(lines.filter((line) => line.startsWith("# "))).toHaveLength(1);
  });

  it("follows the H1 with a blockquote summary", () => {
    expect(lines[2].startsWith("> ")).toBe(true);
    expect(lines[2].length).toBeGreaterThan(120);
  });

  it("puts free-form detail before the first H2, as llmstxt.org requires", () => {
    const firstHeadingIndex = lines.findIndex((line) => line.startsWith("## "));
    const preamble = lines.slice(3, firstHeadingIndex);

    expect(firstHeadingIndex).toBeGreaterThan(3);
    expect(preamble.some((line) => line.startsWith("#"))).toBe(false);
    expect(preamble.join("\n").trim().length).toBeGreaterThan(0);
  });

  it("has a when-to-use section that names concrete jobs", () => {
    expect(content).toContain("## When to use this site");
    for (const route of siteRoutes) {
      expect(content).toContain(route.agentUseCase);
    }
  });

  it("formats every list item as a markdown link with a note", () => {
    const listItems = lines.filter((line) => line.startsWith("- "));

    expect(listItems.length).toBeGreaterThan(siteRoutes.length);
    for (const item of listItems) {
      expect(item).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)]+\): .+$/);
    }
  });

  it("links every page and its markdown twin", () => {
    for (const route of siteRoutes) {
      expect(content).toContain(`(${absoluteUrl(route.path)})`);
      expect(content).toContain(`(${absoluteUrl(markdownPathFor(route.path))})`);
    }
  });

  it("documents how to request markdown", () => {
    expect(content).toContain("Accept: text/markdown");
    expect(content).toContain("Vary: Accept");
  });

  it("uses an Optional section for links an agent may skip", () => {
    expect(content).toContain("## Optional");
  });
});
