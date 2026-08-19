export type ProgressionStep = {
  /** Title held at this point, e.g. "Associate Software Engineer" */
  title: string;
  /** When the step started, e.g. "2019". Optional — the chain reads fine without it */
  year?: string;
};

export type ExperienceCompany = {
  name: string;
  /** Small muted note after the company name, e.g. "(acquired by reAlpha)" */
  note?: string;
  /** Titles held here, oldest first — rendered as a quiet arrow chain */
  progression?: ProgressionStep[];
  logo: string;
  logoAlt: string;
  /** Extra classes on the avatar container, for logos needing their own backdrop */
  logoClassName?: string;
  /** Extra classes on the logo image itself, e.g. "object-contain" */
  logoImageClassName?: string;
  /** Initials shown while the logo loads or if it fails */
  fallback: string;
  /** What the company/product actually does — shown as a mono metadata line */
  domain?: string;
  bullets: string[];
};

export type ExperienceRole = {
  /** Used for the heading id / aria-labelledby wiring */
  id: string;
  title: string;
  period?: string;
  companies: ExperienceCompany[];
};

export const workIntro: string[] = [
  "I started out at Leapfrog Technology right after my undergrad as an associate software engineer through their internship programWithin a year, I moved into a Software Engineer role and spent the next couple of years building web and mobile applications across ed-tech and health-tech web and mobile applications and learning how software actually gets shipped.",
  "I then joined Naamche as a software engineer, building products for reAlpha. I grew into a tech lead, helping establish engineering standards and best practices, and later moved into engineering management, leading teams while continuing to build alongside them across client and internal products. I stayed through the acquisition and the growth that followed.",
  // "I’m now at Cantordust, building a product for the pharmaceutical industry that turns raw documents into something teams can actually search, question, and act on. It’s early, which means the work spans product, architecture, and code all at once.",
  "Alongside all of this, I keep building personal projects and take on the occasional freelance engagement. It’s how I try out new technologies and stay close to problems outside my day job.",
];

export const workExperience: ExperienceRole[] = [
  // {
  //   id: "lead-engineer",
  //   title: "Lead Engineer",
  //   period: "Mid 2026 - Present",
  //   companies: [
  //     {
  //       name: "Cantordust",
  //       logo: "/work/cantordust-mark.png",
  //       logoAlt: "Cantordust logo",
  //       logoClassName: "bg-black p-1",
  //       logoImageClassName: "object-contain",
  //       fallback: "CD",
  //       domain: "pharma document intelligence",
  //       bullets: [
  //         "Building the ingestion and processing pipeline that parses raw pharmaceutical documents into structured, queryable data models",
  //         "Owning architecture across the stack: services, data model, retrieval layer, and the infrastructure it runs on",
  //         "Setting the engineering foundations of an early-stage product (repo structure, CI, deployments, review practices) while scoping work with the team and domain experts",
  //       ],
  //     },
  //   ],
  // },
  {
    id: "engineering-manager",
    title: "Engineering Manager",
    period: "2021 - 2026",
    companies: [
      {
        name: "reAlpha",
        note: "(NASDAQ: $AIRE)",
        progression: [
          { title: "Engineering Manager", year: "2024" },
        ],
        logo: "/work/realpha.jpeg",
        logoAlt: "Naamche Inc. logo",
        fallback: "re",
        domain: "helped setting up standards across verticles",
        bullets: [
          "Ensured engineering quality and standards across multiple projects under reAlpha, driving consistency in architecture, development practices, and delivery.",
          "Led technical resource planning, aligning engineering capacity with project workload, priorities, and delivery needs",
          "Worked closely with stakeholders and management, bridging business priorities with engineering execution and keeping teams aligned",
          "Helped establish processes and standards across QA and design teams, improving collaboration and consistency across the product development lifecycle"
        ],
      },
      {
        name: "Naamche Inc.",
        note: "(acquired by reAlpha)",
        progression: [
          { title: "Software Engineer", year: "2021" },
          { title: "Tech Lead", year: "2021" },
          { title: "Engineering Manager", year: "2024" },
        ],
        logo: "/work/naamche.png",
        logoAlt: "Naamche Inc. logo",
        fallback: "N",
        domain: "client & internal products",
        bullets: [
          "Led architecture and delivery across several client and internal products while staying hands-on in the codebase, spanning backend, frontend, and infrastructure",
          "Owned the full lifecycle: system design, API contracts, CI/CD pipelines, AWS deployments, and iteration driven by production feedback",
          "Designed scalable services and data models in Node.js, TypeScript, GraphQL, and PostgreSQL, adding caching and query tuning where load justified it",
          "Set technical direction and review standards, then grew engineers into owning them through pairing, design reviews, and regular feedback",
          "Turned ambiguous client requirements into scoped technical plans and estimates with stakeholders across the US and Nepal",
          "Ran sprint planning, stand-ups, and retrospectives to keep delivery predictable and surface blockers early",
        ],
      },
      {
        name: "AiChat Pte Ltd.",
        note: "(acquired by reAlpha)",
        logo: "/work/aichat.png",
        logoAlt: "AiChat logo",
        fallback: "AC",
        domain: "conversational AI platform",
        bullets: [
          "Rebuilt the chatbot around LLMs, covering prompt orchestration, grounding responses in client content, and graceful fallbacks when the model or an upstream service failed",
          "Owned the platform end to end: service architecture, async message processing, observability, and the cost profile of the model layer",
          "Shipped and maintained channel integrations with WhatsApp, Facebook Messenger, and Instagram, handling webhook reliability, rate limits, and delivery guarantees",
          "Debugged production incidents alongside clients and converted recurring failures into fixes, alerts, and regression coverage",
          "Coordinated a distributed team across Nepal, Indonesia, and Singapore, keeping technical feasibility aligned with product and sales commitments",
        ],
      },
    ],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    period: "2019 - 2021",
    companies: [
      {
        name: "Leapfrog Technology",
        progression: [
          { title: "Associate Software Engineer", year: "2019" },
          { title: "Software Engineer", year: "2020" },
        ],
        logo: "/work/lf-logo.png",
        logoAlt: "Leapfrog Technology logo",
        fallback: "LF",
        domain: "ed-tech & health-tech",
        bullets: [
          "Built and shipped ed-tech and health-tech web and mobile applications, working across REST APIs, relational schemas, and frontend state management",
          "Took features from planning through release, breaking specs into tasks and estimating alongside senior engineers",
          "Mentored new engineers and interns on Node.js API development, service structure, and review discipline",
          "Interviewed software engineer and intern candidates as part of the hiring loop",
          "Coordinated Leapfrog's first Data Internship batch, shaping the curriculum, mentoring, and hands-on project work",
        ],
      },
    ],
  },
  {
    id: "freelance-engineer",
    title: "Freelance Engineer",
    companies: [
      {
        name: "WealthTech",
        logo: "/work/wealthtech.png",
        logoAlt: "WealthTech logo",
        fallback: "WT",
        domain: "Software company based on Australia",
        bullets: [
          "Delivered web and mobile products for services clients, from data modelling and API design through to release",
          "Worked directly with the founder on market and technical research, building proof-of-concepts that helped win new clients",
          "Designed and built an internal employee management system covering records and day-to-day operational workflows",
        ],
      },
      {
        name: "Upwork",
        logo: "/work/upwork.png",
        logoAlt: "Upwork logo",
        fallback: "Up",
        domain: "multiple freelance projects",
        bullets: [
        "Delivered multiple full-stack applications across web and mobile platforms",
        "Set up and improved deployment pipelines for both frontend and backend applications",
        "Integrated third-party services and external providers, including building data pipelines to send and retrieve data reliably",
        ],
      },
    ],
  },
];
