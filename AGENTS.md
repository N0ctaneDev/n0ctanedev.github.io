# CRITICAL RULES - MUST FOLLOW

## FILES RESTRICTIONS
 - **never** ever touch/edit AGENTS.md , DESIGN.md, TODO.md and all files in .agents/
 - only **mark** the TODOs if needed
 - only make changes in these files if specified by user, or else **seek permision**


## RESPONSES

- Keep responses concise and to the point - unless the user asks otherwise

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack or features
- Use deep-dive sub-agents to assist with research
- Use deep-dive sub-agents to review the different aspects of your plan before presenting to the user

## CHANGE / EDIT MODE

- Follow the build checklist in `@TODO.md` — each item must be completed in order.
- Never implement features yourself when possible - use sub-agents!
- Identify changes from the plan that can be implemented in parallel, and use sub-agents to implement the features efficiently
- When using sub-agents to implement features, act as a coordinator only
- Use the best model for the task - premium models for complex tasks (like coding) and mid-tier models for simpler tasks, like documentation
- After completing every feature or step, run in this order:
  1. `npm run lint` (Biome — catches errors, style issues)
  2. `npm run typecheck` or `npx tsc --noEmit` (TypeScript errors)
  3. `npm run build` (Next.js static build — catches all build errors)
  4. `npx playwright test` (E2E tests — verifies features work in browser)
- Never skip to the next step if any of these fail — fix first, then proceed.


## TESTING

- **Per-step testing:** Every time you add or change a feature, write or update a Playwright E2E test that specifically covers that feature before moving on.
- **Full-system testing:** If commanded with "full test" or "test everything", run the entire Playwright test suite plus lint + typecheck + build.
- Use Playwright MCP (`playwright_browser_*` tools) for interactive testing during development.
- All E2E tests live in `e2e/` directory (Playwright native, not Jest/Cypress).
- Never assume changes work — test them in a real browser via Playwright.
- If the Playwright test suite isn't installed yet, run `npx playwright install chromium` and `npm install -D @playwright/test` to set it up.

## UI DESIGN

- Always follow the UI design system when creating or reviewing components or pages.
- Design System: @DESIGN.md