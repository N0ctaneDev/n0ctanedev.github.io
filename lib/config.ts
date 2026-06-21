import config from "../__config__.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  greeting: string;
  cta: { label: string; href: string };
}

export interface AboutConfig {
  paragraphs: string[];
  avatar: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectConfig {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  type: string;
  collaboration: string;
  groupSize: number;
  openSource: boolean;
  status: string;
  daysTaken: number;
  tech: string[];
  links: ProjectLink[];
  thumbnail: string;
  featured: boolean;
}

export interface ExperienceConfig {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export interface ContactConfig {
  platform: string;
  label: string;
  url: string;
}

export interface ContactFormConfig {
  action: string;
  method: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  nav: { links: NavLink[] };
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillCategory[];
  projects: ProjectConfig[];
  experiences: ExperienceConfig[];
  contacts: ContactConfig[];
  contactForm: ContactFormConfig;
}

const typedConfig = config as SiteConfig;

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  return typedConfig.projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectConfig[] {
  return typedConfig.projects.filter((p) => p.featured);
}

export default typedConfig;
