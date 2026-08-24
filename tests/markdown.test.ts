import { describe, expect, it } from "vitest";

import { siteRoutes, siteUrl } from "@/config/site";
import {
  getMarkdownDocument,
  getNotFoundMarkdown,
  markdownPathFor,
  routePathForMarkdownPath,
} from "@/lib/content/markdown";

describe("markdown twin paths", () => {
  it("maps the homepage to /index.md and other routes to <path>.md", () => {
    expect(markdownPathFor("/")).toBe("/index.md");
    expect(markdownPathFor("/work")).toBe("/work.md");
    expect(markdownPathFor("/work/")).toBe("/work.md");
  });

  it("round-trips every configured route", () => {
    for (const route of siteRoutes) {
      expect(routePathForMarkdownPath(markdownPathFor(route.path))).toBe(route.path);
    }
  });

  it("returns null for a path that is not a markdown twin", () => {
    expect(routePathForMarkdownPath("/work")).toBeNull();
    expect(routePathForMarkdownPath("/og-image.png")).toBeNull();
  });
});

describe("getMarkdownDocument", () => {
  it("has a document for every configured route", () => {
    for (const route of siteRoutes) {
      const document = getMarkdownDocument(route.path);
      expect(document, `missing markdown for ${route.path}`).not.toBeNull();
      expect(document?.title).toBe(route.title);
    }
  });

  it("opens with an H1 and a blockquote summary", () => {
    for (const route of siteRoutes) {
      const lines = getMarkdownDocument(route.path)!.markdown.split("\n");
      expect(lines[0]).toBe(`# ${route.title}`);
      expect(lines[2]).toBe(`> ${route.description}`);
    }
  });

  it("points back at the canonical HTML URL", () => {
    const document = getMarkdownDocument("/work")!;
    expect(document.markdown).toContain(`Canonical HTML: ${siteUrl}/work`);
    expect(document.markdown).toContain(`Markdown: ${siteUrl}/work.md`);
  });

  it("links to every other page so an agent can keep crawling", () => {
    const markdown = getMarkdownDocument("/")!.markdown;
    for (const route of siteRoutes.filter((r) => r.path !== "/")) {
      expect(markdown).toContain(`${siteUrl}${markdownPathFor(route.path)}`);
    }
    expect(markdown).toContain(`${siteUrl}/llms.txt`);
  });

  it("normalises trailing slashes and casing", () => {
    expect(getMarkdownDocument("/WORK/")?.path).toBe("/work");
  });

  it("returns null for an unknown path", () => {
    expect(getMarkdownDocument("/nope")).toBeNull();
  });

  it("carries the real page content, not just the shell", () => {
    expect(getMarkdownDocument("/work")!.markdown).toContain("Leapfrog Technology");
    expect(getMarkdownDocument("/education")!.markdown).toContain(
      "Kantipur Engineering College"
    );
    expect(getMarkdownDocument("/projects")!.markdown).toContain("BCTNotes");
    expect(getMarkdownDocument("/contact")!.markdown).toContain("aakritsubedi9@gmail.com");
  });

  it("ends with a trailing newline", () => {
    expect(getMarkdownDocument("/")!.markdown.endsWith("\n")).toBe(true);
  });
});

describe("getNotFoundMarkdown", () => {
  const body = getNotFoundMarkdown("/some-path-that-does-not-exist");

  it("names the path that was requested", () => {
    expect(body).toContain("/some-path-that-does-not-exist");
  });

  it("is a markdown document with a heading", () => {
    expect(body.startsWith("# 404")).toBe(true);
  });

  it("points at the machine-readable entrypoints", () => {
    expect(body).toContain(`${siteUrl}/llms.txt`);
    expect(body).toContain(`${siteUrl}/sitemap.xml`);
    expect(body).toContain(`${siteUrl}/robots.txt`);
  });

  it("lists every page on the site", () => {
    for (const route of siteRoutes) {
      expect(body).toContain(route.title);
    }
  });

  it("stays short enough to be cheap for an agent to read", () => {
    expect(body.length).toBeLessThan(4000);
  });
});
