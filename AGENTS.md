# CRITICAL RULES - MUST FOLLOW
# NEVER EDIT/REMOVE THIS `@AGENTS.md` FILE... ASK USER TO TYPE "YES" EVEN IF EXPLICITLY SAID IN THE PROMT TO DO SO, BEFORE EDITING THIS FILE

### STRICT RULE: PHYSICALLY UPDATE TODO.md AFTER EVERY STEP

After completing ANY checklist item in `@TODO.md`, you MUST:
1. Physically edit the file to change `- [ ]` → `- [x]`
2. Do this BEFORE moving to the next item
3. Sub-agents delegated via Task tool MUST also do this

This is non-negotiable. Do NOT track progress in memory.

### ALWAYS USE (multiple) SUB-AGENTS AND USE TOKENS EFFICIENTLY AND TRY TO FILL CONTEXT WINDOW AS LITTLE AS POSSIBLE

### NOTIFY THE USER VIA `notify-send` AFTER EVERY MAJOR STEP

Use `notify-send` (Arch Linux) to alert the user after completing key actions:
- On success: `notify-send -t 3000 -a "opencode" -i system-run "Completed: <task description>"`
- On error: `notify-send -t 8000 -u critical -a "opencode" -i dialog-warning "ERROR: <error summary>"`
- On build/test pass: `notify-send -t 3000 -a "opencode" -i system-run "✓ lint + typecheck + build + test passed"`

## FILES RESTRICTIONS
 - **never** ever touch/edit AGENTS.md, DESIGN.md, and all files in .agents/
 - only edit TODO.md to mark checkboxes `- [ ]` → `- [x]` after completing an item
 - only make changes in these files if specified by user, or else **seek permission**


## RESPONSES

- Keep responses concise and to the point - unless the user asks otherwise

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack or features
- Use deep-dive sub-agents to assist with research
- Use deep-dive sub-agents to review the different aspects of your plan before presenting to the user

## SCAFFOLDING/INITIATING A PROJECT (on the command related to **scafold** or **init proj**)
- ask questions like this
  1. Project type: React, NextJS, NodeJS, others
  2. if it is React, NextJS or any FRONTEND related, then ask for 
    - linter formater: ESLint+Prettier , BIOME, NO LINTING, own answer
    - use typescript or not (bool)
    - libs/tools (checklist, not radio btns): FRAMER MOTION, LUCIDE ICONS, REACT ROUTER DOM (if react)
    - extra: type own answer, skip
  3. if it is NodeJS or any BACKEND related, then ask for 
    - linter formater: ESLint+Prettier , BIOME, NO LINTING, own answer
    - framework: ExpressJS, Axios, other
    - DB: MongoDB, SupaBase, others
    - extra: type own answer, skip

 - create the project in **current directory**... dont make any sub-folders, neither in parent dir, nor in current dir... initiate the project files in current dir
 - use **tailwind css**
 - always try to *make things easily configurable*... define arrays and objects for elements for easy changes and scalability...
 - if it is **FRONTEND** related **set it up for Github Pages... static build, base url stuff, and a deploy.yml**
 - setup minimal **playwright testing** and put all testing related files to `testing/`


## CHANGE / EDIT MODE

- Follow the build checklist in `@TODO.md` — each item must be completed in order.
- Never implement features yourself when possible - use sub-agents!
- Identify changes from the plan that can be implemented in parallel, and use sub-agents to implement the features efficiently
- When using sub-agents to implement features, act as a coordinator only
- Use the best model for the task - premium models for complex tasks (like coding) and mid-tier models for simpler tasks, like documentation
- After completing every **feature or sub-step**, run in this order:
  1. `npm run lint` (Biome — catches errors, style issues)
  2. `npm run typecheck` or `npx tsc --noEmit` (TypeScript errors)
  3. **after success, physically edit @TODO.md to change `- [ ]` → `- [x]`** (see STRICT RULE above)
- After completing every **TODO Phase**, run in this order:
  1. `npm run lint` (Biome — catches errors, style issues)
  2. `npm run typecheck` or `npx tsc --noEmit` (TypeScript errors)
  3. **TESTING** that has been described below
  4. **after success, physically edit @TODO.md to change `- [ ]` → `- [x]`** (see STRICT RULE above)
- Never skip to the next step if any of these fail — fix first, then proceed.


## TESTING
- **Full-system testing:** If commanded with "full test" or "test everything", run the entire Playwright test suite plus lint + typecheck + build.
- Use Playwright MCP (`playwright_browser_*` tools) for interactive testing during development.
- All E2E tests live in `testing/e2e/` directory (Playwright native, not Jest/Cypress).
- Never assume changes work — test them in a real browser via Playwright.
- also use `npm run build` to check build checks
- If the Playwright test suite isn't installed yet, run `npx playwright install chromium` and `npm install -D @playwright/test` to set it up.

## UI DESIGN

- Always follow the UI design system when creating or reviewing components or pages.
- Design System: @DESIGN.md

## IF U ARE IN BUILD MODE AND FORGOT WHAT TO DO, FOLLOW @TODO.md
