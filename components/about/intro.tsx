import React from "react";
import { SpriteAvatar } from "../sprite-avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Every fact from the long-form intro lives here, compressed into scannable
// rows so the hero can stay short without dropping anything.
const receipts = [
  {
    label: "AiChat",
    info: "acquired by reAlpha",
    meta: "most recent",
    body: "Led the rebuild of AIChat around LLMs, working with a cross-country team across India, Nepal, Singapore, and the US. Expanded capabilities across WhatsApp, Messenger, and Instagram, built internal tools, ran product experiments, handled client issues, and solved scaling challenges as usage and clients grew.",
  },
  {
    label: "Naamche → reAlpha",
    info: "",
    meta: "engineering leadership",
    body: "Joined as a founding team member of 7 and grew with the company to 75+ employees through its acquisition by reAlpha. Led engineering across multiple products, staying hands-on with architecture, code, and US clients. Mentored engineers, built teams, and interviewed new talent.",
  },
  {
    label: "BCTNotes",
    info: "personal project",
    meta: "14K+ students",
    body: "Started it because, as a student, I couldn't find decent notes and past papers in one place. Designed and built the whole thing; it has grown into a platform where 14K+ engineering students share and use study materials.",
  },
];

function Intro() {
  return (
    <div className="mx-auto max-w-3xl py-12 sm:py-18">
      <SpriteAvatar
        className="w-44 sm:w-56"
        label="Aakrit waving, typing, thinking, drinking coffee, and gesturing at his desk"
      />

      <p className="mt-6 font-mono text-sm text-muted-foreground sm:text-base">
        Hi, I&apos;m Aakrit Subedi&nbsp;
        <span className="animate-pulse">👋</span>
      </p>

      <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        I build systems from idea to production.
      </h1>

      <p className="mt-6 max-w-xl font-light leading-relaxed text-muted-foreground">
        I like figuring out how systems should work, getting into the code, and solving the problems that come with running them at scale. From engineering leadership at Naamche through its acquisition, to building LLM products for real users and a study platform trusted by 14K+ engineering students.
      </p>

      <dl className="space-y-8 py-12">
        {receipts.map((item) => (
          <div
            key={item.label}
            className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <dt className="font-mono text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="mt-1 block text-xs text-foreground italic">{item.info}</span>
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

      <div className="mt-2 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link href="/work">
            See my work
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Intro;
