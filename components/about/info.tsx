import React from "react";
import { ArrowRight } from "lucide-react";

function Information() {
  return (
    <section className="mx-auto max-w-3xl pb-20 pt-16">
      {/* Sheet-header treatment, same as the contact sheet above */}
      <div className="mb-8 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
        <span className="text-foreground"></span>
        <span>initial spark → still exploring</span>
      </div>

      <h2 className="text-3xl font-bold leading-none tracking-tight sm:text-5xl">
        <span className="inline-block bg-foreground px-2 py-1 text-background">
          a bit more
        </span>
      </h2>

      <div className="mt-10 max-w-2xl space-y-6 font-light leading-relaxed text-muted-foreground">
        <p>
        My first website was in grade 9 ... loud colours, marquee text scrolling in both directions, and too many photos. It was terrible, but I had a lot of fun making it. At grade 10, a small school management system in QBASIC for my final project, mostly because I was curious to see how far I could take it.
        </p>

        <p>
          That habit followed me into engineering college. Every semester meant
          a few more projects — some for coursework, most just for myself
          because building the thing was the only way the fundamentals ever
          really stuck. A few of them made it to{" "}
          <span className="text-foreground">
            intra-college competitions, and a few came back with prizes
          </span>{" "}
          — a nice cherry on top of something I was going to build anyway.
        </p>

        <p>
          I started interning right after college. That&apos;s where the basics
          got sharpened and where I learned how the industry actually works:
          shipping to real users, reviews, deadlines, and everything that
          happens after the code is merged.
        </p>

        <p>
          Two years in, I joined{" "}
          <span className="text-foreground">
            Naamche as a founding engineer
          </span>{" "}
          — bringing what I&apos;d picked up from industry while keeping the
          startup instinct alive: move fast, own the problem, figure it out. Learning new things, shipping new features, and taking on new challenges. The
          company grew, and I grew with it.
        </p>

        <p>
          Weekends still go to side projects. Something I learn at work finds
          its way into a personal project, and something I built on a weekend
          finds its way back into work. I like pulling new tools and frameworks
          apart to understand{" "}
          <span className="text-foreground">how they actually work</span> and
          where they make sense.
        </p>

        <p>
          And whatever I pick up, I try to pass on through meetups, talks, and
          long conversations with engineering students who are somewhere around
          where I started.
        </p>
      </div>

      {/* Collaboration CTA — bordered and offset, matching the photo frames */}
      <a
        href="mailto:aakritsubedi9@gmail.com"
        className="group mt-10 flex flex-col gap-2 border border-foreground/20 p-5 transition-[box-shadow,transform] duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0_0_hsl(var(--foreground))] focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between"
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
