import { SectionWrapper } from "@/components/section-wrapper";
import { SkillBadge } from "@/components/skill-badge";
import config from "@/lib/config";

export default function SkillsPage() {
  return (
    <SectionWrapper title="Skills">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {config.skills.map((cat) => (
          <div key={cat.category}>
            <div className="mb-4 flex items-start gap-3">
              <div className="h-6 w-[2px] shrink-0 rounded-sm bg-gradient-to-b from-primary to-secondary" />
              <h3 className="text-lg font-medium text-foreground">
                {cat.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
