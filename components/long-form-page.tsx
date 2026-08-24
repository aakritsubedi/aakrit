import Link from "next/link";
import React from "react";

import type { LongFormPage } from "@/config/pages";

/**
 * Renders the /about, /contact and /privacy pages from `config/pages.ts` using
 * the same sheet-header chrome as /work and /education, so the trust-anchor
 * pages read as part of the site rather than bolted on.
 */

function isInternal(href: string) {
  return href.startsWith("/") && !href.endsWith(".pdf");
}

function SectionLinks({ links }: { links: NonNullable<LongFormPage["sections"][number]["links"]> }) {
  return (
    <ul className="mt-4 space-y-3 font-light leading-relaxed text-muted-foreground">
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`} className="flex gap-3 text-sm">
          <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25" />
          <span>
            {isInternal(link.href) ? (
              <Link
                href={link.href}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {link.label}
              </a>
            )}
            {link.note ? <span> — {link.note}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LongFormPageView({ page }: { page: LongFormPage }) {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
        </div>

        {/* Sheet header — ties the page to the rest of the site */}
        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">{page.eyebrow}</span>
          <span>{page.meta}</span>
        </div>

        <div className="mt-8 max-w-2xl space-y-4 font-light leading-relaxed text-muted-foreground">
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading} className="max-w-2xl">
              <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>

              {section.paragraphs?.length ? (
                <div className="mt-4 space-y-4 font-light leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.bullets?.length ? (
                <ul className="mt-4 space-y-2 font-light leading-relaxed text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm">
                      <span
                        aria-hidden
                        className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.links?.length ? <SectionLinks links={section.links} /> : null}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
