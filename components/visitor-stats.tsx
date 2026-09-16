"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type VisitorStatsResponse = {
  online: number;
  visitorsTotal: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export function VisitorStats() {
  const [stats, setStats] = useState<VisitorStatsResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/analytics", { cache: "no-store" });
        if (!response.ok) return;

        const nextStats = (await response.json()) as VisitorStatsResponse;
        if (
          mounted &&
          Number.isFinite(nextStats.online) &&
          Number.isFinite(nextStats.visitorsTotal)
        ) {
          setStats(nextStats);
        }
      } catch {
        // Keep the compact placeholder visible if analytics is unavailable.
      }
    }

    loadStats();
    const interval = window.setInterval(loadStats, 60_000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] leading-none text-muted-foreground transition-[color,transform] duration-200 hover:-translate-y-px hover:text-foreground focus-within:-translate-y-px focus-within:text-foreground sm:text-xs motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden
          className="h-2 w-2 bg-foreground"
        />
        <span className="font-semibold tabular-nums text-foreground">
          {stats ? numberFormatter.format(stats.online) : "—"}
        </span>
        <span className="text-foreground">online</span>
      </span>
      <span aria-hidden className="text-muted-foreground/50">
        ·
      </span>
      <span>
        <span className="tabular-nums">
          {stats ? numberFormatter.format(stats.visitorsTotal) : "—"}
        </span>{" "}
        visitors total
      </span>
      <a
        href="https://datafa.st/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View analytics on DataFast"
        className="inline-flex items-center gap-1 text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
      >
        stats
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}
