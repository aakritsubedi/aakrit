#!/usr/bin/env node
/**
 * End-to-end check of every public endpoint and machine-readable file against a
 * running server. Unit tests cover the pure logic; this covers the wire.
 *
 *   node scripts/verify-agent-readiness.mjs [baseUrl]
 *
 * Defaults to http://localhost:3111. Point it at the deployed origin after a
 * release to confirm the CDN preserved the headers.
 */

const base = (process.argv[2] ?? "http://localhost:3111").replace(/\/$/, "");

const PAGES = [
  "/",
  "/about",
  "/work",
  "/projects",
  "/education",
  "/contact",
  "/privacy",
];

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

let failures = 0;
let checks = 0;

function check(name, condition, detail = "") {
  checks += 1;
  if (condition) {
    console.log(`  ok    ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function get(path, headers = {}) {
  return fetch(`${base}${path}`, { headers, redirect: "manual" });
}

function varyIncludesAccept(response) {
  // A repeated header arrives joined with ", "; either shape is valid HTTP.
  const vary = response.headers.get("vary") ?? "";
  return vary
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .includes("accept");
}

async function section(title, fn) {
  console.log(`\n${title}`);
  await fn();
}

await section("1. Agent-friendly 404s", async () => {
  const response = await get("/some-path-that-does-not-exist");
  const body = await response.text();

  check("nonexistent path returns 404", response.status === 404, `got ${response.status}`);
  check(
    "404 body is text/markdown",
    (response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    response.headers.get("content-type") ?? "none"
  );
  check("404 body is markdown with a heading", body.startsWith("# 404"));
  check("404 body links llms.txt", body.includes("/llms.txt"));
  check("404 body links the sitemap", body.includes("/sitemap.xml"));
  check("404 body lists the site's pages", body.includes("/contact"));
  check("404 sets Vary: Accept", varyIncludesAccept(response));

  const browser = await get("/still-not-a-page", { Accept: BROWSER_ACCEPT });
  check("browsers still get a 404 status", browser.status === 404, `got ${browser.status}`);
  check(
    "browsers get the rendered HTML 404",
    (browser.headers.get("content-type") ?? "").startsWith("text/html")
  );
});

await section("2. Markdown content negotiation (acceptmarkdown.com)", async () => {
  for (const path of PAGES) {
    const response = await get(path, { Accept: "text/markdown" });
    const body = await response.text();
    const contentType = response.headers.get("content-type") ?? "";

    check(
      `${path} serves text/markdown for Accept: text/markdown`,
      response.status === 200 && contentType.startsWith("text/markdown"),
      `${response.status} ${contentType}`
    );
    check(`${path} markdown response sets Vary: Accept`, varyIncludesAccept(response));
    check(`${path} markdown body starts with an H1`, body.startsWith("# "));
    check(
      `${path} markdown advertises its canonical HTML URL`,
      (response.headers.get("link") ?? "").includes('rel="canonical"')
    );
  }

  const qValues = await get("/", { Accept: "text/markdown;q=0.9, text/html;q=0.4" });
  check(
    "honours q-values (markdown q=0.9 beats html q=0.4)",
    (qValues.headers.get("content-type") ?? "").startsWith("text/markdown"),
    qValues.headers.get("content-type") ?? ""
  );

  const htmlPreferred = await get("/", { Accept: "text/markdown;q=0.2, text/html;q=0.8" });
  check(
    "honours q-values (html q=0.8 beats markdown q=0.2)",
    (htmlPreferred.headers.get("content-type") ?? "").startsWith("text/html"),
    htmlPreferred.headers.get("content-type") ?? ""
  );

  const rejected = await get("/", { Accept: "text/html;q=0, */*" });
  check(
    "a more specific range overrides a wildcard (html;q=0 -> markdown)",
    (rejected.headers.get("content-type") ?? "").startsWith("text/markdown")
  );

  const notAcceptable = await get("/", { Accept: "application/pdf" });
  check(
    "returns 406 for a media type it cannot produce",
    notAcceptable.status === 406,
    `got ${notAcceptable.status}`
  );
  check("406 response sets Vary: Accept", varyIncludesAccept(notAcceptable));

  const browser = await get("/", { Accept: BROWSER_ACCEPT });
  check(
    "a browser still gets HTML",
    (browser.headers.get("content-type") ?? "").startsWith("text/html")
  );
  check(
    "HTML response sets Vary: Accept",
    varyIncludesAccept(browser),
    `vary: ${browser.headers.get("vary") ?? "none"} (Next overwrites this under \`next start\`)`
  );

  for (const path of PAGES) {
    const mdPath = path === "/" ? "/index.md" : `${path}.md`;
    const response = await get(mdPath);
    check(
      `${mdPath} serves markdown directly`,
      response.status === 200 &&
        (response.headers.get("content-type") ?? "").startsWith("text/markdown"),
      `${response.status} ${response.headers.get("content-type") ?? ""}`
    );
  }

  const missingMd = await get("/nope.md");
  check("an unknown .md path 404s", missingMd.status === 404, `got ${missingMd.status}`);
});

await section("3 & 5. JSON-LD structured data", async () => {
  const response = await get("/", { Accept: BROWSER_ACCEPT });
  const html = await response.text();

  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  check("homepage HTML contains a JSON-LD script tag", Boolean(match));
  if (!match) return;

  let data;
  try {
    data = JSON.parse(match[1]);
  } catch (error) {
    check("JSON-LD parses", false, String(error));
    return;
  }
  check("JSON-LD parses", true);

  const graph = data["@graph"] ?? [data];
  const byType = Object.fromEntries(graph.map((node) => [node["@type"], node]));

  check("declares @context", data["@context"] === "https://schema.org");
  check("has a Person node", Boolean(byType.Person));
  check("has an Organization node", Boolean(byType.Organization));
  check("has a WebSite node", Boolean(byType.WebSite));

  const personNode = byType.Person ?? {};
  for (const field of ["name", "description", "url", "jobTitle", "sameAs"]) {
    check(`Person has ${field}`, Boolean(personNode[field]));
  }

  const org = byType.Organization ?? {};
  for (const field of ["name", "description", "url"]) {
    check(`Organization has ${field}`, Boolean(org[field]));
  }
  const contact = Array.isArray(org.contactPoint) ? org.contactPoint[0] : org.contactPoint;
  check("Organization has a contactPoint", Boolean(contact));
  check("contactPoint has contactType", Boolean(contact?.contactType));
  check("contactPoint has an email or phone", Boolean(contact?.email || contact?.telephone));
  check("Organization has a PostalAddress", org.address?.["@type"] === "PostalAddress");
  check("address has addressLocality", Boolean(org.address?.addressLocality));
  check("address has addressCountry", Boolean(org.address?.addressCountry));
});

await section("4. Agent instructions / when-to-use", async () => {
  const response = await get("/llms.txt");
  const body = await response.text();
  const lines = body.split("\n");

  check("/llms.txt returns 200", response.status === 200, `got ${response.status}`);
  check(
    "/llms.txt is served as markdown",
    (response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    response.headers.get("content-type") ?? ""
  );
  check("starts with a single H1", lines[0].startsWith("# ") &&
    lines.filter((line) => line.startsWith("# ")).length === 1);
  check("H1 is followed by a blockquote summary", lines[2].startsWith("> "));
  check("has a when-to-use section", body.includes("## When to use this site"));
  check("names concrete use cases, not marketing copy", body.includes("Prefer it over"));
  check("explains how to request markdown", body.includes("Accept: text/markdown"));
  check("has an Optional section", body.includes("## Optional"));
  check(
    "every list item is a markdown link with a note",
    lines
      .filter((line) => line.startsWith("- "))
      .every((line) => /^- \[[^\]]+\]\(https?:\/\/[^)]+\): .+$/.test(line))
  );
});

await section("6. Metadata completeness", async () => {
  for (const path of PAGES) {
    const response = await get(path, { Accept: BROWSER_ACCEPT });
    const html = await response.text();

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const alternate = html.match(
      /<link rel="alternate"[^>]*type="text\/markdown"[^>]*href="([^"]+)"|<link rel="alternate" href="([^"]+)"[^>]*type="text\/markdown"/
    );
    // A page with no `alternates` of its own silently inherits the layout's,
    // so assert the exact URL rather than mere presence.
    const expectedCanonical = `https://aakritsubedi.com.np${path}`;
    const expectedMarkdown = `https://aakritsubedi.com.np${
      path === "/" ? "/index.md" : `${path}.md`
    }`;

    check(`${path} has <html lang>`, /<html[^>]+lang="[^"]+"/.test(html));
    check(
      `${path} canonical points at itself`,
      // Next renders the homepage canonical without its trailing slash; both
      // spellings name the same resource.
      canonical?.replace(/\/$/, "") === expectedCanonical.replace(/\/$/, ""),
      `got ${canonical ?? "none"}`
    );
    check(`${path} has og:image`, /<meta property="og:image" content="[^"]+"/.test(html));
    check(`${path} has og:type`, /<meta property="og:type" content="[^"]+"/.test(html));
    check(
      `${path} advertises its own markdown alternate`,
      Boolean(alternate) && (alternate[1] ?? alternate[2]) === expectedMarkdown,
      `got ${alternate ? (alternate[1] ?? alternate[2]) : "none"}`
    );
  }
});

await section("7. Trust anchor pages", async () => {
  for (const path of ["/about", "/contact", "/privacy"]) {
    const response = await get(path, { Accept: BROWSER_ACCEPT });
    const html = await response.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    check(`${path} returns 200`, response.status === 200, `got ${response.status}`);
    check(`${path} has 500+ characters of text`, text.length >= 500, `${text.length} chars`);
  }
});

await section("Sitemap and robots", async () => {
  const sitemap = await get("/sitemap.xml");
  const sitemapBody = await sitemap.text();

  check("/sitemap.xml returns 200", sitemap.status === 200, `got ${sitemap.status}`);
  for (const path of PAGES) {
    const expected = path === "/" ? "/" : path;
    check(
      `sitemap lists ${path}`,
      sitemapBody.includes(`com.np${expected}<`),
      "not found in sitemap"
    );
  }

  const robots = await get("/robots.txt");
  const robotsBody = await robots.text();
  check("/robots.txt returns 200", robots.status === 200, `got ${robots.status}`);
  check("robots.txt points at the sitemap", robotsBody.includes("/sitemap.xml"));
  check("robots.txt allows crawling", /Allow: \//.test(robotsBody));
});

console.log(
  `\n${checks - failures}/${checks} checks passed against ${base}${
    failures ? ` — ${failures} FAILED` : ""
  }`
);

process.exit(failures > 0 ? 1 : 0);
