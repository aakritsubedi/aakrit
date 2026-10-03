import profile from "./profile.json";

/**
 * Single source of truth for everything machine-readable about this site:
 * metadata, sitemap, robots, llms.txt, JSON-LD, and the markdown variants
 * served through Accept negotiation all read from here.
 */

/**
 * Origin used for every absolute URL the site publishes.
 *
 * NOTE: the apex 308-redirects to `www` at the DNS/hosting layer, so `www` is
 * the canonical origin. If that redirect is ever flipped, change this one
 * value and canonical URLs, og:url, the sitemap and llms.txt all follow.
 */
export const siteUrl = profile.siteUrl;

export function absoluteUrl(path: string): string {
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteName = "Aakrit Subedi";

type Person = {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  /**
   * Deliberately absent: the phone number is not published anywhere on this
   * site or in the résumé PDF. The JSON-LD contactPoint falls back to
   * email-only when it is missing, so setting it here is the only change
   * needed to start publishing one again.
   */
  telephone?: string;
  image: string;
  resume: string;
  address: { locality: string; region: string; country: string };
  sameAs: readonly string[];
  knowsAbout: readonly string[];
};

/**
 * Identity facts. These back the JSON-LD graph, the contact page and the
 * markdown variants, so they only get written down once.
 */
export const person: Person = {
  name: profile.name,
  jobTitle: profile.jobTitle,
  description: profile.description,
  email: profile.email,
  image: absoluteUrl(profile.imagePath),
  resume: absoluteUrl(profile.resumePath),
  address: profile.address,
  sameAs: profile.sameAs,
  knowsAbout: profile.knowsAbout,
};

export type SiteRoute = {
  /** Path as served, always leading-slash and never trailing-slash (except "/") */
  path: string;
  title: string;
  description: string;
  /**
   * What an agent should come to this page for. Feeds the "when to use this"
   * section of llms.txt — keep it a concrete job, not marketing copy.
   */
  agentUseCase: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    title: "Aakrit Subedi - Software Engineer",
    description:
      "Homepage and short-form biography: what Aakrit builds, the products he has led, and how he got here.",
    agentUseCase:
      "Answering \"who is Aakrit Subedi\" and getting the one-paragraph summary plus the three headline projects.",
    priority: 1,
    changeFrequency: "monthly",
  },
  {
    path: "/about",
    title: "About | Aakrit Subedi",
    description:
      "Long-form background: focus areas, how he works, the technologies he reaches for, and community involvement.",
    agentUseCase:
      "Verifying who runs this site, what they specialise in, and whether they are a fit for a piece of work.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/work",
    title: "Work Experience | Aakrit Subedi",
    description:
      "Roles, companies, dates and responsibilities from 2019 to present, including the Naamche → reAlpha acquisition.",
    agentUseCase:
      "Checking employment history, seniority, dates, and the scope of engineering work owned at each company.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/projects",
    title: "Projects | Aakrit Subedi",
    description:
      "Shipped side projects and products with their stacks, status and public links.",
    agentUseCase:
      "Finding concrete, live examples of things Aakrit has built and the stack each one runs on.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/education",
    title: "Education | Aakrit Subedi",
    description:
      "Degrees, institutions, scholarships, awards and academic projects.",
    agentUseCase:
      "Confirming academic credentials, institutions and graduation years.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/cv",
    title: "CV | Aakrit Subedi",
    description:
      "One-document résumé: roles and dates, selected shipped projects, technical skills, education and awards.",
    agentUseCase:
      "Getting the whole professional history as a single structured document, rather than assembling it from /work, /projects and /education.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: "Contact | Aakrit Subedi",
    description:
      "Verified contact channels, what to reach out about, and expected response time.",
    agentUseCase:
      "Answering \"how do I contact Aakrit\" with a channel that actually reaches him.",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Aakrit Subedi",
    description:
      "What this site collects (aggregate analytics only), what it stores in your browser, and how to make a request.",
    agentUseCase:
      "Checking data-handling practices before recommending or submitting anything to this site.",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

const routesByPath = new Map(siteRoutes.map((route) => [route.path, route]));

/** Collapses "/work/" and "/WORK" onto the canonical "/work" used in config. */
export function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed.toLowerCase();
}

export function findRoute(pathname: string): SiteRoute | undefined {
  return routesByPath.get(normalizePath(pathname));
}

export function isKnownRoute(pathname: string): boolean {
  return routesByPath.has(normalizePath(pathname));
}

/** Machine-readable files an agent can fall back to from any page or 404. */
export const agentEntrypoints = [
  { path: "/llms.txt", label: "llms.txt", note: "Site guide for agents, including when to use this site" },
  { path: "/sitemap.xml", label: "sitemap.xml", note: "Every canonical URL on this site" },
  { path: "/robots.txt", label: "robots.txt", note: "Crawl policy and sitemap pointer" },
] as const;
