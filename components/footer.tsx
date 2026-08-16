import { Github, Linkedin, Mail, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socials = [
  {
    href: "https://github.com/aakritsubedi",
    label: "github",
    Icon: Github,
  },
  {
    href: "https://linkedin.com/in/aakrit-subedi",
    label: "linkedin",
    Icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/aakritsubedi",
    label: "youtube",
    Icon: Youtube,
  },
];

const linkStyle = cn(
  "inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground",
  "focus-visible:outline-none focus-visible:text-foreground"
);

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-3xl px-4 py-14 font-mono text-sm sm:px-6 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          {/* Identity */}
          <div className="space-y-2">
            <p className="text-foreground">aakrit subedi</p>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()}
            </p>
          </div>

          {/* Contact + social */}
          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href="mailto:aakritsubedi9@gmail.com"
              className={cn(linkStyle, "group")}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <span className="underline decoration-foreground/25 underline-offset-4 transition-colors group-hover:decoration-foreground">
                aakritsubedi9@gmail.com
              </span>
            </a>

            <Link
              href="/AakritSubedi.pdf"
              target="_blank"
              className={cn(linkStyle, "group")}
            >
              resume (PDF)
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>

            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkStyle}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
