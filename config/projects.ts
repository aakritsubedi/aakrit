export type Project = {
  title: string;
  /** Lowercase handle shown next to the index, e.g. "01 / murmur" */
  slug: string;
  /** A few lines on what it is and why it exists — the screenshot carries the rest */
  description: string;
  logo?: string;
  /** Screenshot shown full width; omit while one is still pending */
  thumbnail?: string;
  techStacks?: string[];
  /** Small muted label, e.g. "In progress" for anything unreleased */
  status?: string;
  link?: string;
};

export type Blog = {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
};

export const projects: Project[] = [
  {
    title: "Murmur",
    slug: "murmur",
    description:
      "A voice-first productivity app. You talk through your day and it turns the rambling into notes, tasks, and reminders instead of asking you to type it all up first. Built around the idea that capture should cost nothing — the structure can come later.",
    status: "Released on Playstore",
    thumbnail: "/projects/murmur.png",
    techStacks: ["ReactNative", "AI", "Calendar API", "Supabase"],
    link: "https://murmurapplication.com",
    logo: "/projects/murmur.webp"
  },
  {
    title: "MeroShare Plus",
    slug: "meroshare-plus",
    description:
      "Portfolio intelligence for NEPSE investors. It tracks holdings day to day and layers analysis on top, so the numbers come with some read on what actually moved and why. Grew out of doing the same spreadsheet work by hand every evening.",
    thumbnail: "/projects/meroshare-plus.png",
    techStacks: ["NextJs", "AI", "LLM Prompt", "IndexDB"],
    link: "https://meroshare-plus.netlify.app",
    logo: "/projects/nepseai.jpg",
  },
  {
    title: "BCTNotes",
    slug: "bctnotes",
    description:
      "A resource-sharing platform where Computer Engineering students trade class notes, past papers, and study material. I started it as a student because none of that existed in one place, and it now serves 14K+ students across the syllabus.",
    logo: "/projects/bctnotes.png",
    thumbnail: "/projects/bctnotes-thumbnail.png",
    techStacks: ["Next.js", "TypeScript", "Nest.js"],
    link: "https://www.aakritsubedi9.com.np",
  },
  {
    title: "Sheets2API",
    slug: "sheets2api",
    description:
      "Turns a Google Sheet into a RESTful API. Point it at a sheet and you get read and write endpoints, so an MVP or an internal tool can ship without standing up a backend and a database behind it.",
    logo: "/projects/sheets2api.png",
    thumbnail: "/projects/sheets2api-thumbnail.png",
    techStacks: ["Next.js", "TypeScript", "Nest.js", "LLM"],
    link: "https://sheets2api.pro/",
  },
  {
    title: "Plan OS",
    slug: "plan-os",
    description:
      "A task manager built around one thing at a time. You pick a block — study, coding, whatever it is — and the interface deliberately hides everything else until that block is done. Made for my own habit of keeping twelve tabs of half-started work open.",
    logo: "/projects/planOs.png",
    thumbnail: "/projects/planOs-thumbnail.webp",
    techStacks: ["Next.js", "TypeScript", "Nest.js", "LLM"],
    link: "https://plan-os.space/",
  },
  {
    title: "NEPSE AI",
    slug: "nepse-ai",
    description:
      "Automated market insights for Nepal's stock exchange. It pulls the day's trading data, writes the daily and weekly summaries, and publishes them to Instagram with no human in the loop — the pipeline has been running on its own since launch.",
    logo: "/projects/nepseai.jpg",
    thumbnail: "/projects/nepseai-thumbnail.png",
    techStacks: ["Next.js", "TypeScript", "Nest.js", "LLM"],
    link: "https://www.instagram.com/nepse.ai/",
  },
];

export const blogs: Blog[] = [
  {
    title: "From Bank PDFs to Weekly Cashflow: How I Built a PageIndex-Style API",
    description:
      "Turning statement PDFs into a queryable index, and the weekly cashflow view that falls out of it once the pages are structured.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ozHfYy-QJL6Z239VKqT8kg.png",
    link: "https://medium.com/@subediaakrit/from-bank-pdfs-to-weekly-cashflow-how-i-built-a-pageindex-style-api-1c203ccd910a",
  },
  {
    title: "Linux Command Toolkit for Developers",
    description:
      "The core commands behind efficient terminal work — navigating file systems, managing processes, and debugging servers.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1MFz11p95teVGCuL4IXiYQ.png",
    link: "https://medium.com/@subediaakrit/linux-command-c59f4eb32dab",
  },
  {
    title: "NEPSE AI: Automating Stock Market Insights on Instagram",
    description:
      "Daily market updates, weekly analysis, and investor newsletters, generated and published without a human in the loop.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0kgv6FHpxwNlsr14NRkDcw.png",
    link: "https://medium.com/@subediaakrit/nepse-ai-automating-stock-market-insights-on-instagram-677d5048fd8d",
  },
  {
    title: "Using free resources for uptime monitor and status page",
    description:
      "Setting up an uptime monitor and a public status page on GitHub, without paying for any of it.",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VsrkqnxhqECXwjWfyjQvjw.png",
    link: "https://medium.com/@subediaakrit/using-free-resources-for-uptime-monitor-and-status-page-06b60ce53c08",
  },
];
