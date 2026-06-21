import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";
import config from "@/lib/config";

function AboutSection() {
  const paragraphs = config.about.paragraphs.slice(0, 2);

  return (
    <SectionWrapper title="About" viewAllHref="/about">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <div className="max-w-prose space-y-4 flex-1">
          {paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {p}
            </p>
          ))}
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read more
            <span className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
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
    </SectionWrapper>
  );
}

export default AboutSection;
