import { person, siteUrl } from "@/config/site";

/**
 * Copy for the long-form trust-anchor pages (/about, /contact, /privacy).
 *
 * It lives here rather than inside the JSX so the HTML page and its
 * `text/markdown` variant are rendered from the same words — there is no
 * second copy to drift.
 */

export type PageLink = {
  label: string;
  href: string;
  note?: string;
};

export type PageSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: PageLink[];
};

export type LongFormPage = {
  title: string;
  /** Left-hand label of the mono sheet header used across the site */
  eyebrow: string;
  /** Right-hand label of the same header */
  meta: string;
  intro: string[];
  sections: PageSection[];
};

export const aboutPage: LongFormPage = {
  title: "About",
  eyebrow: "about",
  meta: "who's behind this site",
  intro: [
    "I'm Aakrit Subedi, a software engineer based in Kathmandu, Nepal. I've spent the last several years somewhere between writing the code and deciding what the code should be: designing systems, shipping them to real users, and then living with the consequences of both.",
    "I started at Leapfrog Technology in 2019 as an associate software engineer, building ed-tech and health-tech applications and learning how software actually gets released. In 2021 I joined Naamche as part of a founding team of seven, grew with the company past seventy-five people and through its acquisition by reAlpha (NASDAQ: AIRE), and moved from software engineer to tech lead to engineering manager along the way.",
  ],
  sections: [
    {
      heading: "What I actually do",
      paragraphs: [
        "Most of my work sits at the seam between architecture and delivery. That means API contracts and data models, CI/CD and AWS deployments, the retrieval and prompt-orchestration layer of an LLM product, and the review standards that keep a team's output consistent once more than three people are touching the same repository.",
        "On the management side I've run sprint planning, stand-ups and retrospectives, scoped ambiguous client requirements into estimates with stakeholders across the US, Nepal, Indonesia and Singapore, interviewed and hired engineers, and grown people into owning technical decisions rather than just executing them. I stayed hands-on in the codebase through all of it.",
      ],
    },
    {
      heading: "Technologies I reach for",
      bullets: [
        "TypeScript and Node.js on the backend, with NestJS or plain services depending on how much structure the problem deserves",
        "React and Next.js on the frontend, usually with Tailwind CSS",
        "PostgreSQL and GraphQL for data, with caching and query tuning added when load justifies it — not before",
        "AWS and Vercel for deployment, with CI/CD pipelines set up early rather than retrofitted",
        "LLM application work: prompt orchestration, grounding responses in client content, and graceful fallbacks when a model or upstream service fails",
      ],
    },
    {
      heading: "Side projects",
      paragraphs: [
        "Weekends still go to building things. BCTNotes started because, as a student, I couldn't find decent notes and past papers in one place; it now serves 14,000+ engineering students. Murmur turns spoken rambling into notes and tasks. NEPSE AI writes and publishes daily stock-market summaries with no human in the loop. Every one of them started as a problem I had personally, and most of them taught me something that later showed up in my day job.",
      ],
    },
    {
      heading: "Community",
      paragraphs: [
        "Whatever I pick up I try to pass on — through meetups, talks, mentorship sessions, and long conversations with engineering students who are somewhere around where I started. I was awarded a full scholarship at Kantipur Engineering College, won the Best Software Award at LITE 2018, and several intra-college software competitions along the way.",
      ],
    },
    {
      heading: "Elsewhere",
      links: [
        { label: "Work experience", href: "/work", note: "roles, companies and dates" },
        { label: "Projects", href: "/projects", note: "what I've shipped, with live links" },
        { label: "Education", href: "/education", note: "degrees and academic projects" },
        { label: "Résumé (PDF)", href: "/AakritSubedi.pdf" },
        { label: "Contact", href: "/contact", note: "how to reach me" },
      ],
    },
  ],
};

export const contactPage: LongFormPage = {
  title: "Contact",
  eyebrow: "contact",
  meta: "email is fastest",
  intro: [
    "Email is the most reliable way to reach me, and it's the channel I actually check. There's no contact form on this site on purpose — a form that quietly drops messages is worse than no form at all, so everything below is a direct channel that lands with me.",
    "I usually reply within a couple of working days. If something is time-sensitive, say so in the subject line and I'll get to it sooner.",
  ],
  sections: [
    {
      heading: "Direct channels",
      links: [
        {
          label: person.email,
          href: `mailto:${person.email}`,
          note: "Primary — project enquiries, freelance work, speaking, or anything else",
        },
        {
          label: "linkedin.com/in/aakrit-subedi",
          href: "https://www.linkedin.com/in/aakrit-subedi",
          note: "Professional enquiries and hiring conversations",
        },
        {
          label: "github.com/aakritsubedi",
          href: "https://github.com/aakritsubedi",
          note: "Code, issues and pull requests",
        },
        {
          label: "medium.com/@subediaakrit",
          href: "https://medium.com/@subediaakrit",
          note: "Technical writing, and comments on it",
        },
        {
          label: "twitter.com/SubediAakrit",
          href: "https://twitter.com/SubediAakrit",
          note: "Short-form, least reliable for anything that needs a reply",
        },
      ],
    },
    {
      heading: "Good reasons to get in touch",
      bullets: [
        "Freelance or contract engineering work — full-stack product builds, API and data-model design, or getting an early-stage codebase onto solid deployment foundations",
        "LLM product work: retrieval pipelines, prompt orchestration, and making model-backed features behave predictably in production",
        "Engineering leadership conversations — team structure, review standards, hiring loops, or turning ambiguous requirements into scoped plans",
        "Speaking at a meetup, running a session for engineering students, or mentorship",
        "Anything about BCTNotes, Murmur, NEPSE AI, Sheets2API or Plan OS — including bug reports",
      ],
    },
    {
      heading: "Details",
      bullets: [
        `Based in ${person.address.locality}, Nepal (UTC+05:45)`,
        "Available for remote work with teams in any timezone; I've worked across the US, Singapore, Indonesia and India",
        `Résumé: ${siteUrl}/AakritSubedi.pdf`,
      ],
    },
  ],
};

export const privacyPage: LongFormPage = {
  title: "Privacy Policy",
  eyebrow: "privacy",
  meta: "last updated 24 August 2026",
  intro: [
    "This is a personal portfolio site. It has no accounts, no sign-ups, no comment system, no contact form and no advertising, so there is very little to collect and nothing to sell. This page describes exactly what does happen when you load a page.",
  ],
  sections: [
    {
      heading: "What is collected",
      bullets: [
        "Aggregate page-view analytics through Vercel Web Analytics. It records the page visited, referrer, and coarse device and country information. It does not set cookies and does not build a cross-site profile of you.",
        "Standard server request logs kept by Vercel, the host. These include IP address, user agent and requested path, and are retained by Vercel under their own policy for operational and security purposes.",
        "Nothing else. There is no tracking pixel, no advertising network, no session recording, and no third-party analytics beyond the two items above.",
      ],
    },
    {
      heading: "What is stored in your browser",
      bullets: [
        "A theme preference (light or dark), stored in localStorage so the site does not flash the wrong colour scheme on your next visit. It never leaves your device and is not read by any server.",
        "No advertising or tracking cookies are set by this site.",
      ],
    },
    {
      heading: "Third parties",
      paragraphs: [
        "Fonts are self-hosted and served from this domain, so loading a page does not make a request to Google Fonts or any other font CDN.",
        "Some pages link out to GitHub, LinkedIn, Medium, Instagram, the Play Store and the live sites of my projects. Once you follow one of those links you are on their infrastructure and their privacy policy applies, not this one.",
        "If you email me, that email is handled by my mail provider and I keep the correspondence for as long as it is useful. I do not add anyone to a mailing list.",
      ],
    },
    {
      heading: "Your requests",
      paragraphs: [
        `If you want to know what, if anything, is associated with you, or you want request data removed, email ${person.email} and I will respond within thirty days. Because the analytics on this site are aggregate and not tied to an identity, in most cases there is nothing personal to retrieve or delete.`,
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "If this policy changes, the date at the top of this page changes with it. There is no version history worth keeping for a site this small — the current text is the whole policy.",
      ],
    },
  ],
};
