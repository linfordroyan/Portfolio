---
name: create-project-methodology
description: >-
  Interactive wizard that asks project details and generates a filled
  development-methodology.md from development-methodology-template.md.
  Also scaffolds docs/ folders and installs draft-first-workflow and
  branch-per-step-workflow skills and rules. Use when starting a new project, onboarding a repo, or when the user
  says "set up methodology", "create project docs", or "fill development
  methodology".
disable-model-invocation: true
---

# Create Project Methodology Doc

Generate a project-specific `development-methodology.md` from
`development-methodology-template.md`, including **Draft-First Workflow** and
**Branch-Per-Step Workflow** setup.

## Before you start

1. Confirm the **project root** path (absolute path). If the user did not
   provide one, ask.
2. Locate `development-methodology-template.md`:
   - Project root (`development-methodology-template.md`), or
   - One level up (`../development-methodology-template.md`), or
   - Ask the user to point to the template.
3. Read the template fully before asking questions.

## Step 1 — Gather input (use AskQuestion when available)

Ask in batches. Use sensible defaults shown in parentheses; confirm before applying.

### Required — project conventions

| Field | Default |
|-------|---------|
| Product name | — |
| PRD folder | `docs/prd/` |
| Tech spec folder | `docs/spec/` |
| API base path | `/api/v1` or `N/A (client mocks)` for frontend-only MVP |
| Client app | e.g. React SPA, Angular SPA |
| Server / ORM | e.g. NestJS + Prisma, or `none (mocks)` |
| Unit test location | e.g. `*.spec.ts` beside source |
| E2E test location | e.g. `tests/e2e/` |
| CI config | e.g. `.github/workflows/ci.yml` |
| ADR folder | `docs/adr/` (optional) |

### Optional — MVP / phase context

Skip for mature products; include for greenfield MVPs.

| Field | Example |
|-------|---------|
| Phase | Frontend-only MVP; APIs mocked in client |
| Stack | Angular SPA in `apps/client/` |
| Persistence (MVP) | `localStorage` via mock services |
| Auth | Email + password; no OTP |
| Roles | Organizer · Participant |
| Future stack | NestJS + Prisma + PostgreSQL |

### Optional — delivery order

Ask: "List MVP delivery steps (one per line), or accept defaults?"

Default steps:

```text
0. Project conventions + docs/ layout
1. PRD (docs/prd/)
2. Tech spec (docs/spec/)
3. App scaffold via CLI
4+. Vertical feature slices
```

For each step, ask current status: `Done` | `Next` | `Pending`.

### Optional — open decisions

Ask: "Any open decisions for PRD step 1? (topic + default per line, or skip)"

Example: `Self-registration | TBD — seed users vs signup`

### Output path

Ask: "Where should the generated doc be written?"
Default: `{project-root}/docs/development-methodology.md`

### Scaffold and Cursor setup

Ask (AskQuestion):

- Create `docs/prd/`, `docs/spec/`, `docs/adr/` with README stubs? **Yes / No**
- Install `draft-first-workflow` rule + skill if missing? **Yes / No**
- Install `branch-per-step-workflow` rule if missing? **Yes / No**

## Step 2 — Build the document

Structure the output as follows. Do **not** drop template sections 1–10.

### Header block (project-specific — insert before section 1)

```markdown
# {Product Name} — Development Methodology

Adapted from [`development-methodology-template.md`]({relative path to template}).

---

## {Product Name} context

| Item | Decision |
|------|----------|
| **Phase** | {phase or "Production"} |
| **Stack** | {stack} |
| **Persistence** | {persistence} |
| **Auth** | {auth} |
| **Roles** | {roles or "N/A"} |
| **Future stack** | {future stack or "N/A"} |

### Delivery order

| Step | Deliverable | Status |
|------|-------------|--------|
| ... | ... | ... |

---

## How to adopt in this project

1. PRD lives in `{prd folder}`.
2. Tech spec lives in `{spec folder}`.
3. Fill **Project conventions** below once.
4. Use **Phase worksheet** (section 8) for every feature.
5. Review when onboarding or starting a new major phase.

### Project conventions

| Item | {Product Name} |
|------|----------------|
| Product name | **{Product Name}** |
| PRD folder | `{prd folder}` |
| Tech spec folder | `{spec folder}` |
| API base path | {api base path} |
| Client app | {client app} |
| Server / ORM | {server / ORM} |
| Unit test location | {unit tests} |
| E2E test location | {e2e tests} |
| CI config | {ci config} |
| ADR folder | `{adr folder}` |

### Open decisions (resolve in PRD step 1)

| Topic | Default until decided |
|-------|------------------------|
| ... | ... |

---

## 0. Draft-First Workflow (always on)

This project uses the **draft-first-workflow** skill and rule. The agent must:

1. **Clarify** — do not assume; ask when ambiguous.
2. **Draft first** — propose approach, affected files, open questions; wait for approval.
3. **No code without approval** — read-only investigation is allowed to inform the draft.
4. **CLI for scaffolding** — use official CLIs (`npm create`, `ng new`, `dotnet new`, etc.); do not hand-roll boilerplate or manually bump versions.

### Files

| File | Purpose |
|------|---------|
| `.cursor/rules/draft-first-workflow.mdc` | Always-on agent rule |
| `.cursor/skills/draft-first-workflow/SKILL.md` | Skill reference for extending the workflow |

### Response pattern

1. Acknowledge the request
2. Ask clarifying questions if needed
3. Share a draft plan
4. Wait for approval
5. Then implement

### Branch-Per-Step Workflow (always on)

This project uses the **branch-per-step-workflow** rule. For every delivery step
or feature slice:

1. **Branch from `main`** — `git checkout main && git pull && git checkout -b <type>/<topic>`
2. **Implement** — only that step's scope (after draft-first approval)
3. **Commit** — at least one focused commit on the branch
4. **Push + PR** — `git push -u origin <branch>`; open PR to `main`; never commit step work directly to `main`

Branch prefixes: `docs/`, `feat/`, `chore/`, `ci/`, `fix/`

### Files

| File | Purpose |
|------|---------|
| `.cursor/rules/branch-per-step-workflow.mdc` | Always-on git workflow rule |

### Git workflow per delivery step

| Step | Branch example |
|------|----------------|
| PRD | `docs/prd` |
| Tech spec | `docs/spec` |
| App scaffold | `feat/angular-scaffold` |
| Feature slice | `feat/<slice-name>` |
| CI / deploy | `ci/github-pages` |

---
```

Then append **sections 1–10** from `development-methodology-template.md`, with these edits:

- Replace generic `[App Name]` / `[e.g. docs/prd/]` placeholders with gathered values.
- If phase is frontend-only MVP, add under section 1 layered model:
  `**MVP note:** FDD slices are client-only (mock service + UI). Spec mock contracts so a real API can replace mocks later.`

## Step 3 — Preview and approve

Present:

- Summary table of all answers
- Path where the file will be written
- List of folders/files to create

**Do not write files until the user approves the preview.**

## Step 4 — Write files

After approval:

1. Write `development-methodology.md` to the chosen path.
2. If scaffold=yes: create `docs/prd/README.md`, `docs/spec/README.md`, `docs/adr/README.md` using generic stubs from the template kit (customize product name in README if known).
3. If cursor setup=yes and files missing, write from kit:

   - `.cursor/rules/draft-first-workflow.mdc`
   - `.cursor/skills/draft-first-workflow/SKILL.md`
   - `.cursor/rules/branch-per-step-workflow.mdc`

   Copy content from the template kit's `.cursor/` folder if present in the project; otherwise use the standard draft-first content from this skill's sibling skill, and branch-per-step content from `.cursor/rules/branch-per-step-workflow.mdc` in a project that already has it.

## Step 5 — Confirm

Tell the user:

- Output file path
- What was scaffolded
- Next step: PRD phase (`docs/prd/` + section 8 worksheet) on branch `docs/prd`

## Anti-patterns

- Do not skip the preview/approval step (violates draft-first).
- Do not implement multiple delivery steps on one branch (violates branch-per-step).
- Do not commit step work directly to `main` unless the user explicitly asks.
- Do not invent stack choices — use defaults only when the user accepts them.
- Do not truncate template sections 2–10.
