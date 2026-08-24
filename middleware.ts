import { NextResponse, type NextRequest } from "next/server";

import { absoluteUrl, findRoute, isKnownRoute, normalizePath } from "@/config/site";
import {
  getMarkdownDocument,
  getNotFoundMarkdown,
  routePathForMarkdownPath,
} from "@/lib/content/markdown";
import {
  HTML_MEDIA_TYPE,
  MARKDOWN_MEDIA_TYPE,
  negotiateMediaType,
} from "@/lib/http/accept";

/**
 * Markdown content negotiation (acceptmarkdown.com) plus agent-friendly 404s.
 *
 * - Known routes are negotiated between `text/html` and `text/markdown`.
 *   HTML is offered first so wildcard clients (`Accept: *​/*`) and browsers keep
 *   getting the rendered page.
 * - Unknown paths are negotiated with markdown offered first, so a browser still
 *   lands on the styled 404 page while curl/agents get a markdown body they can
 *   act on.
 * - Clients that accept neither representation get `406 Not Acceptable`.
 *
 * Markdown is written straight from here rather than rewritten to a route
 * handler: a rewrite does not carry query parameters through to the handler, and
 * responding directly is the only way to control the status line and `Vary` on
 * the markdown variant.
 *
 * `Vary` on the *HTML* variant is best-effort. Next's `setVaryHeader` calls
 * `res.setHeader("vary", ...)` unconditionally when rendering an app route
 * (next/dist/server/base-server.js), so under `next start` it overwrites both
 * this value and the one in `next.config.mjs`. On Vercel the middleware runs as
 * a separate function whose headers are merged after the render, so it does
 * survive there. Every response that actually carries markdown sets `Vary`
 * itself and is unaffected either way.
 */

const VARY_VALUE = "Accept, Accept-Encoding";
/** Next's own RSC vary tokens, repeated so adding Accept cannot drop them. */
const NEXT_VARY = "RSC, Next-Router-State-Tree, Next-Router-Prefetch";
const HTML_VARY = `${NEXT_VARY}, ${VARY_VALUE}`;

function htmlPassthrough(): NextResponse {
  const response = NextResponse.next();
  response.headers.set("Vary", HTML_VARY);
  return response;
}

/** Paths that are served verbatim and must never be negotiated or 404'd here. */
const PASSTHROUGH_PREFIXES = ["/_next/", "/_vercel/"];
const PASSTHROUGH_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/favicon.ico",
]);

function markdownResponse(
  body: string,
  { status, canonical }: { status: number; canonical?: string }
): NextResponse {
  const headers = new Headers({
    "Content-Type": `${MARKDOWN_MEDIA_TYPE}; charset=utf-8`,
    Vary: VARY_VALUE,
    "Cache-Control":
      status === 200 ? "public, max-age=0, must-revalidate" : "no-store",
    "X-Robots-Tag": status === 200 ? "index, follow" : "noindex, follow",
  });

  if (canonical) {
    headers.set("Link", `<${canonical}>; rel="canonical"; type="text/html"`);
  }

  return new NextResponse(body, { status, headers });
}

function notFoundMarkdown(pathname: string): NextResponse {
  return markdownResponse(getNotFoundMarkdown(pathname), { status: 404 });
}

function notAcceptable(): NextResponse {
  return new NextResponse(
    `406 Not Acceptable\n\nThis URL is available as ${HTML_MEDIA_TYPE} or ${MARKDOWN_MEDIA_TYPE}.\n`,
    {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: VARY_VALUE,
      },
    }
  );
}

function hasFileExtension(pathname: string): boolean {
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  return /\.[a-zA-Z0-9]+$/.test(lastSegment);
}

function serveMarkdown(path: string): NextResponse {
  const document = getMarkdownDocument(path);
  if (!document) return notFoundMarkdown(path);

  const route = findRoute(path);
  return markdownResponse(document.markdown, {
    status: 200,
    canonical: absoluteUrl(route ? route.path : path),
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PASSTHROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }
  if (PASSTHROUGH_PATHS.has(pathname.toLowerCase())) {
    return NextResponse.next();
  }

  // Explicit ".md" twin of a page — the URL is the request, nothing to negotiate.
  if (pathname.toLowerCase().endsWith(".md")) {
    const routePath = routePathForMarkdownPath(normalizePath(pathname));
    return routePath && isKnownRoute(routePath)
      ? serveMarkdown(routePath)
      : notFoundMarkdown(pathname);
  }

  // Any other extension is a real file under /public.
  if (hasFileExtension(pathname)) {
    return NextResponse.next();
  }

  // React Server Component payload requests are never markdown candidates.
  if (request.headers.get("rsc") !== null) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept");

  if (isKnownRoute(pathname)) {
    const selected = negotiateMediaType(accept, [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE]);

    if (selected === null) return notAcceptable();
    if (selected === MARKDOWN_MEDIA_TYPE) return serveMarkdown(normalizePath(pathname));

    return htmlPassthrough();
  }

  // Unknown path: still a real 404, but pick the representation the client can
  // use. Markdown is offered first so non-browser clients get a recoverable body.
  const selected = negotiateMediaType(accept, [MARKDOWN_MEDIA_TYPE, HTML_MEDIA_TYPE]);

  if (selected === null) return notAcceptable();
  if (selected === MARKDOWN_MEDIA_TYPE) return notFoundMarkdown(pathname);

  return htmlPassthrough();
}

export const config = {
  matcher: [
    /**
     * Everything except Next internals and the Vercel toolbar. Static files in
     * /public still reach the middleware and are filtered by extension above,
     * which is what keeps the ".md" twins working.
     */
    "/((?!_next/static|_next/image|_vercel).*)",
  ],
};
