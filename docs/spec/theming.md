# Tech Spec — Theming

PrimeNG + Tailwind CSS integration with light/dark mode.

---

## Goals

- PrimeNG for interactive UI (buttons, cards, chips, accordion, menu, toast)
- Tailwind for layout, spacing, typography scale, responsive breakpoints
- Light + dark themes with WCAG 2.1 AA contrast in both modes
- User preference persisted in `localStorage`

---

## ThemeService

```typescript
type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  /** Read saved theme or system preference; apply on init */
  init(): void;

  /** Current theme signal */
  theme(): Signal<Theme>;

  /** Toggle and persist */
  toggle(): void;

  /** Apply theme to document */
  private apply(theme: Theme): void;
}
```

### Initialization (APP_INITIALIZER or constructor in AppComponent)

```typescript
// Priority: localStorage > prefers-color-scheme > 'light'
const saved = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = (saved as Theme) ?? (systemDark ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', theme === 'dark');
document.documentElement.setAttribute('data-theme', theme);
```

### Persistence

| Key | Value |
|-----|-------|
| `theme` | `'light'` \| `'dark'` |

---

## PrimeNG theming

Use PrimeNG v19+ **styled mode** with a preset (e.g. Aura) and dark mode selector:

```typescript
// app.config.ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',  // sync with Tailwind dark class on <html>
        },
      },
    }),
  ],
};
```

### PrimeNG vs Tailwind responsibility

| Concern | Owner |
|---------|-------|
| Buttons, inputs, cards, menu, accordion | PrimeNG |
| Grid, flex, gap, padding, max-width | Tailwind |
| Page layout sections | Tailwind |
| Typography scale (headings) | Tailwind (`text-4xl`, etc.) |
| Body font | Tailwind + Google Font import |

Avoid fighting PrimeNG internals with Tailwind — wrap PrimeNG components; use `styleClass` / `pt` pass-through for Tailwind utilities on host.

---

## Tailwind configuration

`tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',          // .dark on <html>
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',       // refine via ui-ux-pro-max
          600: '#0284c7',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

> Run `ui-ux-pro-max` design-system search for **portfolio + professional** before finalizing palette in implementation.

---

## CSS structure

```text
src/
├── styles.scss              # global imports
├── styles/
│   ├── _tailwind.css        # @tailwind base/components/utilities
│   ├── _primeng-overrides.scss
│   └── _tokens.scss         # CSS custom properties if needed
```

`styles.scss`:

```scss
@use 'styles/tailwind';
@use 'styles/primeng-overrides';

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

## Theme toggle component

```html
<!-- theme-toggle.component.html -->
<button
  type="button"
  pButton
  [icon]="theme() === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"
  class="p-button-text"
  [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  [attr.aria-pressed]="theme() === 'dark'"
  (click)="themeService.toggle()"
></button>
```

Place in header next to nav.

---

## Color contrast targets

| Element | Light | Dark |
|---------|-------|------|
| Body text | `gray-900` on `white` | `gray-100` on `gray-900` |
| Muted text | `gray-600` min | `gray-400` min |
| Primary CTA | brand-600 on white | brand-500 on gray-900 |
| Focus ring | `ring-2 ring-brand-500 ring-offset-2` | same |

Verify with axe / Lighthouse after palette finalization.

---

## Section layout pattern

```html
<section id="about" class="py-16 md:py-24 px-4 max-w-5xl mx-auto">
  <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">About</h2>
  <!-- PrimeNG card or plain Tailwind -->
</section>
```

Alternating section backgrounds optional: `bg-gray-50 dark:bg-gray-800/50`.

---

## Responsive breakpoints

| Breakpoint | Tailwind | Usage |
|------------|----------|-------|
| Mobile | default | Single column; hamburger nav |
| `md:` 768px | 2-column grids for skills/services |
| `lg:` 1024px | Full horizontal nav |

---

## Icons

Use PrimeIcons (`pi pi-*`) bundled with PrimeNG. No additional icon pack for MVP.

---

## Motion

| Animation | Rule |
|-----------|------|
| Smooth scroll | Disabled when `prefers-reduced-motion` |
| Section fade-in | Optional; skip if reduced motion |
| Theme transition | `transition-colors duration-200` on `body` |

---

## Open implementation notes

- [ ] Finalize brand palette via `@ui-ux-pro-max` before first UI PR
- [ ] Confirm PrimeNG version compatibility with Angular version at `ng add` time
- [ ] Test dark mode on all PrimeNG components used (Button, Card, Chip, Accordion, Menu)
