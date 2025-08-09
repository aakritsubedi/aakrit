import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Intro() {
  return (
    <div className="mx-auto max-w-3xl py-10 sm:py-14">
      <div className="flex flex-col gap-4 mb-6">
        <Avatar className="size-24">
          <AvatarImage
            src="/aakrit.jpg"
            alt="Portrait of Aakrit Subedi"
            style={{
              objectFit: "contain",
            }}
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Hey, I'm Aakrit 👋
          </h1>
        </div>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          Engineering Manager at Naamche Inc. Forward-thinking software engineer
          with expertise in full-stack development and team leadership.
        </p>
        <p>
          I&apos;m a Computer Engineering graduate who loves building in public,
          leading student communities, and sharing what I learn. I enjoy
          mentoring, speaking, and shipping small tools that help students and
          early‑stage builders.
        </p>
        <p>
          I founded <Badge>BCTNotes</Badge> — a platform where{" "}
          <span className="font-semibold text-foreground">
            10K+ registered engineering students
          </span>{" "}
          share class notes, past papers, and study materials. We&apos;re
          growing a helpful learning community every day.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href="/work">
              See my work
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
