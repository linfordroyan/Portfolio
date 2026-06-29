# PRD — Content & Sections

Section-by-section requirements for the Linfordroyan portfolio MVP.  
Copy tone: **professional, confident, concise** — aimed at technical decision-makers.

---

## 1. Hero

### User story

As a **potential client**, I want to immediately understand who Linford is and what he offers so I can decide whether to explore further.

### Content

| Element | Content |
|---------|---------|
| Name | Linford Royan |
| Title | Senior Software Engineer · Technical Lead |
| Tagline | Architecting scalable web applications with Angular, Vue.js, and Node.js |
| Sub-line | 7+ years · Frontend architecture · Full-stack delivery · SDD & AI-augmented development |
| Primary CTA | “Get in touch” → scroll to `#contact` |
| Secondary CTA | “Download resume” → `CV_LINFORDROYAN.pdf` |
| Location hint | India (available for remote / freelance) |

### Acceptance criteria

- [ ] Name and title visible above the fold on mobile (320px)
- [ ] Both CTAs are keyboard-accessible
- [ ] Hero supports light and dark theme without contrast failures

---

## 2. About

### User story

As a **visitor**, I want a concise professional summary so I understand Linford's background and working style.

### Content (from CV summary — editable)

> Results-driven Senior Software Engineer with 7+ years of experience architecting and delivering scalable, high-availability web applications. Deep expertise in Angular (2–17), React.js, Vue.js, and TypeScript, backed by full-stack capabilities in Node.js and MongoDB. Proven leader in frontend architecture, performance optimization, design systems, and specification-driven delivery. Recognized for technical ownership, cross-functional leadership, and mission-critical solutions that improve performance, reliability, and user experience.

### Optional highlights (3–4 bullets)

- Technical Lead at Codecraft — Angular, Vue, NestJS, monorepo quality initiatives
- SDD + AI-augmented delivery (Claude, Cursor, Copilot) for faster, higher-quality MVPs
- WCAG-aware frontend development with measurable UX improvements
- Mentoring, code reviews, PRD generation, and stakeholder collaboration

### Acceptance criteria

- [ ] Summary ≤ 120 words visible before “read more” (if truncated on mobile)
- [ ] No lorem ipsum; all copy from resume or approved edits

---

## 3. Services

### User story

As a **client evaluating freelancers**, I want to see clear service offerings so I know what I can hire Linford for.

### Service cards (MVP — 4 cards)

| Service | Description | Keywords |
|---------|-------------|----------|
| **Angular development** | Enterprise SPAs, design systems, Signals/RxJS, performance & accessibility | Angular 7–17, TypeScript, PrimeNG |
| **Vue.js applications** | Component architecture, state management, API integration | Vue 3, Composition API |
| **Node.js / NestJS backends** | RESTful APIs, MongoDB, full-stack feature slices | NestJS, Express, MongoDB |
| **Technical leadership** | Architecture, PRD/spec writing, estimation, mentoring, code quality initiatives | SDD, Agile, monorepo |

### Acceptance criteria

- [ ] Each card has icon, title, 2–3 sentence description
- [ ] Angular card is visually primary (featured or first position)

---

## 4. Skills

### User story

As a **recruiter or tech lead**, I want a scannable skills overview grouped by domain.

### Groups (from CV)

| Group | Skills |
|-------|--------|
| **Frontend** | Angular (7–17), React.js, Vue.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, PrimeNG, Angular Material, Bootstrap, Responsive Design |
| **Backend** | Node.js, NestJS, Express.js, RESTful APIs, MongoDB |
| **State & data** | RxJS, Angular Signals, NgRx, Redux Toolkit, Reactive Programming |
| **Leadership** | Solution Design, System Architecture, PRD Generation, Estimation, Mentoring, Code Reviews, Agile/Scrum |
| **AI-assisted dev** | Claude AI, GitHub Copilot, Cursor, SDD, Prompt Engineering |
| **Testing & quality** | Jasmine, Karma, Jest, Unit Testing, Performance Optimization |
| **Tools** | Git, GitHub, Jira, Postman, VS Code, Firebase, Monorepo |
| **Mobile** | Ionic Framework, Flutter (POC) |

### Display

- Tag/chip layout per group; collapsible on mobile optional
- No proficiency bars unless backed by data (avoid subjective ratings)

### Acceptance criteria

- [ ] All CV competency areas represented
- [ ] Group headings are screen-reader friendly (`<h3>` per group)

---

## 5. Experience

### User story

As a **visitor**, I want a chronological work history so I can assess tenure and progression.

### Timeline entries

| Period | Role | Company | Highlights (2–3 bullets max on card) |
|--------|------|---------|--------------------------------------|
| 03/2026 – Present | Technical Lead (Full Stack) | Codecraft Technologies | SDD financial MVP; monorepo quality initiative; PRD/estimation for report platform |
| 01/2024 – 02/2026 | Senior Software Engineer | Ness Digital Engineering | Angular 17 enterprise apps; design system components; WCAG & performance |
| 02/2022 – 01/2024 | Engineer I | Getir India | React/Node logistics dashboards; Redux optimization; high-traffic systems |
| 10/2021 – 02/2022 | SDE III | Simplilearn | Global e-learning Angular apps; RxJS API integration; legacy refactors |
| 08/2018 – 10/2021 | Software Engineer | Moonraft Innovation Labs | Angular/Ionic enterprise apps; Firebase real-time; Flutter POCs |

### Acceptance criteria

- [ ] Reverse chronological order
- [ ] Expandable detail on desktop optional; full bullets on mobile via accordion
- [ ] Company names link to company sites where public (optional, no broken links)

---

## 6. Featured case studies (deep pages)

### User story

As a **client**, I want proof of impact on real projects so I can trust Linford's ability to deliver.

### Case study 1 — Financial MVP with SDD + AI

| Field | Content |
|-------|---------|
| **Slug** | `financial-mvp-sdd` |
| **Title** | Financial Domain MVP — Specification-Driven Development |
| **Company** | Codecraft Technologies |
| **Role** | Technical Lead |
| **Stack** | Angular, Vue.js, Node.js, NestJS, Claude AI, SDD |
| **Problem** | Deliver a financial-domain MVP quickly without sacrificing quality |
| **Approach** | SDD workflow with AI-assisted spec generation and implementation |
| **Outcomes** | Accelerated delivery cycles; maintainable architecture; high-quality deliverables |
| **Tags** | Angular · SDD · AI-augmented · MVP · Architecture |

### Case study 2 — Enterprise Angular at scale

| Field | Content |
|-------|---------|
| **Slug** | `ness-angular-enterprise` |
| **Title** | Enterprise Angular 17 Applications |
| **Company** | Ness Digital Engineering |
| **Role** | Senior Software Engineer |
| **Stack** | Angular 17, Vue.js, TypeScript, Tailwind CSS, Angular Material, RxJS, Signals |
| **Problem** | Scale frontend for enterprise apps with performance and accessibility requirements |
| **Approach** | Reusable component library; advanced state management; WCAG compliance |
| **Outcomes** | Improved performance, accessibility, and cross-device responsiveness |
| **Tags** | Angular · Design System · WCAG · Performance |

### Case study 3 — High-traffic logistics platform

| Field | Content |
|-------|---------|
| **Slug** | `getir-logistics` |
| **Title** | Delivery Management Dashboards |
| **Company** | Getir India |
| **Role** | Engineer I |
| **Stack** | React.js, Node.js, Express.js, MongoDB, Redux Toolkit |
| **Problem** | Operational dashboards for large-scale logistics at high traffic |
| **Approach** | Full-stack features; API optimization; component library; performance refactors |
| **Outcomes** | Reduced data-fetch latency; consistent UI across operational interfaces |
| **Tags** | React · Node.js · Full-stack · Logistics · Scale |

### Case study page template

Each deep page includes:

1. Hero with title, company, role, stack tags
2. Problem → Approach → Outcomes (3 sections)
3. Key responsibilities (bullet list from CV)
4. “Back to projects” link
5. CTA strip: “Interested in similar work? Get in touch” → `#contact`

### Acceptance criteria

- [ ] 3 routable pages with unique meta titles
- [ ] Prerendered static HTML for GitHub Pages
- [ ] No confidential client data beyond public CV content

---

## 7. Projects grid (cards)

### User story

As a **visitor**, I want to see additional projects beyond the 3 featured case studies.

### Card-only projects

| Project | Company | Stack | One-liner |
|---------|---------|-------|-----------|
| Global e-learning platform | Simplilearn | Angular, RxJS | High-engagement learning modules with API integration |
| Enterprise hybrid apps | Moonraft | Angular, Ionic, Firebase | Cross-platform web/mobile with real-time sync |
| Report generation platform | Codecraft | Angular, NestJS | PRD-led platform for stakeholder-driven reporting |
| Monorepo quality initiative | Codecraft | Multi-stack monorepo | Coding standards, refactoring, review processes |

### Acceptance criteria

- [ ] Cards link to case study pages where available; others show summary modal or inline expand
- [ ] Featured 3 cards visually distinguished (“Featured” badge)

---

## 8. Certifications

| Certification |
|---------------|
| Angular & NodeJS — The MEAN Stack Guide |
| Introduction to GitHub Copilot |
| Microsoft Copilot Bootcamp (2025-02-01) |
| Introduction to Game Development |
| Principles of Game Design |

### Acceptance criteria

- [ ] List format; optional icons per cert
- [ ] Dates shown where available

---

## 9. Education

| Degree | Institution | Year |
|--------|-------------|------|
| B.E. Computer Science | Visvesvaraya Technological University, India | 2018 |

---

## 10. Testimonials

### User story

As a **visitor**, I want social proof; as **Linford**, I want a section ready for future quotes.

### MVP behavior

- Section visible in nav and on page
- Placeholder state: “Testimonials coming soon — client feedback will appear here as projects complete.”
- Layout reserves space for 2–3 quote cards (avatar, name, role, company, quote)

### Acceptance criteria

- [ ] Section does not look broken when empty
- [ ] Content model supports adding quotes without layout refactor (post-MVP / Strapi)

---

## 11. Footer

- Copyright © {year} Linford Royan
- Links: GitHub (if provided), LinkedIn (if provided), email mailto
- “Built with Angular” optional subtle credit
