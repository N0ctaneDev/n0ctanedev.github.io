import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import config from "@/lib/config";

export default function ProjectsPage() {
  return (
    <SectionWrapper
      title="Projects"
      description="A collection of projects I've built and contributed to."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {config.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
