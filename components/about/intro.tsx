import React from "react";
import { SpriteAvatar } from "../sprite-avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Every fact from the long-form intro lives here, compressed into scannable
// rows so the hero can stay short without dropping anything.
const receipts = [
  {
    label: "Naamche → reAlpha",
    meta: "engineering leadership",
    body: "Joined as a founding team of 5–6 and stayed through the growth to 75+ and the acquisition by reAlpha. Led engineering across several products while staying hands-on — architecture decisions, working in the codebase, and sitting with our US teams and clients to figure out what they actually needed. Mentored engineers and helped build the teams around me.",
  },
  {
    label: "AiChat",
    meta: "most recent",
    body: "Led the rebuild of the product around LLMs and shipped it across WhatsApp, Messenger, and Instagram. Most of that work came from handling production issues firsthand and listening to where clients were getting stuck, then fixing the product so they wouldn't keep running into the same problems.",
  },
  {
    label: "BCTNotes",
    meta: "14K+ students",
    body: "Started it because, as a student, I couldn't find decent notes and past papers in one place. Designed and built the whole thing; it has grown into a platform where 14K+ engineering students share and use study materials.",
  },
];

function Intro() {
  return (
    <div className="mx-auto max-w-3xl py-14 sm:py-20">
      <SpriteAvatar
        className="-ml-3 w-44 sm:w-56"
        label="Aakrit waving, typing, thinking, drinking coffee, and gesturing at his desk"
      />

      <p className="mt-6 font-mono text-sm text-muted-foreground sm:text-base">
        Hi, I&apos;m Aakrit Subedi&nbsp;
        <span className="animate-pulse">👋</span>
      </p>

      <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        I build systems that run in production.
      </h1>

      <p className="mt-6 max-w-xl font-light leading-relaxed text-muted-foreground">
        I like figuring out how a system should work, getting into the code, and
        solving the problems that come with actually running it. Engineering
        leadership at Naamche from a founding team of 5–6 through an
        acquisition. LLM products in front of real users. A study platform 14K+
        engineering students rely on. Receipts below.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link href="/work">
            See my work
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <dl className="mt-14 space-y-8 border-t pt-10">
        {receipts.map((item) => (
          <div
            key={item.label}
            className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <dt className="font-mono text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground/70">
                {item.meta}
              </span>
            </dt>
            <dd className="font-light leading-relaxed text-muted-foreground">
              {item.body}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Intro;
