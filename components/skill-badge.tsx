import { cn } from "@/lib/utils";

function SkillBadge({ name }: { name: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200",
        "border-[color-mix(in_oklab,var(--color-primary)_20%,transparent)]",
        "bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)]",
        "hover:border-primary",
        "hover:shadow-[0_0_8px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]",
      )}
    >
      &gt;{name}
    </span>
  );
}

export { SkillBadge };
