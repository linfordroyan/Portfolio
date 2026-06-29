# Tech Spec — Accessibility

WCAG 2.1 AA implementation targets for Linfordroyan portfolio.

**PRD reference:** `docs/prd/03-success-criteria.md`

---

## Compliance target

**WCAG 2.1 Level AA** for all MVP pages and components.

---

## Document structure

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header role="banner">...</header>
  <nav aria-label="Main navigation">...</nav>
  <main id="main-content" role="main">...</main>
  <footer role="contentinfo">...</footer>
</body>
```

### Heading hierarchy

| Page | Structure |
|------|-----------|
| Home | One `h1` in Hero (name); section titles `h2`; subsections `h3` |
| Case study | One `h1` (project title); sections `h2` |

Never skip levels (e.g. `h1` → `h3`).

---

## Skip link

```scss
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--brand-600);
  color: white;

  &:focus {
    top: 0;
  }
}
```

---

## Navigation

| Requirement | Implementation |
|-------------|----------------|
| Keyboard access | All nav links focusable; logical tab order |
| Mobile menu | PrimeNG Menu or custom; `aria-expanded` on toggle |
| Current section | `aria-current="true"` on active nav item when in view (optional IntersectionObserver) |
| Anchor links | `href="#about"` with visible focus styles |

---

## Color & contrast

| Check | Minimum |
|-------|---------|
| Normal text | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| UI components & graphics | 3:1 |
| Focus indicator | 3:1 against adjacent colors |

Test **both** light and dark themes. Tools: axe DevTools, Lighthouse, WebAIM Contrast Checker.

Do not rely on color alone for state (e.g. add icon + text for theme toggle).

---

## Focus management

```css
/* Tailwind utility or global */
:focus-visible {
  outline: 2px solid theme('colors.brand.500');
  outline-offset: 2px;
}
```

- No `outline: none` without replacement
- Modal/dialog (if added later): trap focus, restore on close

---

## Interactive elements

| Element | a11y requirement |
|---------|------------------|
| Buttons | `<button>` or `pButton`; visible label or `aria-label` |
| Links | Descriptive text (“Email Linford”) not “click here” |
| mailto / tel | `aria-label` if icon-only |
| Theme toggle | `aria-label` + `aria-pressed` |
| Resume download | `download` attr + clear link text |
| Cards (project) | Entire card clickable → wrap in `<a>` or button with `aria-labelledby` |

---

## Images & media

| Type | alt text |
|------|----------|
| Decorative | `alt=""` |
| Headshot (future) | "Linford Royan, Senior Software Engineer" |
| Company logos | "{Company} logo" |
| Icons (PrimeIcons) | `aria-hidden="true"` when redundant with text |

No autoplay video MVP.

---

## Motion

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Disable smooth scroll when reduced motion preferred (see `theming.md`).

---

## Forms

No contact form MVP. If added later:

- Associate `<label>` with every input
- Announce errors with `aria-live="polite"`
- Required fields marked with `aria-required`

---

## Case study pages

- [ ] Breadcrumb or “Back to projects” link is keyboard accessible
- [ ] Page `<title>` updates per case study (screen reader on route change)
- [ ] Tag chips readable; not interactive unless linked

Use Angular `Title` service:

```typescript
this.title.setTitle(`${caseStudy.metaTitle} | Linford Royan`);
```

---

## Testimonials placeholder

Empty state must not confuse screen readers:

```html
<section id="testimonials" aria-labelledby="testimonials-heading">
  <h2 id="testimonials-heading">Testimonials</h2>
  <p>Client testimonials will appear here as projects complete.</p>
</section>
```

When quotes added, use `<blockquote>` + `<cite>`.

---

## Language

```html
<html lang="en">
```

Future i18n: change `lang` dynamically per route.

---

## Testing checklist

### Automated

- [ ] axe DevTools: 0 critical/serious on `/` and each case study
- [ ] Lighthouse Accessibility ≥ 90 on mobile

### Manual

- [ ] Tab through entire home page without trap
- [ ] Skip link appears on first Tab and jumps to main
- [ ] Theme toggle operable via keyboard
- [ ] Mobile nav open/close via keyboard
- [ ] mailto link activatable via Enter
- [ ] Zoom to 200% — no horizontal scroll, content readable

### Screen reader spot-check

- [ ] NVDA (Windows) or VoiceOver (macOS): hero, contact, one case study

---

## Component-level acceptance (per PR)

Before merging UI PRs:

- [ ] All interactive elements have accessible names
- [ ] Color contrast verified in both themes
- [ ] No Lighthouse a11y regressions
- [ ] `prefers-reduced-motion` respected for new animations

---

## ADR candidate

If contrast trade-offs arise between brand palette and AA:

Document as `docs/adr/ADR-001-color-contrast-brand-palette.md`.
