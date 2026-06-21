# N0ctane Portfolio

Personal portfolio website built with Next.js, shadcn/ui, and Tailwind CSS.

[![Deploy to GitHub Pages](https://github.com/n0ctanedev/n0ctanedev.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/n0ctanedev/n0ctanedev.github.io/actions/workflows/deploy.yml)

## Tech Stack

- **Framework:** Next.js 16 (Static Export)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Typography:** Oxanium + JetBrains Mono
- **Icons:** Lucide + Remixicon
- **Testing:** Playwright

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Static export build |
| `npm run lint` | Biome lint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Playwright E2E tests |
| `npm run format` | Biome format |

## Deployment

Pushing to `main` triggers GitHub Actions which:

1. Installs dependencies
2. Runs lint + typecheck
3. Builds static export to `./out`
4. Runs E2E tests
5. Deploys `./out` to GitHub Pages
