export const metadata = {
  title: "Projects | Aakrit Subedi",
  description:
    "Portfolio of software projects and products built by Aakrit Subedi.",
  robots: "index, follow",
  openGraph: {
    title: "Projects | Aakrit Subedi",
    description:
      "Portfolio of software projects and products built by Aakrit Subedi.",
    url: "https://aakritsubedi.com.np/projects",
    images: [
      {
        url: "https://aakritsubedi.com.np/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aakrit Subedi - Software Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Aakrit Subedi",
    description:
      "Portfolio of software projects and products built by Aakrit Subedi.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
};
import { blogs, projects, type Project } from "@/config/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/** Zero-padded index for the "01 / slug" rail above each entry */
function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ProjectEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const headingId = `project-${project.slug}`;

  return (
    <article aria-labelledby={headingId} className="scroll-mt-24">
      {/* Index rail — 01 / murmur */}
      <div className="flex items-baseline justify-between gap-4 border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
        <span>
          {indexLabel(index)} <span className="px-1 opacity-40">/</span>
          <span className="text-foreground">{project.slug}</span>
        </span>
        {project.status ? <span>{project.status}</span> : null}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {project.logo ? (
          <Image
            src={project.logo}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-md object-contain"
          />
        ) : null}
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {project.title}
        </h2>
      </div>

      <p className="mt-4 max-w-xl font-light leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {project.link ? (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          visit {project.slug}
          <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}

      {/* Screenshot */}
      {project.thumbnail ? (
        <div className="mt-8 overflow-hidden rounded-lg border border-foreground/15 bg-muted/30">
          <Image
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            width={1600}
            height={900}
            className="aspect-[16/9] w-full object-cover object-top"
          />
        </div>
      ) : (
        <div className="mt-8 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed border-foreground/15 bg-muted/20">
          <span className="font-mono text-[11px] text-muted-foreground/70">
            screenshot pending
          </span>
        </div>
      )}

      {project.techStacks?.length ? (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground/70">
          {project.techStacks.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function ProjectPage() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex gap-4 flex-col">
          {/* <span className="text-7xl">💻</span> */}
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        </div>

        {/* Sheet header — ties the page to the rest of the site */}
        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">side projects</span>
          <span>
            {String(projects.length).padStart(2, "0")} entries
          </span>
        </div>

        <p className="mt-8 max-w-2xl font-light leading-relaxed text-muted-foreground">
          Things I build on weekends to try out new technologies and solve
          problems I keep running into. Some are live and used by other people,
          some are still half-finished.
        </p>

        <div className="mt-16 space-y-20">
          {projects.map((project, index) => (
            <ProjectEntry
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex gap-4 flex-col">
          {/* <span className="text-7xl">✍️</span> */}
          <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">writing</span>
          <span>medium</span>
        </div>

        <p className="mt-8 max-w-2xl font-light leading-relaxed text-muted-foreground">
          Notes on what I&apos;ve built and what broke along the way.
        </p>

        <div className="mt-12 divide-y divide-foreground/15 border-t border-foreground/15">
          {blogs.map((blog) => (
            <Link
              href={blog.link}
              className="group flex flex-col gap-4 py-6 sm:flex-row"
              target="_blank"
              rel="noopener noreferrer"
              key={blog.title}
            >
              <Image
                src={blog.thumbnail}
                alt=""
                width={600}
                height={400}
                className="aspect-[16/9] w-full rounded-md border border-foreground/15 object-cover sm:w-40 sm:shrink-0"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-medium tracking-tight underline-offset-4 group-hover:underline">
                  {blog.title}
                  <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />
                </h2>
                <p className="font-light leading-relaxed text-muted-foreground">
                  {blog.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;
