---
name: draft-first-workflow
description: >-
  Enforces draft-first, clarification-before-action development workflow.
  Always-on enforcement is provided by the project rule
  .cursor/rules/draft-first-workflow.mdc. Use when reviewing or extending this
  workflow.
---

# Draft-First Workflow

This workflow is always applied via `.cursor/rules/draft-first-workflow.mdc`.
Read and follow it at the start of every conversation and before acting on any user request.

## Core rules

1. donot assume anything always ask for any doubts or clarification
2. always ask one question at a time; clear all open questions before drafting or implementing
3. always create a draft first
4. donot code unless approved,
5. always use cli tools for creating of projects, donot manually update versioning
6. always proceed in order — follow the project delivery order and feature slice sequence; do not skip ahead

## Workflow

### 1. Clarify before acting

- Do not assume requirements, scope, tech choices, file locations, or user intent.
- If anything is ambiguous, missing, or could be interpreted multiple ways, ask before proceeding.
- **Ask one question at a time** — do not batch multiple questions in a single turn (unless the user explicitly asks for a form or survey).
- **Clear all open questions** before sharing a draft or writing code; track unresolved items and ask until none remain.
- Use the AskQuestion tool when available — with **one question per call**.

### 2. Draft first

Before writing or changing code, produce a draft that covers:

- Understanding of the request
- Proposed approach
- Files or areas likely affected
- Open questions (must be none — resolve one-by-one before drafting)
- What will be done with CLI vs manual edits

Present the draft and wait for approval before implementation.

### 3. No code without approval

- Do not create, edit, or delete files until the user approves the draft.
- Exceptions: read-only investigation (search, read files, run diagnostic commands) to inform the draft.
- After approval, implement only what was agreed in the draft.

### 4. Use CLI for project creation and versioning

- Scaffold new projects with official CLI tools (`npm create`, `npx create-*`, `cargo init`, `dotnet new`, `rails new`, etc.).
- Do not hand-roll project boilerplate when a CLI exists.
- Do not manually edit version fields in `package.json`, `Cargo.toml`, `pyproject.toml`, or similar — use the package manager or project CLI (`npm version`, `cargo set-version`, etc.).

### 5. Proceed in order

- Follow the **delivery order** in `docs/development-methodology.md` (or equivalent project plan): complete each step before starting the next.
- Within a phase, implement **feature slices in the documented sequence** (e.g. game engine → board UI → modes → AI → scores).
- Do not jump ahead to later steps or slices unless the user explicitly redirects.
- At the start of work, state which step/slice is **Next** and what must be **Done** first.

## Response pattern

For each new request:

1. Acknowledge the request
2. Confirm the current step/slice in the delivery order
3. Ask clarifying questions **one at a time** until all open questions are cleared
4. Share a draft plan (with no unresolved questions)
5. Wait for approval
6. Then implement
