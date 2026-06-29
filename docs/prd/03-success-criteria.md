# PRD — Success Criteria

Golden-path journeys, quality gates, and acceptance criteria for MVP launch.

---

## Golden-path journeys

Define **5 journeys** that prove the portfolio works for real users.

### Journey 1 — First impression (credibility)

```gherkin
Given a potential client lands on the homepage
When they scroll through Hero, About, and Services
Then they understand Linford is a Senior Angular/full-stack freelancer
And they see at least one clear path to contact within 2 scrolls
```

### Journey 2 — Deep dive (case study)

```gherkin
Given a visitor is on the homepage
When they click a featured case study card
Then they see a dedicated case study page with Problem, Approach, and Outcomes
And they can navigate back to projects or contact
```

### Journey 3 — Contact (lead)

```gherkin
Given a visitor wants to hire Linford
When they click "Email me" in the contact section
Then their email client opens with linfordroyan05@gmail.com pre-filled
And the subject line includes "Freelance inquiry"
```

### Journey 4 — Resume download

```gherkin
Given a recruiter wants the full CV
When they click "Download resume"
Then CV_LINFORDROYAN.pdf downloads or opens
And the file is readable and complete
```

### Journey 5 — Mobile browse

```gherkin
Given a visitor on a 375px-wide mobile device
When they open the site and use the mobile nav
Then all sections are reachable
And text is readable without horizontal scroll
And mailto link works from the contact section
```

---

## Accessibility (WCAG 2.1 AA intent)

| Requirement | Acceptance |
|-------------|------------|
| Color contrast | ≥ 4.5:1 body text; ≥ 3:1 large text (both themes) |
| Keyboard navigation | All interactive elements focusable; visible focus ring |
| Skip link | “Skip to main content” on first Tab |
| Images | Decorative images `alt=""`; meaningful images have alt text |
| Headings | Logical hierarchy (one `h1`, nested `h2`/`h3`) |
| Motion | Respect `prefers-reduced-motion` for animations |
| Theme toggle | Accessible label: “Toggle dark mode” |
| Landmarks | `<header>`, `<main>`, `<footer>`, `<nav>` |

### Testing

- [ ] axe DevTools scan with 0 critical issues
- [ ] Manual keyboard-only navigation of full page
- [ ] VoiceOver or NVDA spot-check on contact section

---

## Performance

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.8s (simulated mobile) |
| Total bundle (initial) | < 500 KB gzipped (goal; PrimeNG may require lazy loading) |
| Images | WebP where possible; lazy load below fold |

### Strategies

- Static prerender for `/` and case study routes
- Lazy-load case study routes if bundle exceeds budget
- Font subsetting; limit font families to 2 (per `ui-ux-pro-max` recommendations)

---

## Analytics

| Item | Decision |
|------|----------|
| Provider | Google Analytics (GA4) |
| Consent | Simple banner: “Accept” / “Decline”; load GA only on accept |
| Events (MVP) | `resume_download`, `mailto_click`, `case_study_view` |
| Privacy | Link to minimal privacy note in footer (optional one-pager) |

### Acceptance criteria

- [ ] GA does not load before consent
- [ ] Consent choice persisted in `localStorage`
- [ ] Analytics works on GitHub Pages (no server required)

---

## SEO (MVP)

| Item | Spec |
|------|------|
| `<title>` | Linford Royan — Senior Angular & Full-Stack Developer |
| Meta description | 7+ years building scalable web apps with Angular, Vue.js, and Node.js. Available for freelance. |
| OG tags | title, description, image (optional headshot later) |
| Structured data | `Person` schema with name, jobTitle, email, url |
| `robots.txt` | Allow all |
| `sitemap.xml` | Home + 3 case study routes |

---

## Cross-browser

| Browser | Version |
|---------|---------|
| Chrome | Latest 2 |
| Firefox | Latest 2 |
| Safari | Latest 2 (iOS + macOS) |
| Edge | Latest 2 |

---

## Launch checklist

- [ ] All 5 golden-path journeys pass manual test
- [ ] Lighthouse ≥ 90 Performance and Accessibility
- [ ] Both themes tested
- [ ] GitHub Pages deploy successful
- [ ] Resume PDF accessible
- [ ] GA consent flow works
- [ ] No console errors on load
- [ ] Case study routes work on direct URL access (prerender)

---

## Post-MVP success signals (track informally)

| Signal | Indicates |
|--------|-------------|
| Inbound emails referencing site | Lead generation working |
| Recruiters mention case studies | Credibility content effective |
| Low bounce on case study pages | Deep content resonates |
