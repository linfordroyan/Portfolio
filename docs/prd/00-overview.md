# PRD — Overview

**Product:** Linfordroyan (freelance portfolio)  
**Author:** Linford Royan  
**Status:** Approved for MVP  
**Last updated:** 2026-06-29

---

## Vision

A professional portfolio site that positions Linford Royan as a **Senior Software Engineer / Technical Lead** available for freelance work. The site must establish credibility through real project history and make it effortless for potential clients to understand services offered and initiate contact.

## Target audience

| Audience | What they need |
|----------|----------------|
| **Hiring managers / tech leads** | Proof of Angular, Vue, and Node.js depth; enterprise-scale delivery |
| **Startup founders** | Fast MVP delivery, architecture ownership, AI-augmented SDD workflow |
| **Agencies / consultancies** | Senior frontend lead who can mentor teams and ship vertical slices |

## Primary goals

1. **Credibility** — showcase 7+ years of experience, leadership, and flagship projects.
2. **Lead generation** — drive visitors to email directly with clear contact details.
3. **Differentiation** — highlight Angular expertise, full-stack capability, and SDD/AI-augmented delivery.

## Success metrics (MVP)

| Metric | Target |
|--------|--------|
| Time to understand services | < 30 seconds on first scroll |
| Contact path clarity | Email visible without hunting; mailto works on mobile |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 (WCAG 2.1 AA intent) |
| Mobile usability | Fully responsive; readable at 320px width |

---

## MVP scope

### In scope

- Single-page or multi-route Angular SPA with static prerender for GitHub Pages
- Sections: Hero, About, Services, Skills, Experience, Featured Case Studies (3), Projects grid, Certifications, Education, Testimonials placeholder, Contact
- Light + dark theme toggle (persisted in `localStorage`)
- PrimeNG components + Tailwind CSS styling
- Resume PDF download (`CV_LINFORDROYAN.pdf`)
- Contact via displayed email/phone + mailto links (no form)
- “Reply within 24 hours” informational copy
- Google Analytics with best-effort cookie consent banner
- English only (i18n deferred)
- Static content in repo (TypeScript/JSON); Strapi migration path documented but not built

### Out of scope (MVP)

| Item | Reason | When |
|------|--------|------|
| Contact form | Replaced by mailto + displayed details | Revisit if conversion is low |
| Strapi CMS | Post-MVP content management | Step 11+ |
| Blog | Content via Strapi later | Post-MVP |
| Real testimonials | Awaiting client quotes | Section shows placeholder |
| Authentication / admin | Public static site | N/A |
| Custom domain | GitHub Pages subdomain first | Post-launch |
| Multi-language | English MVP sufficient | Post-MVP |
| Backend API | Static site | Strapi phase |

---

## Site map

```text
/ (Home)
├── #hero
├── #about
├── #services
├── #skills
├── #experience
├── #projects
│   ├── /projects/financial-mvp-sdd     (case study — deep)
│   ├── /projects/ness-angular-enterprise (case study — deep)
│   └── /projects/getir-logistics        (case study — deep)
├── #certifications
├── #education
├── #testimonials
└── #contact

/assets/CV_LINFORDROYAN.pdf             (resume download)
```

**Navigation:** Sticky header with anchor links; smooth scroll. Case-study detail pages are separate routes with prerendered HTML.

---

## Resolved decisions (from methodology open items)

| Topic | Decision |
|-------|----------|
| Case study depth | 3 deep pages + card grid for Simplilearn & Moonraft |
| Contact method | Email + phone displayed; mailto CTA; no form |
| Hosting | GitHub Pages with static prerender |
| CMS | Strapi post-MVP for blog, projects, testimonials |
| Analytics | Google Analytics + simple consent banner |
| Theme | Light/dark toggle; key `theme` in `localStorage` |
| UI stack | PrimeNG + Tailwind CSS; use `ui-ux-pro-max` skill for design choices |

---

## Content source

Primary source: `CV_LINFORDROYAN.pdf` at repo root.  
Detailed section copy: see `01-content-and-sections.md`.

---

## Delivery alignment

| PRD doc | Covers |
|---------|--------|
| `00-overview.md` | This file — vision, scope, site map |
| `01-content-and-sections.md` | Section-by-section content requirements |
| `02-contact-and-cta.md` | Contact details, CTAs, resume download |
| `03-success-criteria.md` | Golden paths, accessibility, analytics |

**Next phase:** Tech spec (`docs/spec/`) — stack, content model, deployment.
