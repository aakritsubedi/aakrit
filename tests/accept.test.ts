import { describe, expect, it } from "vitest";

import {
  HTML_MEDIA_TYPE,
  MARKDOWN_MEDIA_TYPE,
  matchOffer,
  negotiateMediaType,
  parseAccept,
} from "@/lib/http/accept";

/** Offer order used for a page that exists: HTML wins any tie. */
const PAGE_OFFERS = [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE] as const;
/** Offer order used for a 404: markdown wins any tie so agents can recover. */
const NOT_FOUND_OFFERS = [MARKDOWN_MEDIA_TYPE, HTML_MEDIA_TYPE] as const;

const CHROME_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8";

describe("parseAccept", () => {
  it("treats a missing or empty header as */*", () => {
    for (const header of [null, undefined, "", "   "]) {
      expect(parseAccept(header)).toEqual([
        { type: "*", subtype: "*", q: 1, specificity: 0, position: 0 },
      ]);
    }
  });

  it("defaults q to 1 and records header order", () => {
    const ranges = parseAccept("text/markdown, text/html;q=0.8");

    expect(ranges).toEqual([
      { type: "text", subtype: "markdown", q: 1, specificity: 2, position: 0 },
      { type: "text", subtype: "html", q: 0.8, specificity: 2, position: 1 },
    ]);
  });

  it("scores specificity as exact > subtype wildcard > full wildcard", () => {
    const ranges = parseAccept("text/html, text/*, */*");
    expect(ranges.map((range) => range.specificity)).toEqual([2, 1, 0]);
  });

  it("ignores media-type parameters that precede q", () => {
    const [range] = parseAccept('text/markdown;variant=GFM;q=0.5');
    expect(range.q).toBe(0.5);
    expect(range.subtype).toBe("markdown");
  });

  it("clamps out-of-range q values instead of rejecting them", () => {
    expect(parseAccept("text/html;q=5")[0].q).toBe(1);
    expect(parseAccept("text/html;q=-2")[0].q).toBe(0);
    expect(parseAccept("text/html;q=banana")[0].q).toBe(1);
  });

  it("skips malformed ranges and falls back to */* when nothing is valid", () => {
    expect(parseAccept("garbage, text/html").map((r) => r.subtype)).toEqual(["html"]);
    expect(parseAccept("garbage")).toEqual([
      { type: "*", subtype: "*", q: 1, specificity: 0, position: 0 },
    ]);
  });

  it("rejects '*/subtype', which is not a valid media range", () => {
    expect(parseAccept("*/markdown, text/html").map((r) => r.subtype)).toEqual(["html"]);
  });

  it("does not split on commas inside quoted parameter values", () => {
    const ranges = parseAccept('text/markdown;variant="a,b", text/html');
    expect(ranges).toHaveLength(2);
    expect(ranges.map((range) => `${range.type}/${range.subtype}`)).toEqual([
      "text/markdown",
      "text/html",
    ]);
  });
});

describe("matchOffer", () => {
  it("lets a more specific range override a higher-q wildcard (RFC 9110)", () => {
    const ranges = parseAccept("text/html;q=0, */*;q=1");

    expect(matchOffer(ranges, HTML_MEDIA_TYPE)?.q).toBe(0);
    expect(matchOffer(ranges, MARKDOWN_MEDIA_TYPE)?.q).toBe(1);
  });

  it("matches subtype wildcards", () => {
    const ranges = parseAccept("text/*;q=0.4");
    expect(matchOffer(ranges, MARKDOWN_MEDIA_TYPE)?.q).toBe(0.4);
    expect(matchOffer(ranges, "application/json")).toBeNull();
  });

  it("returns null when no range matches", () => {
    expect(matchOffer(parseAccept("application/pdf"), HTML_MEDIA_TYPE)).toBeNull();
  });
});

describe("negotiateMediaType on an existing page", () => {
  const negotiate = (header: string | null) => negotiateMediaType(header, PAGE_OFFERS);

  it("serves markdown when the client asks only for markdown", () => {
    expect(negotiate("text/markdown")).toBe(MARKDOWN_MEDIA_TYPE);
  });

  it("serves markdown when markdown outranks html by q", () => {
    expect(negotiate("text/markdown, text/html;q=0.8")).toBe(MARKDOWN_MEDIA_TYPE);
    expect(negotiate("text/html;q=0.5, text/markdown;q=0.9")).toBe(MARKDOWN_MEDIA_TYPE);
  });

  it("serves html to a browser", () => {
    expect(negotiate(CHROME_ACCEPT)).toBe(HTML_MEDIA_TYPE);
  });

  it("serves html to wildcard clients such as a bare curl", () => {
    expect(negotiate("*/*")).toBe(HTML_MEDIA_TYPE);
    expect(negotiate(null)).toBe(HTML_MEDIA_TYPE);
  });

  it("serves markdown when html is explicitly refused", () => {
    expect(negotiate("text/html;q=0, */*")).toBe(MARKDOWN_MEDIA_TYPE);
  });

  it("returns null (406) when the client accepts neither representation", () => {
    expect(negotiate("application/pdf")).toBeNull();
    expect(negotiate("text/html;q=0, text/markdown;q=0")).toBeNull();
    expect(negotiate("*/*;q=0")).toBeNull();
  });

  it("does not treat text/plain as a markdown request", () => {
    expect(negotiate("text/plain")).toBeNull();
  });
});

describe("negotiateMediaType on a 404", () => {
  const negotiate = (header: string | null) => negotiateMediaType(header, NOT_FOUND_OFFERS);

  it("gives a wildcard client the markdown body it can recover from", () => {
    expect(negotiate("*/*")).toBe(MARKDOWN_MEDIA_TYPE);
    expect(negotiate(null)).toBe(MARKDOWN_MEDIA_TYPE);
  });

  it("still gives a browser the rendered 404 page", () => {
    expect(negotiate(CHROME_ACCEPT)).toBe(HTML_MEDIA_TYPE);
    expect(negotiate("text/html")).toBe(HTML_MEDIA_TYPE);
  });

  it("returns null (406) when neither representation is acceptable", () => {
    expect(negotiate("image/png")).toBeNull();
  });
});
