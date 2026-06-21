import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  viewAllHref?: string;
  className?: string;
}

function SectionWrapper({
  id,
  title,
  description,
  children,
  viewAllHref,
  className,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl px-4">
        {title && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-auto w-[2px] shrink-0 rounded-sm bg-gradient-to-b from-primary to-secondary" />
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  View All
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export { SectionWrapper };
