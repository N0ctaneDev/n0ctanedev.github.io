import Image from "next/image";
import Link from "next/link";
import type { ProjectConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  maintenance: "bg-yellow-500",
  completed: "bg-red-500",
  inactive: "bg-red-500",
};

function ProjectCard({ project }: { project: ProjectConfig }) {
  const dotColor = statusColors[project.status] ?? "bg-muted-foreground";

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div
        className={cn(
          "overflow-hidden border bg-card transition-all duration-200",
          "border-[color-mix(in_oklab,var(--color-primary)_20%,transparent)]",
          "hover:border-primary hover:-translate-y-0.5",
          "hover:shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_30%,transparent)]",
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="line-clamp-1 font-medium text-foreground">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-medium",
                "border-[color-mix(in_oklab,var(--color-primary)_20%,transparent)]",
                "bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)]",
                "text-primary",
              )}
            >
              {project.type}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-medium",
                "border-[color-mix(in_oklab,var(--color-secondary)_20%,transparent)]",
                "bg-[color-mix(in_oklab,var(--color-secondary)_10%,transparent)]",
                "text-secondary",
              )}
            >
              <span className={cn("size-1.5 rounded-full", dotColor)} />
              {project.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                &gt;{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export { ProjectCard };
