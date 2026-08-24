import Link from "next/link";
import React from "react";

import { agentEntrypoints, siteRoutes } from "@/config/site";

export const metadata = {
  title: "404 — Page not found | Aakrit Subedi",
  description:
    "That page does not exist. Here is everything that does, plus the machine-readable index of this site.",
  robots: "noindex, follow",
};

/**
 * Browsers land here. Non-browser clients get a markdown 404 with the same
 * links, served from `middleware.ts` — see `lib/content/markdown.ts`.
 */
export default function NotFound() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            404 — Page not found
          </h1>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">404</span>
          <span>nothing is served from that path</span>
        </div>

        <p className="mt-8 max-w-2xl font-light leading-relaxed text-muted-foreground">
          The URL you asked for does not exist on this site, and it is not a
          temporary error. Everything this site has is listed below.
        </p>

        <section className="mt-12 max-w-2xl">
          <h2 className="text-lg font-semibold tracking-tight">Every page</h2>
          <ul className="mt-4 space-y-3 font-light leading-relaxed text-muted-foreground">
            {siteRoutes.map((route) => (
              <li key={route.path} className="flex gap-3 text-sm">
                <span
                  aria-hidden
                  className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                />
                <span>
                  <Link
                    href={route.path}
                    className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {route.title}
                  </Link>
                  <span> — {route.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-2xl">
          <h2 className="text-lg font-semibold tracking-tight">
            Machine-readable index
          </h2>
          <ul className="mt-4 space-y-3 font-light leading-relaxed text-muted-foreground">
            {agentEntrypoints.map((entry) => (
              <li key={entry.path} className="flex gap-3 text-sm">
                <span
                  aria-hidden
                  className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                />
                <span>
                  <a
                    href={entry.path}
                    className="font-mono text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {entry.label}
                  </a>
                  <span> — {entry.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
