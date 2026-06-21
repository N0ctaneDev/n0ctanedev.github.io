# N0ctane Portfolio — Design System

## Brand Identity

- **Name:** N0ctane
- **Etymology:** "N0" (night / no) + "ctane" (octane) — dark, energetic, high-performance
- **Vibe:** Cyberpunk-minimalist. Sleek, dark, backlit with neon glow. Sci-fi instrumentation aesthetic meets clean developer portfolio.
- **Audience:** Developers, employers, collaborators

---

## Design Laws & Principles

### Gestalt Principles

| Principle | Application |
|---|---|
| **Proximity** | Related content shares spacing groups. Projects, skills, experience each have their own rhythm. |
| **Similarity** | All project cards share the same structure. All skill badges share size/color. |
| **Closure** | Section headings act as visual anchors — the mind completes the section layout. |
| **Figure-Ground** | Cards and sections have clear visual separation via backgrounds, borders, or shadows. |
| **Common Region** | Each page section is bounded by consistent padding/gap. Skills grouped by category inside bordered regions. |

### Functional Laws

| Law | Application |
|---|---|
| **Fitts's Law** | Nav links, theme toggle, and CTAs are large enough to hit easily. Mobile nav uses full-height sheet — target size >= 44px. |
| **Hick's Law** | Nav has 5 links max. Project detail page shows 2-3 primary actions (GitHub, Live Demo). No decision paralysis. |
| **Jakob's Law** | Familiar patterns: sticky top nav, scroll behavior, card grids, dark/light toggle in corner. Users already know how to use this. |
| **Miller's Law** | Chunking: skills grouped by category (~5 per group). Projects shown 3 at a time on homepage. |
| **Tesler's Law** | Complexity is pushed into `__config__.jsonc`. The editor edits one file; the code handles the rest. |
| **Parkinson's Law** | Work expands to fill available space — content determines layout, not the other way. Cards are content-out, not container-in. |

---

## Typography

| Role | Face | Weight | Size Scale |
|---|---|---|---|
| **Display** | Oxanium | 600–700 | 3xl–6xl |
| **Body** | Oxanium | 400–500 | base–lg |
| **Mono / Code** | JetBrains Mono | 400 | sm–base |
| **Small / Caption** | Oxanium | 300 | xs–sm |

- **Oxanium** is the primary typeface for almost everything — chosen from shadcn's font library. Its wide, geometric letterforms evoke sci-fi instrumentation panels and HUD readouts, fitting the n0ctane neon aesthetic. Used for display headings, body text, navigation, buttons, and most UI text.
- JetBrains Mono reserved for tech stack tags, code blocks, metadata (dates, status, counts), and any data-oriented content where monospaced alignment matters.
- Font weights: display uses semi-bold (600) to bold (700), body uses regular (400) to medium (500), small/caption uses light (300).
- Line height: 1.0 for display, 1.5 for body.
- Max body width: 65ch for readability.
- Display headings in dark mode get the `neon-text-glow` treatment — a subtle purple radiance behind the letterforms.
- Loaded via next/font from Google Fonts. Include latin subset only for performance.

---

## Color Palette

### Dark Mode (default)

| Token | Hex | Usage |
|---|---|---|
| Background | `#07070a` | Page body — near-black void |
| Surface | `#121216` | Cards, sections, sheet |
| Surface-elevated | `#1a1a22` | Hovered cards, modals |
| Border | `#1e1e2a` | Subtle dividers, card outlines |
| Border-glow | `#27274a` | Elevated borders with faint glow bleed |
| Primary | `#a855f7` | Purple accent — links, CTAs, badges |
| Primary-glow | `#a855f740` | Purple glow shadow / backdrop |
| Secondary | `#06b6d4` | Cyan accent — secondary CTAs, decorative elements |
| Secondary-glow | `#06b6d440` | Cyan glow shadow / backdrop |
| Primary-foreground | `#ffffff` | Text on primary |
| Muted | `#9ca3af` | Secondary text |
| Foreground | `#f1f5f9` | Body text |
| Success | `#22c55e` | "Active" status |
| Muted-success | `#052e16` | Badge background |
| Neon-overlay | `rgba(168,85,247,0.03)` | Subtle ambient glow wash on sections |

### Light Mode

| Token | Hex | Usage |
|---|---|---|
| Background | `#f8fafc` | Page body |
| Surface | `#ffffff` | Cards, sections |
| Border | `#e2e8f0` | Dividers, card outlines |
| Primary | `#9333ea` | Purple accent — links, CTAs, badges |
| Secondary | `#0891b2` | Cyan accent — decoration |
| Primary-foreground | `#ffffff` | Text on primary |
| Muted | `#64748b` | Secondary text |
| Foreground | `#0f172a` | Body text |
| Success | `#16a34a` | "Active" status |
| Border-glow | `#d8b4fe` | Softer neon-adjacent border in light mode |

> Purple + cyan is the core neon duo. Purple is the primary voice; cyan is the secondary accent used sparingly — like indicator lights on a sci-fi control panel.

---

## Spacing & Layout

| Scale | Value |
|---|---|
| Section padding Y | `py-24` (96px) / `py-16` mobile |
| Section max-width | `max-w-5xl` (1024px) |
| Card gap grid | `gap-6` |
| Card padding | `p-6` |
| Content max-width | `prose` / 65ch |
| Stack spacing | `space-y-4` / `space-y-6` |

- Sections are full-width with centered content containers
- Each section gets a subtle `border-t` or `separator` for visual rhythm
- No overlapping or offset layouts — clean vertical stack

---

## Component Design Decisions

| Component | Notes |
|---|---|
| **Navbar** | Sticky top, `h-16`, dark backdrop (`bg-background/80 backdrop-blur-xl`), bottom border with faint primary-glow line. Active route: small neon dot indicator. |
| **Theme Toggle** | Top-right, icon-only button, sun/moon toggle via `next-themes`. Glow ring on focus. |
| **Hero** | Large name with purple + cyan gradient text + text-shadow glow. Tagline below in muted. Single CTA with purple neon border (`box-shadow` glow on hover). Optional scan-line decorative accent beneath. |
| **Project Card** | Thumbnail top with subtle overlay gradient. Card has `border border-border-glow` that intensifies to primary on hover. Bottom edge: thin cyan accent line. Type + status badges use neon-tinted backgrounds. |
| **Project Detail** | Full-width thumbnail with backlit glow border. Metadata row uses small glowing dot separators. Tech tags have subtle hover glow. Link buttons: outline style with neon border. |
| **Skill Badge** | Rounded pill, `bg-surface border border-border-glow` with subtle hover glow on the border. |
| **Contact Form** | Stacked layout, inputs have `border-border-glow` that shifts to primary/cyan on focus with a subtle `box-shadow` glow. Submit button: filled purple with hover glow amplification. |
| **Section Divider** | Instead of plain lines, use a thin gradient rule (purple → cyan → transparent) or a short decorative neon tick mark. |

---

## Neon & Glow Effects

### Glow Shadow Utility Pattern
```css
/* Purple glow — primary */
.neon-glow-purple {
  box-shadow: 0 0 12px theme(colors.primary.DEFAULT / 40%),
              0 0 40px theme(colors.primary.DEFAULT / 15%);
}

/* Cyan glow — secondary */
.neon-glow-cyan {
  box-shadow: 0 0 12px theme(colors.secondary.DEFAULT / 40%),
              0 0 40px theme(colors.secondary.DEFAULT / 15%);
}

/* Text glow for display headings */
.neon-text-glow {
  text-shadow: 0 0 10px theme(colors.primary.DEFAULT / 50%),
               0 0 30px theme(colors.primary.DEFAULT / 20%);
}
```

### Where glow is applied
| Element | Effect |
|---|---|
| **Hero heading** | Text glow (subtle — visible but not blurry) |
| **CTA buttons** | Border glow on hover, amplifies on active |
| **Project cards** | Border shifts from `border-glow` to primary glow on hover |
| **Active nav link** | Small neon dot + text color shift to primary |
| **Focus states** | All inputs, buttons get a `ring-primary` + `ring-offset-2` with a glow box-shadow |
| **Section heading** | Optional: left-side decorative neon bar (2px wide, purple-to-cyan gradient, 4px border-radius) |

### Critical constraint
Glow is **intentional, not gratuitous**. No element gets glow by default — only on interaction (hover / focus / active) or as a deliberate structural accent (hero heading, section heading bars). This keeps the sci-fi feel without crossing into "gaming RGB overload."

---

## Sci-Fi Theming

### Visual language
- **Grid background (subtle):** Hero section gets a very faint dot-grid pattern (`radial-gradient` dots at 5% opacity) suggesting a technical/sci-fi HUD background
- **Scan-line accent:** A thin horizontal animated gradient line that sweeps across the hero section slowly (like a CRT scan), used only as a decorative divider
- **Status indicators:** Glowing dots (green = active, yellow = maintenance, red = inactive) mapped to project status in `__config__.jsonc`
- **Data tags:** Tech stack items styled with monospace font + bracket-like wrapping or small preceding `>` chevron
- **Card borders:** Slightly brighter top edge on dark mode cards, mimicking backlight bleed from a neon tube below the surface

### What we avoid
- No heavy chrome / glassmorphism
- No glitch text effects
- No cyberpunk fonts — let layout and glow do the work
- No animated matrix rain or gratuitous particle effects

### Sci-fi moodboard keywords
`neon dusk` / `HUD minimal` / `control panel` / `terminal clean` / `backlit` / `instrument cluster`

---

## Motion & Interaction

- **Page transitions:** None (static export) — instant navigation
- **Theme toggle:** Smooth CSS transition (`transition-colors`, 300ms)
- **Card hover:** Border glow intensity ramp (200ms) + subtle `translateY(-1px)`
- **Nav link hover:** Color shift to primary + glow dot fades in
- **Button hover:** `box-shadow` glow scales up (0 → 12px spread, 200ms)
- **Scan-line accent (hero):** Slow horizontal oscillation, 8s cycle, `opacity: 0.4`
- **Hero CTA:** Gentle pulse animation on the glow (`pulse-glow` keyframes, 3s infinite) — very subtle, not distracting
- **Reduce motion:** `prefers-reduced-motion` respected — disable all glow animations, scan-lines, and pulsing. Keep static glow as a fallback.

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 640px` | Single column, stacked layout, hamburger nav |
| `640px – 1023px` | 2-column grid for projects, collapsed nav |
| `>= 1024px` | 3-column grid for projects, horizontal nav |

---

## Accessibility

- All interactive elements ≥ 44px touch target on mobile
- Focus-visible ring on all interactive elements
- Color contrast ratios ≥ 4.5:1 (AA) for text, ≥ 3:1 for large text
- Dark/light mode respects `prefers-color-scheme` as initial value
- Images use `alt` text from config
- Semantic HTML: `nav`, `main`, `section`, `article`, `footer`
- Skip-to-content link on page load

---

## Risk / Signature Elements

### 1. The glowing logo
The **"N0ctane"** brand mark in the nav uses a purple-to-cyan gradient (`#a855f7` → `#06b6d4`) with a subtle `neon-text-glow` text-shadow. It's the only element in the UI with both gradient AND glow — making it immediately identifiable as the brand signature.

### 2. The HUD accent line
A short (120px) horizontal gradient line (purple → cyan → transparent) with a slow animated glow pulse sits beneath the hero heading. It reads like a sci-fi targeting reticle or instrument readout separator — a single decorative element that sells the theme without overwhelming the page.

### 3. Backlit card edges
Every card and elevated surface in dark mode has a slightly brighter 1px top border (`#2a2a3e`) with a 1px `box-shadow` of `primary-glow` beneath it. This mimics the look of acrylic panels with embedded neon tubes — the card is "lit from below."

### Constraint
These three elements are the **only** overtly sci-fi/neon flourishes in the UI. Everything else — layout, spacing, typography — stays minimal and restrained. The contrast between clean structure and these glowing accents is what makes the design feel intentional rather than themepark.
