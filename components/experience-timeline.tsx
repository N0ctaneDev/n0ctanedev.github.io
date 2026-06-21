import type { ExperienceConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

function ExperienceTimeline({
  experiences,
}: {
  experiences: ExperienceConfig[];
}) {
  return (
    <div className="relative space-y-8">
      {experiences.map((exp, i) => (
        <div key={exp.company} className="relative flex gap-6">
          <div className="flex flex-col items-center">
            <div className="size-3 shrink-0 rounded-full bg-primary neon-glow-purple" />
            {i < experiences.length - 1 && (
              <div className="mt-1 w-px flex-1 bg-border" />
            )}
          </div>
          <div className={cn("pb-4")}>
            <h3 className="font-medium text-foreground">{exp.company}</h3>
            <p className="text-sm text-muted-foreground">
              {exp.role} &middot; {exp.period}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {exp.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
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
      ))}
    </div>
  );
}

export { ExperienceTimeline };
