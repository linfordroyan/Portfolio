# Tech Spec — Deployment

GitHub Pages hosting for the Angular prerendered static site.

---

## Target URL

| Phase | URL pattern |
|-------|-------------|
| MVP | `https://{github-username}.github.io/{repo-name}/` |
| Post-launch | Custom domain (TBD) |

**Example:** `https://linfordroyan.github.io/Portfolio/`

> Repository name determines path. If repo is renamed or user site (`username.github.io`), adjust `base-href` accordingly.

---

## Build output

| Angular builder | Output dir |
|-----------------|------------|
| `application` + prerender | `apps/client/dist/client/browser/` |

Artifacts deployed: entire `browser/` folder contents.

---

## base-href

GitHub Pages project sites serve from a subpath:

```bash
ng build --configuration production --base-href /Portfolio/
```

Set in `angular.json` production configuration:

```json
{
  "projects": {
    "client": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "baseHref": "/Portfolio/"
            }
          }
        }
      }
    }
  }
}
```

Replace `/Portfolio/` with actual repo name. For `username.github.io` root site, use `base-href /`.

---

## Prerender

### Routes to prerender

```
/
/projects/financial-mvp-sdd
/projects/ness-angular-enterprise
/projects/getir-logistics
```

### Angular 19+ configuration

`apps/client/app.routes.server.ts` or `prerender.routes` in `angular.json`:

```typescript
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'projects/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => [
    { slug: 'financial-mvp-sdd' },
    { slug: 'ness-angular-enterprise' },
    { slug: 'getir-logistics' },
  ]},
];
```

Each prerendered route produces `index.html` in its folder under `browser/`.

---

## SPA fallback (direct URL / refresh)

GitHub Pages does not natively support SPA rewrites. Mitigations:

| Approach | MVP choice |
|----------|------------|
| **Prerender all routes** | Primary — each route has real `index.html` |
| **404.html trick** | Backup — copy `index.html` to `404.html` for unknown paths |
| Hash routing (`#/`) | Not used — bad for SEO |

For prerendered MVP, only unknown slugs need fallback. Optional `404.html` copy in deploy step:

```bash
cp dist/client/browser/index.html dist/client/browser/404.html
```

---

## GitHub Actions — CI

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/client

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: apps/client/package-lock.json

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm test -- --no-watch --browsers=ChromeHeadless

      - name: Build
        run: npm run build -- --configuration production

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: apps/client/dist/client/browser
```

---

## GitHub Actions — Deploy

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/client
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: apps/client/package-lock.json
      - run: npm ci
      - run: npm run build -- --configuration production
        env:
          GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: apps/client/dist/client/browser

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Repo settings required

1. Settings → Pages → Source: **GitHub Actions**
2. Add secret `GA_MEASUREMENT_ID` if using build-time injection

---

## Assets — resume PDF

Copy at build or commit to `public/`:

```text
apps/client/public/assets/CV_LINFORDROYAN.pdf
```

Source of truth: `CV_LINFORDROYAN.pdf` at repo root. CI step optional:

```yaml
- name: Copy resume
  run: cp ../../CV_LINFORDROYAN.pdf public/assets/CV_LINFORDROYAN.pdf
  working-directory: apps/client
```

`Profile.resumePath` = `/assets/CV_LINFORDROYAN.pdf` (relative to base-href).

---

## Environment variables at build

| Variable | Injected into |
|----------|---------------|
| `GA_MEASUREMENT_ID` | `environment.prod.ts` via `fileReplacements` or `define` |

If empty, analytics service no-ops.

---

## Health / smoke check post-deploy

Manual checklist:

- [ ] Home loads at production URL
- [ ] Each case study URL loads without 404
- [ ] Resume PDF downloads
- [ ] `mailto:` link works
- [ ] Theme toggle persists after refresh
- [ ] No mixed-content warnings (all HTTPS)

---

## Rollback

Redeploy previous successful GitHub Actions run from Actions tab, or revert commit on `main`.

---

## Custom domain (future)

1. Add `CNAME` file or configure in Pages settings
2. Update `SiteConfig.siteUrl`
3. Change `base-href` to `/` if serving from apex domain
4. Update GA property URL filters
