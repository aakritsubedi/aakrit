import React from "react";
import { ArrowRight } from "lucide-react";

function Information() {
  return (
    <section className="mx-auto max-w-3xl pb-20 pt-12">
      {/* Same sheet-header treatment as the contact sheet above */}
      <div className="mb-5 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
        <span className="text-foreground">still learning</span>
        <span>talks · meetups · conversations</span>
      </div>

      <p className="max-w-2xl font-light leading-relaxed text-muted-foreground">
        I&apos;m always curious about what&apos;s changing in tech — new tools,
        new frameworks, new ideas. More than trying them, I like understanding{" "}
        <span className="text-foreground">how they actually work</span> and
        where they make sense. So I go deep, build something real with them, and
        share what I learn through talks, meetups, and conversations with other
        engineers.
      </p>

      {/* Collaboration CTA — bordered and offset, matching the photo frames */}
      <a
        href="mailto:aakritsubedi9@gmail.com"
        className="group mt-8 flex flex-col gap-2 border border-foreground/20 p-5 transition-[box-shadow,transform] duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0_0_hsl(var(--foreground))] focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="font-mono text-sm text-foreground">
          open to collaborations
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          let&apos;s build something
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
        </span>
      </a>
    </section>
  );
}

export default Information;
