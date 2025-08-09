"use client";

import { Github, Linkedin, Mail, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl py-6 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 md:p-24 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-sm leading-loose md:text-left">
            Built by Aakrit Subedi. © {new Date().getFullYear()} All rights
            reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="mailto:aakritsubedi9@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
          <a
            href="https://github.com/aakritsubedi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/aakrit-subedi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://www.youtube.com/aakritsubedi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Youtube className="h-5 w-5" />
            <span className="sr-only">Youtube</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
