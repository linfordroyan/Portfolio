# Linfordroyan — Client App

Angular portfolio SPA for GitHub Pages.

## Stack

- Angular 20 (standalone, static prerender)
- PrimeNG 20 + Tailwind CSS 4
- Static typed content in `src/app/data/`

## Commands

```bash
npm install
npm start              # dev server http://localhost:4200
npx ng build --configuration=production
npm test
```

## Structure

```text
src/app/
├── core/services/     Theme, Content, Analytics, Consent
├── data/              Models + static content from CV
├── layout/            Header, footer, theme toggle
└── pages/             Home (all sections), CaseStudy
```

## Deploy

GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys to GitHub Pages with `baseHref: /Portfolio/`.

Set repository secret `GA_MEASUREMENT_ID` for production analytics.
