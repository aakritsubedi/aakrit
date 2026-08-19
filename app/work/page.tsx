export const metadata = {
  title: "Work Experience | Aakrit Subedi",
  description:
    "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
  robots: "index, follow",
  openGraph: {
    title: "Work Experience | Aakrit Subedi",
    description:
      "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
    url: "https://aakritsubedi.com.np/work",
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
    title: "Work Experience | Aakrit Subedi",
    description:
      "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
};
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { workExperience, workIntro } from "@/config/experience";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function WorkPage() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex gap-4 flex-col">
          {/* <span className="text-7xl">💼</span> */}
          <h1 className="text-3xl font-semibold tracking-tight">
            Work Experience
          </h1>
        </div>

        {/* Sheet header — ties the page to the rest of the site */}
        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">work</span>
          <span>2019 — present</span>
        </div>

        <div className="mt-8 max-w-2xl space-y-4 font-light leading-relaxed text-muted-foreground">
          {workIntro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <Link href="/AakritSubedi.pdf" target="_blank" className="mt-6 rounded-full font-mono text-xs flex gap-1 items-center" download>
          resume (PDF)
          <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>

        {/* Timeline */}
        <section
          aria-labelledby="experience-heading"
          className="mt-16 border-t pt-12"
        >
          <h2 id="experience-heading" className="sr-only">
            Experience
          </h2>

          {workExperience.map((role) => (
            <article
              key={role.id}
              aria-labelledby={`${role.id}-title`}
              className="grid gap-y-3 sm:grid-cols-[7.5rem_1fr] sm:gap-x-8"
            >
              {/* Date rail */}
              <p className="font-mono text-xs leading-relaxed text-muted-foreground sm:pt-1">
                {role.period ?? "—"}
              </p>

              <div className="relative border-foreground/15 pb-14 sm:border-l sm:pl-8">
                {/* Node on the rail */}
                <span
                  aria-hidden
                  className="absolute -left-[3.5px] top-2 hidden h-1.5 w-1.5 rounded-full bg-foreground sm:block"
                />

                <h3
                  id={`${role.id}-title`}
                  className="text-lg font-semibold tracking-tight"
                >
                  {role.title}
                </h3>

                <div className="mt-5 space-y-8">
                  {role.companies.map((company) => (
                    <div key={company.name}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          className={cn(
                            "h-7 w-7 rounded-md",
                            company.logoClassName
                          )}
                        >
                          <AvatarImage
                            src={company.logo}
                            alt={company.logoAlt}
                            className={company.logoImageClassName}
                          />
                          <AvatarFallback className="rounded-md text-[10px]">
                            {company.fallback}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {company.name}
                            {company.note ? (
                              <span className="font-light text-muted-foreground">
                                {" "}
                                {company.note}
                              </span>
                            ) : null}
                          </p>
                          {company.domain ? (
                            <p className="font-mono text-[10px] text-muted-foreground/70">
                              {company.domain}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      {/* Role progression — quiet arrow chain, latest title carries the weight */}
                      {company.progression ? (
                        <ol
                          aria-label={`Roles held at ${company.name}`}
                          className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-muted-foreground/60 sm:ml-10"
                        >
                          {company.progression.map((step, index) => (
                            <li
                              key={step.title}
                              className="flex items-center gap-2"
                            >
                              {index > 0 ? (
                                <span aria-hidden className="text-foreground/25">
                                  →
                                </span>
                              ) : null}
                              <span
                                className={cn(
                                  index === company.progression!.length - 1 &&
                                    "text-foreground/70"
                                )}
                              >
                                {step.title}
                                {step.year ? (
                                  <span className="text-muted-foreground/45">
                                    {" "}
                                    · {step.year}
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ))}
                        </ol>
                      ) : null}

                      <ul className="mt-3 space-y-2 font-light leading-relaxed text-sm text-muted-foreground">
                        {company.bullets.map((bullet, index) => (
                          <li key={index} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default WorkPage;
