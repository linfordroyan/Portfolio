# Linfordroyan — Portfolio

Freelance portfolio for **Linford Royan** — Senior Software Engineer / Technical Lead.

**Live site:** https://linfordroyan.github.io/Portfolio/

## Stack

- Angular 20 · PrimeNG · Tailwind CSS
- Static prerender · GitHub Pages

## Local development

```bash
cd apps/client
npm install
npm start
```

Production build:

```bash
npm run build:prod
```

## Deployment (GitHub Pages)

Deploys automatically on push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### One-time setup (repo owner)

1. Open **Settings → Pages** in this repo.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` or run **Actions → Deploy to GitHub Pages → Run workflow**.

Optional: add repository secret `GA_MEASUREMENT_ID` for Google Analytics in production.

### URL

Project site: `https://linfordroyan.github.io/Portfolio/`  
(`baseHref` is `/Portfolio/` in `apps/client/angular.json`)

## Docs

- [Development methodology](docs/development-methodology.md)
- [PRD](docs/prd/)
- [Tech spec](docs/spec/)
