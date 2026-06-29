# Tech Spec — Overview

**Product:** Linfordroyan  
**Status:** Approved for MVP implementation  
**Last updated:** 2026-06-29  
**PRD reference:** `docs/prd/00-overview.md`

---

## Stack

| Layer | Choice | Version policy |
|-------|--------|----------------|
| Framework | Angular (standalone components) | Latest stable via `ng new` |
| UI components | PrimeNG | Installed via `ng add primeng` |
| Styling | Tailwind CSS | Via `ng add @angular/tailwind` or official Tailwind setup |
| Language | TypeScript | Bundled with Angular CLI |
| Content | Static TypeScript modules / JSON | No runtime API for MVP |
| Hosting | GitHub Pages | Static files from `browser` output |
| Build mode | **Application builder + prerender** | SSG for SEO and direct URL access |
| Analytics | Google Analytics 4 | Client-side; consent-gated |
| Tests | Jasmine + Karma (unit), Playwright or Cypress (e2e) | Angular defaults |
| CI | GitHub Actions | `.github/workflows/ci.yml` |

---

## Architecture

```text
Portfolio/                          (monorepo root)
├── apps/
│   └── client/                     Angular app (ng new target)
│       ├── public/
│       │   └── assets/
│       │       └── CV_LINFORDROYAN.pdf
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/           services, guards (minimal for static site)
│       │   │   ├── layout/         header, footer, nav, theme toggle
│       │   │   ├── pages/
│       │   │   │   ├── home/       single-page sections (or feature modules)
│       │   │   │   └── case-study/ dynamic route by slug
│       │   │   ├── shared/         pipes, directives, ui wrappers
│       │   │   └── data/           content providers (static)
│       │   ├── index.html
│       │   └── styles.scss
│       └── angular.json
├── docs/
│   ├── prd/
│   └── spec/
├── CV_LINFORDROYAN.pdf             source; copied to public at build or manually
└── .github/workflows/ci.yml
```

---

## Routing

| Route | Component | Prerender |
|-------|-----------|-----------|
| `/` | `HomeComponent` | Yes |
| `/projects/:slug` | `CaseStudyComponent` | Yes (3 slugs) |

**Home sections** use fragment anchors (`#hero`, `#about`, etc.) — no separate routes for MVP.

### Prerender routes

```json
[
  "/",
  "/projects/financial-mvp-sdd",
  "/projects/ness-angular-enterprise",
  "/projects/getir-logistics"
]
```

Configure in `angular.json` under `prerender.routes` or `app.routes.server.ts` (Angular 19+ pattern).

---

## Scaffold commands (CLI only)

Run from repo root after monorepo folder exists:

```bash
# 1. Create app
ng new client --directory apps/client --routing --style scss --ssr false --standalone

# 2. Enable prerender (Angular 19+)
cd apps/client
ng add @angular/ssr --prerender

# 3. UI stack
ng add primeng
ng add @angular/tailwind   # or follow Tailwind + Angular official guide

# 4. E2E (optional at scaffold)
ng add @angular/playwright   # or ng add @cypress/schematic
```

> **Note:** Exact `ng add` flags may vary by Angular version — use `ng version` and official docs at scaffold time. Do not hand-edit Angular/PrimeNG versions in `package.json`.

---

## Key services

| Service | Responsibility |
|---------|----------------|
| `ContentService` | Loads static profile, services, skills, experience, projects |
| `CaseStudyService` | Resolves case study by slug; 404 if unknown |
| `ThemeService` | Light/dark toggle; reads/writes `localStorage` key `theme` |
| `AnalyticsService` | Loads GA4 after consent; tracks events |
| `ConsentService` | Banner state; persists `analytics_consent` in `localStorage` |

No HTTP client required for MVP content. Inject services with `providedIn: 'root'`.

---

## Environment

| File | Purpose |
|------|---------|
| `environment.ts` | `gaMeasurementId: ''` (empty = GA disabled) |
| `environment.prod.ts` | `gaMeasurementId: 'G-XXXXXXXX'` |

Never commit real measurement ID in repo if private — use GitHub Actions secret + file replacement at CI build, or document in `.env` pattern if adopted later.

---

## Spec documents

| Doc | Topic |
|-----|-------|
| `content-model.md` | TypeScript interfaces + static data shapes |
| `deployment.md` | GitHub Pages, base-href, CI deploy |
| `theming.md` | PrimeNG + Tailwind + dark mode |
| `analytics.md` | GA4 + consent banner |
| `accessibility.md` | WCAG 2.1 AA implementation |

---

## Non-goals (MVP)

- No NestJS/Strapi backend
- No Angular Universal SSR server — prerender only
- No contact form API
- No i18n (`@angular/localize` deferred)

---

## Strapi migration boundary (future)

Static `ContentService` methods map 1:1 to future Strapi REST endpoints. See `content-model.md` for interface contracts that must remain stable across migration.
