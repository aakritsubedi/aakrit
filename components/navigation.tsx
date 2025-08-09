"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export function Navigation() {
  const { theme } = useTheme();

  const [logoUrl, setLogoUrl] = React.useState<string>("/logo.png");

  React.useEffect(() => {
    setLogoUrl(theme === "dark" ? "/logo-light.png" : "/logo.png");
  }, [theme]);

  const currentRoute = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl container flex h-14 items-center px-4 md:px-24">
        <ul className="ml-2 flex items-center gap-4 text-sm">
          <li>
            <Image
              src={logoUrl}
              priority
              alt="Aakrit Subedi" // cspell:disable-line
              width={45}
              height={45}
              className="rounded-full"
            />
            <h1 className="hidden">Aakrit Subedi</h1>
          </li>
          <li>
            <Link
              aria-current="page"
              href="/"
              className="font-medium text-foreground"
            >
              About
            </Link>
            {currentRoute === "/" && (
              <div className="h-0.5 bg-foreground/80 rounded-full" />
            )}
          </li>
          <li>
            <Link
              href="/work"
              className="text-muted-foreground hover:text-foreground"
            >
              Work
            </Link>
            {currentRoute === "/work" && (
              <div className="h-0.5 bg-foreground/80 rounded-full" />
            )}
          </li>
          <li>
            <Link
              href="/education"
              className="text-muted-foreground hover:text-foreground"
            >
              Education
            </Link>
            {currentRoute === "/education" && (
              <div className="h-0.5 bg-foreground/80 rounded-full" />
            )}
          </li>
          <li>
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>
            {currentRoute === "/projects" && (
              <div className="h-0.5 bg-foreground/80 rounded-full" />
            )}
          </li>
        </ul>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
