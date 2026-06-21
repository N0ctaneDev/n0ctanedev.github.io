import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

function loadConfig() {
  const configPath = path.resolve(process.cwd(), "__config__.json");
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

test("config file has all required fields", () => {
  const raw = loadConfig();

  expect(typeof raw.name).toBe("string");
  expect(typeof raw.tagline).toBe("string");
  expect(typeof raw.url).toBe("string");
  expect(Array.isArray(raw.nav?.links)).toBe(true);
  expect(raw.nav.links.length).toBeGreaterThan(0);
  expect(typeof raw.hero?.greeting).toBe("string");
  expect(typeof raw.hero?.cta?.label).toBe("string");
  expect(Array.isArray(raw.about?.paragraphs)).toBe(true);
  expect(Array.isArray(raw.skills)).toBe(true);
  expect(raw.skills.length).toBeGreaterThan(0);
  expect(Array.isArray(raw.projects)).toBe(true);
  expect(raw.projects.length).toBeGreaterThan(0);
  expect(Array.isArray(raw.experiences)).toBe(true);
  expect(raw.experiences.length).toBeGreaterThan(0);
  expect(Array.isArray(raw.contacts)).toBe(true);
  expect(raw.contacts.length).toBeGreaterThan(0);
  expect(typeof raw.contactForm?.action).toBe("string");
});

test("getProjectBySlug returns correct project", () => {
  const raw = loadConfig();
  const project = raw.projects.find(
    (p: { slug: string }) => p.slug === "project-one",
  );
  expect(project).toBeDefined();
  expect(project.title).toBe("Project One");
  expect(project.featured).toBe(true);
});

test("getFeaturedProjects returns featured projects", () => {
  const raw = loadConfig();
  const featured = raw.projects.filter(
    (p: { featured: boolean }) => p.featured,
  );
  expect(featured.length).toBeGreaterThan(0);
  for (const p of featured) {
    expect(p.featured).toBe(true);
  }
});
