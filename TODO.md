# N0ctane Portfolio — Build Checklist

> Each item must have its Playwright E2E test written alongside it before the next item starts.
> After every item, run: `npm run lint` → `npm run typecheck` → `npm run build` → `npx playwright test`

---

## Phase 0: Project Scaffold

- [ ] `npx create-next-app@latest . --typescript --tailwind --biome --app --src-dir=false --import-alias="@/*"`
- [ ] `npx shadcn@latest init --preset b1t56CtMo --base base --template next --pointer`
- [ ] Install shadcn components: `npx shadcn@latest add button card badge separator sheet avatar input textarea label sonner`
- [ ] Install Playwright: `npm install -D @playwright/test && npx playwright install chromium`
- [ ] Create `playwright.config.ts` (base config, pointing to `e2e/`, Chromium only)
- [ ] Create `e2e/homepage.spec.ts` — verifies page renders, heading text exists
- [ ] Run initial QA: lint → typecheck → build → test (all should pass)

---

## Phase 1: Configuration Layer

- [ ] Create `__config__.jsonc` with all fields:
  - `name`, `tagline`, `url`
  - `nav.links[]` (label + href for each)
  - `hero` (greeting, cta label + href)
  - `about` (paragraphs array, avatar path)
  - `skills[]` (3 categories, 4-5 items each)
  - `projects[]` (5 entries with: slug, title, description, shortDescription, type, collaboration, groupSize, openSource, status, daysTaken, tech[], links[], thumbnail, featured)
  - `experiences[]` (2-3 entries with company, role, period, description, tech[])
  - `contacts[]` (platform, label, url — GitHub, LinkedIn, Twitter, Email)
  - `contactForm` (action, method)
- [ ] Create `lib/config.ts`:
  - Read and parse `__config__.jsonc` at build time
  - Define `SiteConfig` TypeScript interface
  - Export typed config object
  - Export helpers: `getProjectBySlug(slug)`, `getFeaturedProjects()`
- [ ] Update `lib/utils.ts` if needed (cn() helper from shadcn)
- [ ] Write `e2e/config.spec.ts` — test config exports expected fields
- [ ] QA: lint → typecheck → build → test

---

## Phase 2: Layout Shell

- [ ] Install `next-themes`: `npm install next-themes`
- [ ] Create `components/theme-toggle.tsx`:
  - shadcn Button with sun/moon Lucide icons
  - Uses `useTheme` from next-themes
  - Glow focus ring per DESIGN.md
- [ ] Create `components/navbar.tsx`:
  - Sticky top, `h-16`, `bg-background/80 backdrop-blur-xl`
  - Logo from config.name (purple-to-cyan gradient text with glow)
  - Desktop: horizontal nav links mapped from config
  - Mobile: shadcn Sheet with same links
  - ThemeToggle in top-right corner
  - Active route indicator (glow dot)
- [ ] Create `components/footer.tsx`:
  - Copyright with current year
  - Social icon links mapped from config.contacts
  - "Built with" credit line
- [ ] Update `app/layout.tsx`:
  - Wrap with `<ThemeProvider attribute="class" defaultTheme="dark">`
  - Navbar → `<main>` → Footer
  - Generate metadata title/description from config
  - Import globals.css
- [ ] Update `app/globals.css`:
  - Tailwind directives
  - `@custom-variant dark (&:is(.dark *))`
  - Neon glow utility classes (`neon-glow-purple`, `neon-glow-cyan`, `neon-text-glow`)
  - Scan-line animation keyframes
  - Pulse-glow animation keyframes
  - Prefers-reduced-motion overrides
- [ ] Write `e2e/layout.spec.ts`:
  - Nav links render and navigate
  - Theme toggle exists and switches mode
  - Footer renders with social links
- [ ] QA: lint → typecheck → build → test

---

## Phase 3: Reusable Components

- [ ] Create `components/section-wrapper.tsx`:
  - Consistent `py-24` padding, centered content
  - Optional heading, optional "View all →" link
  - Left-side neon accent bar on heading
- [ ] Create `components/project-card.tsx`:
  - Thumbnail with overlay gradient
  - Title, shortDescription (2 line clamp)
  - Type badge + status badge (glowing dot)
  - Tech stack pills with hover glow
  - Hover: border glow escalation + subtle lift
- [ ] Create `components/skill-badge.tsx`:
  - Rounded pill, `bg-surface border border-border-glow`
  - Hover: border glow transition
  - Monospace font with `>` prefix
- [ ] Create `components/contact-form.tsx`:
  - shadcn Input fields: name, email
  - shadcn Textarea: message
  - Submit button (filled purple with hover glow)
  - Mailto fallback on submit
  - sonner toast on success
- [ ] Create `components/experience-timeline.tsx`:
  - Vertical timeline with dots
  - Company, role, period, description, tech
- [ ] Write E2E tests for each component in `e2e/components.spec.ts`
- [ ] QA: lint → typecheck → build → test

---

## Phase 4: Homepage Sections

- [ ] Create `components/hero-section.tsx`:
  - Large gradient name + neon-text-glow
  - Tagline in muted text
  - HUD accent line (gradient bar with slow pulse)
  - CTA button with neon border + glow
  - Subtle dot-grid background pattern
- [ ] Create `components/about-section.tsx`:
  - First 2 paragraphs from config
  - "Read more →" link to `/about`
  - Optional avatar display
- [ ] Create `components/skills-section.tsx`:
  - First 2-3 categories as preview
  - SkillBadge components in a flex wrap
  - "View all skills →" link
- [ ] Create `components/projects-section.tsx`:
  - Grid of featured projects (max 3)
  - ProjectCard components
  - "View all projects →" link
- [ ] Create `components/contact-section.tsx`:
  - Social icon row from config.contacts
  - Compact contact form
  - "Full contact page →" link
- [ ] Update `app/page.tsx`: compose all sections in order
- [ ] Update `e2e/homepage.spec.ts` — full homepage scroll test
- [ ] QA: lint → typecheck → build → test

---

## Phase 5: Sub-Pages

- [ ] Create `app/projects/page.tsx`:
  - All projects from config in responsive grid
  - Title, section intro text
- [ ] Create `app/projects/[slug]/page.tsx`:
  - `generateStaticParams` from config.projects
  - Full detail layout: thumbnail, title, badges, metadata (solo/group, days, type), description, tech tags, link buttons
- [ ] Create `app/about/page.tsx`:
  - Full bio paragraphs
  - ExperienceTimeline components mapped from config.experiences
- [ ] Create `app/skills/page.tsx`:
  - All skills categorized
  - Grid of SkillBadge components per category
  - Category section headings with neon bar
- [ ] Create `app/contact/page.tsx`:
  - Full width contact form
  - Social links section
  - Map/address placeholder
- [ ] Create `app/not-found.tsx`:
  - Custom 404 page with brand styling
  - "Go home" link
- [ ] Write E2E tests for each sub-page:
  - `e2e/projects.spec.ts` — grid + detail pages
  - `e2e/about.spec.ts` — bio + timeline
  - `e2e/skills.spec.ts` — categories render
  - `e2e/contact.spec.ts` — form + social links
- [ ] QA: lint → typecheck → build → test

---

## Phase 6: Static Export & Deploy

- [ ] Update `next.config.ts`:
  - `output: 'export'`
  - `images: { unoptimized: true }`
- [ ] Create `.github/workflows/deploy.yml`:
  - Trigger: push to main
  - Steps: checkout → setup node → npm ci
  - Run: `npm run lint` → `npm run typecheck` → `npm run build` → `npx playwright test`
  - Deploy `./out` to `gh-pages` branch via `peaceiris/actions-gh-pages`
- [ ] Update `README.md` with deployment info + badge
- [ ] Push to main, verify deploy workflow runs
- [ ] Verify `https://n0ctanedev.github.io` loads correctly
- [ ] QA: lint → typecheck → build → test

---

## Phase 7: Full System QA

### Automated
- [ ] `npm run lint` — 0 errors
- [ ] `npm run typecheck` — 0 errors
- [ ] `npm run build` — succeeds
- [ ] `npx playwright test` — all pass

### Manual verification
- [ ] All pages render correctly in dev + static export
- [ ] Dark/light toggle works and persists
- [ ] Navbar active route highlight + mobile sheet
- [ ] Project detail pages render for all slugs
- [ ] Contact form triggers mailto
- [ ] 404 page appears for unknown routes
- [ ] No broken images or links
- [ ] Responsive: mobile, tablet, desktop breakpoints
- [ ] Lighthouse: 90+ perf, 100 a11y
