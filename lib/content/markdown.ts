import { blogs, projects } from "@/config/projects";
import { educationInformation } from "@/config/education";
import { workExperience, workIntro } from "@/config/experience";
import { aboutPage, contactPage, privacyPage, type LongFormPage } from "@/config/pages";
import {
  absoluteUrl,
  agentEntrypoints,
  findRoute,
  normalizePath,
  person,
  siteRoutes,
  siteUrl,
} from "@/config/site";

/**
 * Markdown representations of every page, built from the same config objects
 * the React pages render. Served through `Accept: text/markdown` negotiation
 * and from the `.md` twin of each URL.
 *
 * Pure and dependency-free so it can run in the edge runtime.
 */

function joinBlocks(blocks: (string | null | undefined)[]): string {
  return blocks.filter((block): block is string => Boolean(block)).join("\n\n");
}

function bulletList(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function absolutize(href: string): string {
  return href.startsWith("/") ? absoluteUrl(href) : href;
}

function renderLongFormPage(page: LongFormPage): string {
  const sections = page.sections.map((section) => {
    const parts = [`## ${section.heading}`];

    if (section.paragraphs?.length) parts.push(section.paragraphs.join("\n\n"));
    if (section.bullets?.length) parts.push(bulletList(section.bullets));
    if (section.links?.length) {
      parts.push(
        section.links
          .map((link) => {
            const entry = `- [${link.label}](${absolutize(link.href)})`;
            return link.note ? `${entry}: ${link.note}` : entry;
          })
          .join("\n")
      );
    }

    return parts.join("\n\n");
  });

  return joinBlocks([page.intro.join("\n\n"), ...sections]);
}

function renderHome(): string {
  const receipts = [
    {
      label: "AiChat (acquired by reAlpha)",
      body: "Led the rebuild of AiChat around LLMs, working with a cross-country team across India, Nepal, Singapore, and the US. Expanded capabilities across WhatsApp, Messenger, and Instagram, built internal tools, ran product experiments, handled client issues, and solved scaling challenges as usage and clients grew.",
    },
    {
      label: "Naamche → reAlpha (engineering leadership)",
      body: "Joined as a founding team member of 7 and grew with the company to 75+ employees through its acquisition by reAlpha. Led engineering across multiple products, staying hands-on with architecture, code, and US clients. Mentored engineers, built teams, and interviewed new talent.",
    },
    {
      label: "BCTNotes (personal project, 14K+ students)",
      body: "Started it because, as a student, I couldn't find decent notes and past papers in one place. Designed and built the whole thing; it has grown into a platform where 14K+ engineering students share and use study materials.",
    },
  ];

  return joinBlocks([
    "I build systems from idea to production.",
    "I like figuring out how systems should work, getting into the code, and solving the problems that come with running them at scale. From engineering leadership at Naamche through its acquisition, to building LLM products for real users and a study platform trusted by 14K+ engineering students.",
    "## Highlights",
    receipts.map((item) => `- **${item.label}** — ${item.body}`).join("\n"),
    "## Background",
    "My first website was in grade 9 — loud colours, marquee text scrolling in both directions, and too many photos. In grade 10 came a small school management system in QBASIC, mostly out of curiosity about how far it could go. That habit followed me into engineering college, where every semester meant a few more projects, some for coursework and most just for myself. A few made it to intra-college competitions and came back with prizes.",
    "I started interning right after college, where the basics got sharpened and I learned how the industry actually works: shipping to real users, reviews, deadlines, and everything that happens after the code is merged. Two years in I joined Naamche as a founding engineer, and the company grew — and I grew with it. Weekends still go to side projects, and whatever I pick up I try to pass on through meetups, talks, and long conversations with engineering students.",
  ]);
}

function renderWork(): string {
  const roles = workExperience.map((role) => {
    const companies = role.companies.map((company) => {
      const heading = `### ${company.name}${company.note ? ` ${company.note}` : ""}`;
      const meta: string[] = [];
      if (company.domain) meta.push(`Focus: ${company.domain}`);
      if (company.progression?.length) {
        meta.push(
          `Progression: ${company.progression
            .map((step) => (step.year ? `${step.title} (${step.year})` : step.title))
            .join(" → ")}`
        );
      }

      return joinBlocks([
        heading,
        meta.length ? bulletList(meta) : null,
        bulletList(company.bullets),
      ]);
    });

    return joinBlocks([
      `## ${role.title}${role.period ? ` — ${role.period}` : ""}`,
      ...companies,
    ]);
  });

  return joinBlocks([workIntro.join("\n\n"), ...roles]);
}

function renderEducation(): string {
  const entries = educationInformation.map((entry) => {
    const projectBlocks = (entry.academicProjects ?? []).map((project) =>
      joinBlocks([
        `#### ${project.title} (${project.type})`,
        project.description,
        bulletList(project.details),
      ])
    );

    return joinBlocks([
      `## ${entry.title}`,
      bulletList([
        `Institution: ${entry.instituteName}`,
        `Years: ${entry.year}`,
      ]),
      bulletList(entry.details),
      projectBlocks.length ? "### Academic projects" : null,
      ...projectBlocks,
    ]);
  });

  return joinBlocks(entries);
}

function renderProjects(): string {
  const entries = projects.map((project) => {
    const meta: string[] = [];
    if (project.status) meta.push(`Status: ${project.status}`);
    if (project.techStacks?.length) meta.push(`Stack: ${project.techStacks.join(", ")}`);
    if (project.link) meta.push(`Live: ${project.link}`);

    return joinBlocks([
      `## ${project.title}`,
      project.description,
      meta.length ? bulletList(meta) : null,
    ]);
  });

  return joinBlocks([
    "Side projects and products, each with its stack and a public link where one exists.",
    ...entries,
    "## Writing",
    blogs.map((blog) => `- [${blog.title}](${blog.link}): ${blog.description}`).join("\n"),
  ]);
}

function renderBlogs(): string {
  return joinBlocks([
    "Technical writing on building systems, LLM pipelines and developer tooling. Articles are published on Medium.",
    "## Articles",
    blogs.map((blog) => `- [${blog.title}](${blog.link}): ${blog.description}`).join("\n"),
  ]);
}

const bodyBuilders: Record<string, () => string> = {
  "/": renderHome,
  "/about": () => renderLongFormPage(aboutPage),
  "/work": renderWork,
  "/projects": renderProjects,
  "/education": renderEducation,
  "/contact": () => renderLongFormPage(contactPage),
  "/privacy": () => renderLongFormPage(privacyPage),
};

/** The `.md` twin of a route: "/" -> "/index.md", "/work" -> "/work.md". */
export function markdownPathFor(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? "/index.md" : `${normalized}.md`;
}

/** Reverse of `markdownPathFor`, for resolving requests to "/work.md". */
export function routePathForMarkdownPath(path: string): string | null {
  if (!path.endsWith(".md")) return null;
  const withoutSuffix = path.slice(0, -".md".length);
  if (withoutSuffix === "" || withoutSuffix === "/index") return "/";
  return normalizePath(withoutSuffix);
}

function renderFooter(currentPath: string): string {
  const others = siteRoutes
    .filter((route) => route.path !== currentPath)
    .map(
      (route) =>
        `- [${route.title}](${absoluteUrl(markdownPathFor(route.path))}): ${route.description}`
    )
    .join("\n");

  const entrypoints = agentEntrypoints
    .map((entry) => `- [${entry.label}](${absoluteUrl(entry.path)}): ${entry.note}`)
    .join("\n");

  return joinBlocks(["---", "## Other pages", others, "## Machine-readable files", entrypoints]);
}

export type MarkdownDocument = {
  path: string;
  title: string;
  markdown: string;
};

export function getMarkdownDocument(path: string): MarkdownDocument | null {
  const normalized = normalizePath(path);
  const route = findRoute(normalized);
  const build = bodyBuilders[normalized];
  if (!route || !build) return null;

  const markdown = joinBlocks([
    `# ${route.title}`,
    `> ${route.description}`,
    bulletList([
      `Canonical HTML: ${absoluteUrl(route.path)}`,
      `Markdown: ${absoluteUrl(markdownPathFor(route.path))}`,
      `Author: ${person.name} (${person.email})`,
    ]),
    build(),
    renderFooter(normalized),
  ]);

  return { path: normalized, title: route.title, markdown: `${markdown}\n` };
}

/** Short markdown body served with a 404 so an agent can recover on its own. */
export function getNotFoundMarkdown(requestedPath: string): string {
  const pages = siteRoutes
    .map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`)
    .join("\n");

  const entrypoints = agentEntrypoints
    .map((entry) => `- [${entry.label}](${absoluteUrl(entry.path)}): ${entry.note}`)
    .join("\n");

  return `${joinBlocks([
    "# 404 — Page not found",
    `> \`${requestedPath}\` does not exist on ${siteUrl}. Nothing is served from that path; this is not a temporary error.`,
    "## Where to look instead",
    entrypoints,
    "## Every page on this site",
    pages,
    `Every page above also has a markdown twin at the same URL with a \`.md\` suffix, or via \`Accept: text/markdown\`.`,
  ])}\n`;
}
