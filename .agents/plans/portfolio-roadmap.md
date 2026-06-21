# N0ctane Portfolio — Development Roadmap

## Objective

Build a personal portfolio website using **Next.js** (static export) + **shadcn/ui** + **Tailwind CSS**, hosted on **GitHub Pages**. All content is driven by a single `__config__.jsonc` file — edit one file to update the entire site.

---

## Phase 0: Project Initialization

### Goals
- Scaffold a fresh Next.js project
- Initialize shadcn with the chosen preset
- Verify dev server runs

### Steps
1. `npx create-next-app@latest . --typescript --tailwind --biome --app --src-dir=false --import-alias="@/*"`
2. `npx shadcn@latest init --preset b1t56CtMo --base base --template next --pointer`
3. Install required shadcn components:
   `npx shadcn@latest add button card badge separator sheet avatar input textarea label sonner`
4. Setup Playwright E2E testing:
   - `npm install -D @playwright/test`
   - `npx playwright install chromium`
   - Create `playwright.config.ts` at root
5. `npm run dev` → verify blank page loads at localhost:3000

### Testing
- Write initial Playwright E2E test: `e2e/homepage.spec.ts` — verifies page renders heading text correctly.

### Files created
- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `components.json`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components/ui/*` (shadcn primitives)
- `playwright.config.ts`, `e2e/` directory

---

## Phase 1: Configuration Layer

### Goals
- Create the single-source-of-truth config file
- Build a type-safe parser so components can import typed data

### Steps
1. Create `__config__.jsonc` with all placeholder content:
   - `name`, `tagline`, `url`
   - `nav.links[]`
   - `hero` (greeting, CTA)
   - `about` (paragraphs, avatar path)
   - `skills[]` (3 categories x 4-5 items each)
   - `projects[]` (5 entries with all fields: slug, title, description, shortDescription, type, collaboration, groupSize, openSource, status, daysTaken, tech[], links[], thumbnail, featured)
   - `experiences[]` (2-3 entries)
   - `contacts[]` (GitHub, LinkedIn, Twitter, Email)
   - `contactForm` (action, method)
2. Create `lib/config.ts`:
   - Read `__config__.jsonc` at build time
   - Export typed config object (infer or define `SiteConfig` interface)
   - Export helpers: `getProjectBySlug(slug)`, `getFeaturedProjects()`

### Testing
- Write E2E test: `e2e/config.spec.ts` — imports config, verifies all placeholder fields exist with expected types.

### Files created / modified
- `__config__.jsonc` ← **NEW**
- `lib/config.ts` ← **NEW**
- `lib/utils.ts` (already exists from shadcn, augment if needed)

---

## Phase 2: Layout Shell

### Goals
- Root layout with ThemeProvider, Navbar, Footer
- Theme toggle working
- Responsive, sticky navbar with mobile sheet

### Steps
1. Install `next-themes`: `npm install next-themes`
2. Build `components/theme-toggle.tsx` — shadcn button + sun/moon icons
3. Build `components/navbar.tsx`:
   - Logo (config.name)
   - Desktop: horizontal nav links (mapped from config)
   - Mobile: Sheet (shadcn) with same links
   - ThemeToggle in top-right
4. Build `components/footer.tsx` — copyright, social icons (Lucide), built-with credit
5. Update `app/layout.tsx`:
   - Wrap with `<ThemeProvider>`
   - `Navbar` → `<main>` → `Footer`
   - Generate metadata from config (title, description)

### Testing
- Write E2E test: `e2e/layout.spec.ts` — verifies nav links render, theme toggle exists, footer renders.

### Files created / modified
- `components/theme-toggle.tsx`
- `components/navbar.tsx`
- `components/footer.tsx`
- `app/layout.tsx`

---

## Phase 3: Reusable Sections

### Goals
- Build shared UI patterns used across homepage and sub-pages

### Components to create

| Component | Purpose |
|---|---|
| `components/section-wrapper.tsx` | Consistent section padding, heading, optional "View all →" link |
| `components/project-card.tsx` | Card with thumbnail, title, type badge, status, tech tags, links |
| `components/skill-badge.tsx` | Simple badge/pill for individual skill |
| `components/contact-form.tsx` | shadcn form with name, email, message fields → mailto fallback + toast on submit |
| `components/experience-timeline.tsx` | Vertical timeline for experience entries |

---

### Testing
- Write E2E test: `e2e/sections.spec.ts` — verifies section-wrapper renders, project-card renders with data, contact form has inputs.

## Phase 4: Homepage Sections

### Goals
- Full single-page scroll experience
- Each section shows a preview and links to dedicated sub-page

### Sections on `/`

1. **HeroSection** — Name, tagline, CTA button → `/projects`
2. **AboutSection** — First 2 paragraphs + "Read more →" link to `/about`
3. **SkillsSection** — 2-3 category preview + "View all skills →" link to `/skills`
4. **ProjectsSection** — Grid of `featured: true` projects (max 3) + "View all projects →"
5. **ContactSection** — Social icons row + contact form (compact) + "Full contact page →"

### Testing
- Write or update E2E test: `e2e/homepage.spec.ts` — verifies all homepage sections render, scroll works, section links navigate to correct sub-pages.

### Files created / modified
- `components/hero-section.tsx`
- `components/about-section.tsx`
- `components/skills-section.tsx`
- `components/projects-section.tsx`
- `components/contact-section.tsx`
- `app/page.tsx` — compose all sections

---

## Phase 5: Sub-Pages

### Goals
- Each section gets a dedicated full page with richer content
- `/projects/[slug]` detail pages are generated at build time

### Pages

| Route | Component | Data |
|---|---|---|
| `/projects` | `app/projects/page.tsx` | All projects in a responsive grid |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | generateStaticParams → full detail layout |
| `/about` | `app/about/page.tsx` | Full bio + experience timeline |
| `/skills` | `app/skills/page.tsx` | All skills grouped by category |
| `/contact` | `app/contact/page.tsx` | Full contact form + social links |

### Project detail page layout
```
[Thumbnail - full width]
[Title]  [Type badge]  [Open Source badge]  [Status badge]
[Solo / Group: X people]  [~ Days taken]
[Description - full paragraphs]
[Tech stack tags]
[Links: GitHub | Live Demo | ...]
```

---

### Testing
- Write E2E tests for each sub-page:
  - `e2e/projects.spec.ts` — all projects grid + individual detail pages
  - `e2e/about.spec.ts` — about page + experience timeline
  - `e2e/skills.spec.ts` — skills page renders categories
  - `e2e/contact.spec.ts` — contact form submission

## Phase 6: Static Export & Deploy

### Goals
- `next.config.ts` configured for static export
- GitHub Actions workflow builds and deploys to GitHub Pages

### Steps
1. Update `next.config.ts`:
   ```ts
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   }
   ```
2. Create `app/not-found.tsx` — custom 404 page
3. Create `.github/workflows/deploy.yml`:
   - Trigger: push to `main`
   - Steps: checkout → setup node → npm ci → npm run lint → npm run typecheck → npm run build → npx playwright test
   - Deploy to `gh-pages` branch (only if all checks pass) using `peaceiris/actions-gh-pages`
   - Set `publish_dir: ./out`
4. In repo Settings → Pages → source: `gh-pages` branch, `/ (root)`
5. Push → verify deployment at `https://n0ctanedev.github.io`

---

## Phase 7: Polish & QA

### Goals
- Verify all routes, responsive breakpoints, dark/light consistency
- Test static build succeeds with no errors

### Automated checks (run before every deploy)
- [ ] `npm run lint` — Biome passes with 0 errors
- [ ] `npm run typecheck` — `tsc --noEmit` passes with 0 errors
- [ ] `npm run build` — Next.js static build succeeds
- [ ] `npx playwright test` — all E2E tests pass in Chromium

### Manual verification
- [ ] All pages render correctly in dev + static build
- [ ] Dark/light toggle persists and looks good in both
- [ ] Navbar highlights active route, mobile sheet opens/closes
- [ ] Project detail pages generate for all slugs, navigation works
- [ ] Contact form submits (mailto fallback opens)
- [ ] 404 page shows for unknown routes
- [ ] No broken links or images
- [ ] Lighthouse score: 90+ performance, 100 accessibility

---

## File Tree (Final)

```
n0ctanedev.github.io/
├── __config__.jsonc
├── next.config.ts
├── tailwind.config.ts
├── components.json
├── package.json
├── tsconfig.json
├── .gitignore
├── .github/workflows/deploy.yml
│
├── playwright.config.ts
├── e2e/
│   ├── homepage.spec.ts
│   ├── projects.spec.ts
│   ├── about.spec.ts
│   ├── skills.spec.ts
│   ├── contact.spec.ts
│   └── layout.spec.ts
│
├── lib/
│   ├── config.ts
│   └── utils.ts
│
├── components/
│   ├── ui/                (shadcn — button, card, badge, etc.)
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── section-wrapper.tsx
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── skills-section.tsx
│   ├── projects-section.tsx
│   ├── contact-section.tsx
│   ├── project-card.tsx
│   ├── skill-badge.tsx
│   ├── contact-form.tsx
│   └── experience-timeline.tsx
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── skills/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
└── public/
    ├── avatar.jpg
    └── projects/
        ├── project1.png
        ├── project2.png
        └── project3.png
```

---

## Data Flow

```
__config__.jsonc
      │
      ▼
lib/config.ts  (reads at build time, exports typed config)
      │
      ├──► app/layout.tsx        (nav links, metadata)
      ├──► app/page.tsx          (hero, about, skills, projects, contact)
      ├──► app/projects/page.tsx (all projects)
      ├──► app/projects/[slug]/page.tsx (single project)
      ├──► app/about/page.tsx    (bio + experiences)
      ├──► app/skills/page.tsx   (skills by category)
      └──► app/contact/page.tsx  (contacts + form)
```

No data fetching at runtime — everything happens at build time (Next.js static generation).

---

## Key Principles

1. **Zero hardcoded content** — everything lives in `__config__.jsonc`
2. **No runtime data fetching** — purely static
3. **shadcn for all UI** — no custom-styled divs where a component exists
4. **Responsive first** — mobile → tablet → desktop
5. **Dark mode tested equally** — both themes must look intentional
