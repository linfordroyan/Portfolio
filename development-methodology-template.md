# Production Development Methodology — Portable Guideline

**Copy this file into any project** (e.g. `docs/development-methodology.md` or `CONTRIBUTING.md`).  
Replace bracketed placeholders `[like this]` with your project names, paths, and domain terms.

**Quick start:** Copy the template kit into your repo, then in Cursor chat run `@create-project-methodology` to fill this doc interactively.

---

## How to adopt in a new project

1. Copy this file (and the `.cursor/` kit) into your repo.  
2. Create folders (adjust names to taste):

```text
docs/
  prd/           # product requirements — what & why
  spec/          # technical specs — API, data model, auth
  adr/           # architecture decision records (optional)
.cursor/
  rules/         # draft-first-workflow.mdc (always on)
  skills/        # create-project-methodology, draft-first-workflow
```

3. Run `@create-project-methodology` in Cursor chat **or** fill the **Project conventions** table below manually.  
4. Use the **Phase worksheet** (section 8) for every feature.  
5. Review this doc when onboarding someone or starting a new major phase.

### Project conventions (fill in once)

| Item | Your project |
|------|--------------|
| Product name | `[App Name]` |
| PRD folder | `[e.g. docs/prd/]` |
| Tech spec folder | `[e.g. docs/spec/]` |
| API base path | `[e.g. /api/v1]` |
| Client app | `[e.g. React SPA, mobile app]` |
| Server / ORM | `[e.g. NestJS + Prisma, Rails, Django]` |
| Unit test location | `[e.g. *.spec.ts next to source]` |
| E2E test location | `[e.g. tests/e2e/, Playwright]` |
| CI config | `[e.g. .github/workflows/ci.yml]` |
| ADR folder | `[e.g. docs/adr/]` |

---

## 0. Draft-First Workflow (agent skill)

This project uses the **draft-first-workflow** Cursor rule and skill. The agent must follow this on every request.

| Rule | Action |
|------|--------|
| Clarify | Ask before assuming requirements, scope, or tech choices |
| Draft first | Propose approach + affected files; wait for approval |
| No code without approval | Read-only investigation allowed to inform the draft |
| CLI scaffolding | Use official project CLIs; never hand-roll versions |

### Cursor files

| File | Purpose |
|------|---------|
| `.cursor/rules/draft-first-workflow.mdc` | Always-on agent rule |
| `.cursor/skills/draft-first-workflow/SKILL.md` | Skill reference for extending the workflow |
| `.cursor/skills/create-project-methodology/SKILL.md` | Chat wizard to generate this doc in new projects |

### Response pattern

1. Acknowledge the request  
2. Ask clarifying questions if needed  
3. Share a draft plan  
4. Wait for approval  
5. Then implement  

---

## 1. The layered model (use all of them)

No single methodology covers a production app. Use each where it wins:

```text
PRD (product intent)
  → Tech spec (contracts & invariants)
    → Feature slice (vertical delivery)
      → Unit tests (risky logic)
        → E2E / BDD (golden paths)
          → CI + observability (production gate)
```

| Layer | Acronym | Answers | Typical location |
|-------|---------|---------|------------------|
| Product | PRD | *What* and *why* for users | `docs/prd/` |
| Specification | SDD | *How* at boundaries (API, data, auth) | `docs/spec/` |
| Delivery | FDD | *Ship* end-to-end features | Branches / PRs / milestones |
| Logic quality | TDD | *Prove* rules and edge cases | Unit tests beside code |
| Journey quality | BDD | *Prove* user flows work | E2E / integration tests |
| Production | Ops | *Run* safely in prod | CI, monitoring, env, runbooks |

**Rule of thumb:** SDD at boundaries, FDD for delivery, TDD for risky logic, BDD for critical journeys.

---

## 2. SDD — Specification-Driven Development

**When:** Before or alongside code for anything expensive to change later — data model, API contracts, auth, permissions, error shapes, integrations.

**When not:** Pixel-perfect UI mockups, experimental copy, throwaway spikes.

### What a good spec contains

1. **Invariant** — rule that must never break  
2. **Interface** — request/response, schema, or event shape  
3. **Error cases** — status code + stable `code` string + message  
4. **Non-goals** — explicitly out of scope  

### Suggested spec documents

| Doc | Contents |
|-----|----------|
| `00-overview.md` | Stack, principles, repo layout |
| `data-model.md` | Tables, relations, enums, indexes |
| `api.md` | Routes, payloads, standard error codes |
| `authentication.md` | Sessions, OAuth, RBAC, rate limits |
| `security.md` | Headers, uploads, secrets, CSRF |
| `deployment.md` | Envs, CI/CD, health checks |

Keep specs **living** — update when implementation diverges.

### Example — OAuth sign-in (generic)

**PRD:** "Users can sign in with Google."

**Tech spec** should define:

| Item | Spec content |
|------|--------------|
| Start flow | `GET /auth/google` → provider → `GET /auth/callback/google` |
| Session | How tokens are stored (cookies vs headers); TTL; refresh |
| Account linking | When provider email can link to existing account |
| Feature flag | Behavior when credentials are missing |
| Errors | Stable codes, e.g. `OAUTH_FAILED`, `EMAIL_ALREADY_EXISTS` |
| Security | Never expose provider tokens to the client |

**Spec snippet to write before coding:**

```markdown
## GET /auth/providers

Response 200:
{
  "email": true,
  "google": boolean   // true only when GOOGLE_CLIENT_ID is configured
}

## OAuth callback failure

Redirect to: {APP_URL}/login?error=oauth_failed
Do not return access tokens in URL query params.
```

### Example — File bulk import (generic)

**PRD:** "Users can upload CSV; max 5MB / 1000 rows; invalid rows reported."

**Tech spec:**

```markdown
POST /resources/import
Content-Type: multipart/form-data
Field: file (text/csv)

Success 200:
{
  "imported": 42,
  "skipped": 3,
  "errorsUrl": "/resources/import/errors/:jobId"
}

Failure 422:
{ "code": "IMPORT_TOO_LARGE", "message": "Max 1000 rows" }

Row rules:
- name: required, unique within parent scope
- code: 2–8 alphanumeric characters
```

### SDD checklist (per feature)

- [ ] PRD section describes user-visible behavior  
- [ ] Spec documents API route(s) or schema change  
- [ ] Error codes listed in central API spec  
- [ ] Data model updated if persistence changes  
- [ ] Security noted if auth, uploads, or rate limits involved  
- [ ] Spec updated after implementation changes  

### Anti-pattern

200 lines of UI detail in spec before a working screen. Spec the **contract**; iterate UI in code.

---

## 3. FDD — Feature-Driven Development

**When:** Every sprint or milestone. Ship **vertical slices** — persistence → API → UI → deployable increment.

**When not:** "Backend done" with no UI for weeks; "UI mock only" with no API.

### Feature slice template

```markdown
## Feature: [Name]

**User story:** As a [role], I want [action] so that [benefit].

**Acceptance criteria:**
- [ ] …
- [ ] …

**Vertical slice (prefer one PR):**
- [ ] DB migration / schema (if any)
- [ ] Server module + service + route/controller
- [ ] Client route + page + API client
- [ ] Errors match spec codes
- [ ] Manual test steps documented

**Out of scope for this slice:**
- …
```

### Example — Authentication slice

| Layer | Deliverable |
|-------|-------------|
| DB | User, Session tables |
| API | signup, login, logout, refresh, OAuth callback |
| Client | Login/signup UI, auth guard, token/cookie handling |
| Config | `.env.example`, secrets documented in README |
| Verify | Sign up → log in → land on home/dashboard |

**Good:** One PR: `feat(auth): email login and Google OAuth with httpOnly sessions`.

**Bad:** PR 1 "User model", PR 2 "OAuth strategy", PR 3 "login page" — nothing works until PR 5.

### Example — Multi-step wizard (slice by value, not by step)

For a 7-step onboarding wizard, ship:

| Slice | User can… |
|-------|-------------|
| 1 | Create resource + see it in a list |
| 2 | Add child items with validation |
| 3 | Configure rules/settings |
| 4 | Bulk import |
| 5 | Collaborate / lock editing |
| 6 | Review and publish |

Each merge leaves the product **usable**, not merely "more complete internally."

### FDD checklist (per PR)

- [ ] Demo path: "Open app → do X → see Y" works  
- [ ] No orphan APIs or dead UI routes  
- [ ] Env-dependent features degrade gracefully when unconfigured  
- [ ] README or spec updated if setup changed  

---

## 4. TDD — Test-Driven Development

**When:** Business rules, money/state, parsing, permissions, auth edge cases — bugs are costly or embarrassing.

**When not:** First draft of layout/CSS; pure exploration (add tests when stabilizing).

### TDD cycle (Red → Green → Refactor)

1. Write one failing test for one behavior  
2. Write minimal code to pass  
3. Refactor; keep tests green  

### Example — Pricing / validation rule

**PRD:** "Discount cannot exceed subtotal; minimum order $10."

**Spec:**

```markdown
applyDiscount(subtotal, discount):
  if discount > subtotal → throw BUSINESS_RULE DISCOUNT_EXCEEDS_SUBTOTAL
  if subtotal - discount < MIN_ORDER → throw BUSINESS_RULE BELOW_MINIMUM
```

**Test first:**

```typescript
describe('applyDiscount', () => {
  it('rejects discount greater than subtotal', () => {
    expect(() => applyDiscount(100, 150)).toThrow(/DISCOUNT_EXCEEDS_SUBTOTAL/);
  });

  it('rejects order below minimum after discount', () => {
    expect(() => applyDiscount(12, 5)).toThrow(/BELOW_MINIMUM/);
  });

  it('returns final amount when valid', () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });
});
```

### Example — Import row parser

```typescript
describe('parseImportRow', () => {
  it('rejects code shorter than minimum length', () => {
    const result = parseImportRow({ name: 'Acme', code: 'A' });
    expect(result.errors).toContainEqual(
      expect.objectContaining({ field: 'code' }),
    );
  });

  it('accepts valid row', () => {
    const result = parseImportRow({ name: 'Acme', code: 'ACME' });
    expect(result.errors).toHaveLength(0);
  });
});
```

### Example — Rate limit / lockout

```typescript
describe('LoginLockout', () => {
  it('locks identifier after N failed attempts', async () => {
    for (let i = 0; i < MAX_FAILURES; i++) {
      await lockout.recordFailure('user@example.com');
    }
    await expect(lockout.assertNotLocked('user@example.com')).rejects.toThrow('LOCKED');
  });
});
```

### Where TDD usually pays off

| Area | Test type | Priority |
|------|-----------|----------|
| Money, quotas, inventory | Unit | High |
| State machines (draft → published) | Unit | High |
| Parsers (CSV, JSON, webhooks) | Unit | High |
| Auth (sessions, refresh, lockout) | Unit + integration | High |
| Permission checks | Unit | High |
| Simple CRUD with no rules | Integration or skip | Low |
| Visual styling | Manual / visual regression | Low |

### TDD checklist

- [ ] Test names describe behavior  
- [ ] One main concept per test  
- [ ] Use same types as production (decimals, timezones, IDs)  
- [ ] Mock at module boundaries; don't unit-test the database driver  

### Anti-pattern

Scaffold tests that only assert framework bootstrapping (`hello world`). Replace with domain tests or delete.

---

## 5. BDD — Behavior-Driven Development

**When:** Critical user journeys and system behavior from the **outside in** (API or browser).

**When not:** Every form field (too brittle); implementation details.

### Gherkin-style stories

```gherkin
Feature: User signs in with Google

  Scenario: First-time Google login
    Given Google OAuth is configured
    And no account exists for "user@gmail.com"
    When the user completes Google sign-in as "user@gmail.com"
    Then they are redirected to the home page
    And an authenticated session is established

  Scenario: OAuth-only account cannot use password
    Given an account exists with Google linked and no password
    When they attempt email/password login
    Then they receive an error indicating OAuth-only sign-in
```

### Example — API-level E2E

```typescript
describe('Auth API (e2e)', () => {
  it('signup then login establishes session', async () => {
    await api.post('/auth/signup').send({ email, password }).expect(201);

    const res = await api.post('/auth/login').send({ email, password }).expect(200);

    expect(res.headers['set-cookie']).toBeDefined();
    // or: expect(res.body.token).toBeDefined() — match your auth model
  });
});
```

### Golden paths (define 3–5 per product)

| # | Journey | Proves |
|---|---------|--------|
| 1 | Sign up → verify → first core action | Auth + gates |
| 2 | Create → configure → activate main entity | Core setup flow |
| 3 | Primary real-time or transactional flow | Business rules + sync |
| 4 | Export or report | Data accuracy |
| 5 | Shared / public access path | Authorization |

Start with **3–5 journeys**, not dozens of scenarios.

### BDD checklist

- [ ] Scenario maps to a PRD success criterion  
- [ ] Uses real HTTP/DB (or contract tests against real service boundaries)  
- [ ] Runs in CI  
- [ ] UI tests use stable selectors (`data-testid`)  

---

## 6. Production practices (beyond SDD/FDD/TDD/BDD)

| Practice | What to do |
|----------|------------|
| **CI pipeline** | Install, lint, test, build on every PR |
| **Env validation** | Fail fast at startup on missing/invalid config |
| **Secrets** | Never commit secrets; provide `.env.example` |
| **Structured errors** | Consistent `{ code, message, details? }` shape |
| **Rate limiting** | Protect auth and expensive endpoints |
| **Observability** | Error tracking, logs, basic metrics |
| **Migrations** | Versioned schema changes in deploy path |
| **Health check** | `GET /health` (or equivalent) for orchestration |
| **ADRs** | Short records for significant architectural choices |
| **Rollback plan** | Know how to revert deploy + migration |

### Example — CI gate

```yaml
# .github/workflows/ci.yml (adapt to your stack)
steps:
  - install dependencies
  - run linter
  - run unit tests
  - run integration/e2e tests (with test database service)
  - run production build
```

### Example — ADR

```markdown
# ADR-001: httpOnly cookies for session tokens

**Status:** Accepted

**Context:** SPA talks to same-site API; localStorage is vulnerable to XSS.

**Decision:** Store session in httpOnly, Secure cookies; CSRF token on mutations.

**Consequences:** Client sends credentials on API calls; OAuth callbacks are server-side.
```

---

## 7. Decision matrix

| You're about to… | Do this first |
|------------------|---------------|
| Add a new API endpoint | SDD: document route + errors, then FDD slice |
| Change database schema | SDD: data model + migration plan |
| Add pricing / inventory / workflow rules | TDD: unit tests for edge cases |
| Ship login or payments | FDD vertical slice + 1–2 BDD scenarios |
| Change button color or copy | Code only; skip spec |
| Add export or webhook | SDD payload + TDD for output correctness |
| Reorganize folders | Update overview/spec after merge |

---

## 8. Phase worksheet (copy per feature)

```markdown
## Feature: _______________

### 1. PRD
- File: ___
- User story:
- Acceptance criteria:

### 2. Spec (SDD)
- [ ] API / events documented
- [ ] Errors documented
- [ ] Schema changes documented
- [ ] Security reviewed

### 3. Slice (FDD)
- [ ] Persistence
- [ ] API / backend
- [ ] UI / client
- [ ] Config & docs

### 4. Tests
- [ ] Unit (TDD) for: ___
- [ ] E2E / BDD for: ___

### 5. Ship
- [ ] CI green
- [ ] Manual demo path:
- [ ] PRD / spec updated
```

---

## 9. Recommended day-to-day workflow

1. Pick a **PRD outcome** (user-visible success).  
2. **Update spec** for touched contracts (15–30 min).  
3. **Define the vertical slice** — one demo path end-to-end.  
4. **TDD** for risky logic; otherwise tests in the same PR before merge.  
5. **Implement** backend and client together when possible.  
6. **Add one BDD scenario** for golden-path features.  
7. **Merge** when CI is green and manual demo works.  
8. **Sync PRD and spec** if behavior changed.

---

## 10. Quick reference

| Format | One-line rule |
|--------|----------------|
| **SDD** | Spec boundaries before they harden |
| **FDD** | Ship vertical features, not horizontal layers |
| **TDD** | Test rules that would hurt if wrong |
| **BDD** | Test journeys users depend on |
| **Ops** | Nothing is production without CI and monitoring |

---

## License

Use freely in personal and commercial projects. Attribution optional.
