"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "about" },
  { href: "/work", label: "work" },
  { href: "/education", label: "education" },
  { href: "/projects", label: "projects" },
];

export function Navigation() {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = React.useState<string>("/logo.png");
  const [scrolled, setScrolled] = React.useState(false);
  const currentRoute = usePathname();

  React.useEffect(() => {
    if (theme === "system") {
      const isSystemDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setLogoUrl(isSystemDark ? "/logo-light.png" : "/logo.png");
    } else {
      setLogoUrl(theme === "dark" ? "/logo-light.png" : "/logo.png");
    }
  }, [theme]);

  // The header sits flush with the page until you scroll; the hairline only
  // shows up once content passes underneath it.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-b transition-colors duration-300",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src={logoUrl}
            priority
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-mono text-sm tracking-tight text-foreground transition-opacity group-hover:opacity-70">
            aakrit subedi
          </span>
        </Link>

        {/* Desktop navigation — dot-separated, lowercase */}
        <nav className="ml-auto hidden md:block">
          <ul className="flex items-center font-mono text-sm">
            {navLinks.map((link, i) => (
              <li key={link.href} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="px-3 text-muted-foreground/40">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  aria-current={currentRoute === link.href ? "page" : undefined}
                  className={cn(
                    "relative py-1 transition-colors",
                    currentRoute === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-foreground/70",
                    "after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                    currentRoute === link.href && "after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="ml-5 hidden md:flex items-center">
          <ModeToggle />
        </div> */}

        {/* Mobile */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-10 flex flex-col gap-5 font-mono text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={
                      currentRoute === link.href ? "page" : undefined
                    }
                    className={
                      currentRoute === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t pt-6">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
