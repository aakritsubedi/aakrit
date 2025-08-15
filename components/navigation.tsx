"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = React.useState<string>("/logo.png");
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

  const navLinks = [
    { href: "/", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/education", label: "Education" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl container flex h-14 items-center px-4 md:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoUrl}
            priority
            alt="Aakrit Subedi"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="hidden">Aakrit Subedi</h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="ml-4 hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <li key={link.href} className="flex flex-col items-center">
              <Link
                href={link.href}
                className={
                  currentRoute === link.href
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {link.label}
              </Link>
              {currentRoute === link.href && (
                <div className="h-0.5 w-full bg-foreground/80 rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Mode Toggle */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          <ModeToggle />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      currentRoute === link.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
