import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SkillBadge } from "@/components/skill-badge";
import { buttonVariants } from "@/components/ui/button";
import config, { getProjectBySlug } from "@/lib/config";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return config.projects.map((project) => ({ slug: project.slug }));
}

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  maintenance: "bg-yellow-500",
  completed: "bg-red-500",
  inactive: "bg-red-500",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const dotColor = statusColors[project.status] ?? "bg-muted-foreground";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/projects"
          className="group mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            &larr;
          </span>
          Back to projects
        </Link>

        <div className="relative mb-8 aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium",
              "border-[color-mix(in_oklab,var(--color-primary)_20%,transparent)]",
              "bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)]",
              "text-primary",
            )}
          >
            {project.type}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium",
              "border-[color-mix(in_oklab,var(--color-secondary)_20%,transparent)]",
              "bg-[color-mix(in_oklab,var(--color-secondary)_10%,transparent)]",
              "text-secondary",
            )}
          >
            {project.collaboration}
            {project.groupSize > 1 && ` (${project.groupSize})`}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium",
              "border-[color-mix(in_oklab,var(--color-secondary)_20%,transparent)]",
              "bg-[color-mix(in_oklab,var(--color-secondary)_10%,transparent)]",
              "text-secondary",
            )}
          >
            <span className={cn("size-1.5 rounded-full", dotColor)} />
            {project.status}
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">Duration:</span>
            {project.daysTaken} days
          </span>
          {project.groupSize > 1 && (
            <span className="flex items-center gap-1.5">
              <span className="font-medium text-foreground">Team:</span>
              {project.groupSize} people
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">Open Source:</span>
            {project.openSource ? "Yes" : "No"}
          </span>
        </div>

        <div className="mb-8 max-w-prose">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-sm font-medium text-foreground">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <SkillBadge key={t} name={t} />
            ))}
          </div>
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
