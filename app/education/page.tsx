import { absoluteUrl } from "@/config/site";
import { alternatesFor } from "@/lib/seo/metadata";

export const metadata = {
  title: "Education | Aakrit Subedi",
  description: "Academic background, degrees, and projects of Aakrit Subedi.",
  alternates: alternatesFor("/education"),
  robots: "index, follow",
  openGraph: {
    title: "Education | Aakrit Subedi",
    description: "Academic background, degrees, and projects of Aakrit Subedi.",
    url: absoluteUrl("/education"),
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Aakrit Subedi - Software Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education | Aakrit Subedi",
    description: "Academic background, degrees, and projects of Aakrit Subedi.",
    creator: "@SubediAakrit",
    images: [absoluteUrl("/og-image.png")],
  },
};
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { educationInformation } from "@/config/education";
import { AccordionContent } from "@radix-ui/react-accordion";
import React from "react";

function EducationPage() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex gap-4 flex-col">
          {/* <span className="text-7xl">🎓</span> */}
          <h1 className="text-3xl font-semibold tracking-tight">Education</h1>
        </div>

        {/* Sheet header — ties the page to the rest of the site */}
        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">academic record</span>
          <span>2012 — 2019</span>
        </div>

        <section aria-labelledby="education-heading" className="mt-12">
          <h2 id="education-heading" className="sr-only">
            Education
          </h2>

          {educationInformation.map((education, index) => (
            <article
              key={index}
              aria-labelledby={`education-${index}`}
              className="grid gap-y-3 sm:grid-cols-[7.5rem_1fr] sm:gap-x-8"
            >
              {/* Date rail */}
              <time className="font-mono text-xs leading-relaxed text-muted-foreground sm:pt-1">
                {education.year}
              </time>

              <div className="relative border-foreground/15 pb-14 sm:border-l sm:pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[3.5px] top-2 hidden h-1.5 w-1.5 rounded-full bg-foreground sm:block"
                />

                <h3
                  id={`education-${index}`}
                  className="text-lg font-semibold tracking-tight"
                >
                  {education.title}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-7 w-7 rounded-md">
                    <AvatarImage
                      src={education.logo}
                      alt={`${education.instituteName} logo`}
                    />
                    <AvatarFallback className="rounded-md text-[10px]">
                      {education.instituteName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{education.instituteName}</p>
                </div>

                <ul className="mt-4 space-y-2 font-light leading-relaxed text-muted-foreground">
                  {education.details.map((detail, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span
                        aria-hidden
                        className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {education.academicProjects && (
                  <div className="mt-8">
                    <p className="mb-1 border-b border-foreground/15 pb-2 font-mono text-[11px] text-foreground">
                      academic projects
                    </p>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      // defaultValue="item-0"
                    >
                      {education.academicProjects.map((project, i) => (
                        <AccordionItem value={`item-${i}`} key={i} className="text-sm">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-left">
                              <span className="font-medium">
                                {project.title}
                              </span>
                              <span className="font-mono text-[10px] font-normal text-muted-foreground/70">
                                {project.type}
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3 pb-5">
                            <p className="font-light leading-relaxed text-muted-foreground">
                              {project.description}
                            </p>
                            <ul className="space-y-2 text-sm font-light leading-relaxed text-muted-foreground">
                              {project.details.map((detail, j) => (
                                <li key={j} className="flex gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                                  />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default EducationPage;
