import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import { getFeaturedProjects } from "@/lib/config";

function ProjectsSection() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <SectionWrapper title="Projects" viewAllHref="/projects">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all projects
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </SectionWrapper>
  );
}

export default ProjectsSection;
