import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProjectPage() {
  const blogs = [
    {
      title: "NEPSE AI: Automating Stock Market Insights on Instagram",
      thumbnail:
        "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0kgv6FHpxwNlsr14NRkDcw.png",
      description:
        "From daily market updates to weekly analysis and investor newsletters, NEPSE AI seamless real-time insights, engaging content.",
      link: "https://medium.com/@subediaakrit/using-free-resources-for-uptime-monitor-and-status-page-06b60ce53c08",
    },
    {
      title: "Using free resources for uptime monitor and status page",
      thumbnail:
        "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VsrkqnxhqECXwjWfyjQvjw.png",
      description:
        "A comprehensive guide to setting up an uptime monitor and status page using free resources.",
      link: "https://medium.com/@subediaakrit/using-free-resources-for-uptime-monitor-and-status-page-06b60ce53c08",
    },
  ];

  const projects = [
    {
      title: "BCTNotes",
      logo: "/projects/bctnotes.png",
      thumbnail: "/projects/bctnotes-thumbnail.png",
      description:
        "A resource sharing platform for Computer Engineering Students, where students can share class notes, past papers, and study materials.",
      techStacks: ["NEXT Js", "TypeScript", "Nest Js", "LLM AI"],
      link: "https://www.aakritsubedi9.com.np",
    },
    {
      title: "Sheets2API",
      logo: "/projects/sheets2api.png",
      thumbnail: "/projects/sheets2api-thumbnail.png",
      description:
        "Turn Google Sheets into powerful RESTful APIs. Build MVPs faster without complex backend setup.",
      techStacks: ["NEXT Js", "TypeScript", "Nest Js", "LLM AI"],
      link: "https://sheets2api.pro/",
    },
    {
      title: "Plan OS",
      logo: "/projects/planOs.png",
      thumbnail: "/projects/planOs-thumbnail.webp",
      description:
        "Plan OS is simple task management app that will help you manage your time and let you focus on any tasks such as study, or coding.",
      techStacks: ["NEXT Js", "TypeScript", "Nest Js", "LLM AI"],
      link: "https://plan-os.space/",
    },
    {
      title: "NEPSE AI",
      logo: "/projects/nepseai.jpg",
      thumbnail: "/projects/nepseai-thumbnail.png",
      description:
        "NEPSE AI is a platform that provides automated stock market insights, helping investors make informed decisions.",
      techStacks: ["NEXT Js", "TypeScript", "Nest Js", "LLM AI"],
      link: "https://www.instagram.com/nepse.ai/",
    },
  ];

  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-10 pb-20 flex flex-col gap-4">
        <div className="flex gap-4 flex-col">
          <span className="text-7xl">💻</span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            <span className="text-gray-500">
              Projects I work on during weekends to explore new technologies and
              solve real problems.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              href={project.link}
              className="inline-block text-sm font-medium text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                key={project.title}
                className="rounded-lg border border-muted p-4 transition hover:border-gray-200 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={project.logo}
                    alt={project.title}
                    width={25}
                    height={25}
                    className="rounded-sm"
                  />
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                </div>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-md"
                />
                <p className="text-sm text-muted-foreground font-normal">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <Separator className="w-40" />
      </div>

      <section className="container mx-auto max-w-3xl px-4 py-10 pb-20 flex flex-col gap-4">
        <div className="flex gap-4 flex-col">
          <span className="text-7xl">✍️</span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
            <span className="text-gray-500">
              Sharing my thoughts and experiences in software development and
              technology.
            </span>
          </div>
        </div>

        <div className="grid grid:cols-1 md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Link
              href={blog.link}
              className="inline-block text-sm font-medium text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                key={blog.title}
                className="rounded-lg border border-muted p-4 transition hover:border-gray-200 flex flex-col gap-3"
              >
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="rounded-md"
                />
                <p className=" text-sm text-muted-foreground">
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
