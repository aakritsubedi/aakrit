import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { siteRoutes } from "@/config/site";
import { middleware } from "@/middleware";

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(new URL(path, "https://www.aakritsubedi.com.np"), { headers });
}

/** `NextResponse.next()` marks itself with this internal header. */
function isPassthrough(response: Response) {
  return response.headers.get("x-middleware-next") === "1";
}

function varyTokens(response: Response) {
  return (response.headers.get("vary") ?? "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

describe("markdown negotiation on known routes", () => {
  it.each(siteRoutes.map((route) => route.path))(
    "%s serves markdown for Accept: text/markdown",
    async (path) => {
      const response = middleware(request(path, { accept: "text/markdown" }));

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
      expect(varyTokens(response)).toContain("accept");
      expect(await response.text()).toContain("# ");
    }
  );

  it("advertises the canonical HTML URL in a Link header", () => {
    const response = middleware(request("/work", { accept: "text/markdown" }));

    expect(response.headers.get("link")).toBe(
      '<https://www.aakritsubedi.com.np/work>; rel="canonical"; type="text/html"'
    );
  });

  it("passes browsers through to the rendered page", () => {
    const response = middleware(request("/work", { accept: BROWSER_ACCEPT }));

    expect(isPassthrough(response)).toBe(true);
    expect(varyTokens(response)).toContain("accept");
    // Next's own RSC tokens must survive alongside Accept.
    expect(varyTokens(response)).toContain("rsc");
  });

  it("passes a bare wildcard client through to HTML", () => {
    expect(isPassthrough(middleware(request("/", { accept: "*/*" })))).toBe(true);
    expect(isPassthrough(middleware(request("/")))).toBe(true);
  });

  it("returns 406 when neither representation is acceptable", async () => {
    const response = middleware(request("/", { accept: "application/pdf" }));

    expect(response.status).toBe(406);
    expect(varyTokens(response)).toContain("accept");
    expect(await response.text()).toContain("406 Not Acceptable");
  });

  it("never negotiates an RSC payload request into markdown", () => {
    const response = middleware(request("/work", { accept: "text/markdown", rsc: "1" }));
    expect(isPassthrough(response)).toBe(true);
  });

  it("normalises trailing slashes and casing before matching", () => {
    const response = middleware(request("/Work/", { accept: "text/markdown" }));
    expect(response.status).toBe(200);
  });
});

describe("explicit .md twins", () => {
  it.each(
    siteRoutes.map((route) => (route.path === "/" ? "/index.md" : `${route.path}.md`))
  )("%s serves markdown without needing an Accept header", (mdPath) => {
    const response = middleware(request(mdPath));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
  });

  it("404s an unknown .md path", async () => {
    const response = middleware(request("/ghost.md"));

    expect(response.status).toBe(404);
    expect(await response.text()).toContain("# 404");
  });
});

describe("404 handling", () => {
  it("returns a markdown 404 to a wildcard client", async () => {
    const response = middleware(request("/some-path-that-does-not-exist"));
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(varyTokens(response)).toContain("accept");
    expect(body).toContain("/some-path-that-does-not-exist");
    expect(body).toContain("/llms.txt");
    expect(body).toContain("/sitemap.xml");
  });

  it("keeps 404 bodies out of search indexes", () => {
    const response = middleware(request("/nope"));
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
  });

  it("lets a browser fall through to the rendered 404 page", () => {
    const response = middleware(request("/nope", { accept: BROWSER_ACCEPT }));
    expect(isPassthrough(response)).toBe(true);
  });

  it("returns 406 rather than a 404 body the client cannot read", () => {
    expect(middleware(request("/nope", { accept: "image/png" })).status).toBe(406);
  });
});

describe("passthrough paths", () => {
  it.each(["/robots.txt", "/sitemap.xml", "/llms.txt", "/favicon.ico"])(
    "%s is served verbatim",
    (path) => {
      expect(isPassthrough(middleware(request(path)))).toBe(true);
    }
  );

  it.each(["/og-image.png", "/AakritSubedi.pdf", "/work/naamche.png", "/hero.mp4"])(
    "%s is treated as a static file, not a 404",
    (path) => {
      expect(isPassthrough(middleware(request(path)))).toBe(true);
    }
  );

  it("leaves Next internals alone", () => {
    expect(isPassthrough(middleware(request("/_next/data/build/index.json")))).toBe(true);
  });
});
