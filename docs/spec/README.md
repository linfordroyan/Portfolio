# Tech Spec

**How** at system boundaries — content model, routing, deployment, integrations.

Written after PRD. Suggested documents for **Linfordroyan**:

| File | Topic |
|------|-------|
| `00-overview.md` | Stack (Angular, PrimeNG, Tailwind), repo layout, prerender |
| `content-model.md` | Static content shapes; Strapi migration contracts |
| `deployment.md` | GitHub Pages, `base-href`, prerender routes, `404.html` fallback |
| `theming.md` | Light/dark toggle, PrimeNG + Tailwind integration |
| `analytics.md` | Google Analytics, cookie consent |
| `accessibility.md` | WCAG 2.1 AA targets |

Tech spec phase complete. App scaffolded at `apps/client/`.

## Run locally

```bash
cd apps/client
npm install
npm start
```

## Production build

```bash
cd apps/client
npx ng build --configuration=production
```

Output: `apps/client/dist/client/browser/` (4 prerendered routes).
