"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import config from "@/lib/config";

function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold tracking-tight text-transparent neon-text-glow"
        >
          {config.name}
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {config.nav.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary neon-glow-purple" />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-6 pt-12">
                {config.nav.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose
                      key={link.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          className={`flex items-center gap-2 text-lg font-medium transition-colors ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {isActive && (
                            <span className="size-1.5 rounded-full bg-primary neon-glow-purple" />
                          )}
                          {link.label}
                        </Link>
                      }
                    />
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export { Navbar };
