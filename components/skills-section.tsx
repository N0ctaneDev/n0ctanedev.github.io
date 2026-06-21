import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";
import { SkillBadge } from "@/components/skill-badge";
import config from "@/lib/config";

function SkillsSection() {
  const previewCategories = config.skills.slice(0, 3);

  return (
    <SectionWrapper title="Skills" viewAllHref="/skills">
      <div className="space-y-8">
        {previewCategories.map((cat) => (
          <div key={cat.category}>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              &gt; {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
        <div>
          <Link
            href="/skills"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all skills
            <span className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default SkillsSection;
