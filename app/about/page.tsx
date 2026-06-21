import Image from "next/image";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SectionWrapper } from "@/components/section-wrapper";
import config from "@/lib/config";

export default function AboutPage() {
  return (
    <SectionWrapper title="About">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <div className="max-w-prose flex-1 space-y-4">
          {config.about.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {p}
            </p>
          ))}
        </div>
        <div className="shrink-0">
          <div className="relative size-24 overflow-hidden rounded-full border border-border md:size-32">
            <Image
              src={config.about.avatar}
              alt={config.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
          Experience
        </h2>
        <ExperienceTimeline experiences={config.experiences} />
      </div>
    </SectionWrapper>
  );
}
