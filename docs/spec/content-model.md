# Tech Spec — Content Model

Static content shapes for MVP. Interfaces double as **Strapi migration contracts** — field names should align with future CMS content types.

---

## Design principles

1. **Single source of truth** — `apps/client/src/app/data/` holds typed content files.
2. **Slug-based routing** — projects and case studies keyed by `slug` string.
3. **Immutable at runtime** — content loaded synchronously from imports (tree-shakeable).
4. **CMS-ready** — each interface documents the future Strapi content-type name.

---

## Core types

```typescript
// apps/client/src/app/data/models/profile.model.ts

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  subline: string;
  location: string;
  email: string;
  phone: string;           // E.164 display: +91 7795867758
  phoneTel: string;        // tel: link: +917795867758
  summary: string;
  highlights: string[];
  resumePath: string;      // /assets/CV_LINFORDROYAN.pdf
  responseTimeCopy: string; // "I typically reply within 24 hours."
}

// Strapi future type: profile (single type)
```

```typescript
// apps/client/src/app/data/models/service.model.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  featured?: boolean;      // true for Angular card
}

// Strapi future type: service (collection)
```

```typescript
// apps/client/src/app/data/models/skill-group.model.ts

export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}

// Strapi future type: skill-group (collection)
```

```typescript
// apps/client/src/app/data/models/experience.model.ts

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;       // ISO: 2026-03
  endDate: string | null;  // null = present
  highlights: string[];
}

// Strapi future type: experience (collection)
```

```typescript
// apps/client/src/app/data/models/project.model.ts

export interface Project {
  slug: string;
  title: string;
  company: string;
  role: string;
  stack: string[];
  oneLiner: string;
  featured: boolean;       // true → deep case study page exists
  tags: string[];
}

// Strapi future type: project (collection)
```

```typescript
// apps/client/src/app/data/models/case-study.model.ts

export interface CaseStudy extends Project {
  problem: string;
  approach: string;
  outcomes: string[];
  responsibilities: string[];
  metaTitle: string;
  metaDescription: string;
}

// Strapi future type: case-study (collection, extends project)
// Strapi relation: case-study → project (1:1 for featured items)
```

```typescript
// apps/client/src/app/data/models/certification.model.ts

export interface Certification {
  id: string;
  name: string;
  date?: string;           // ISO date optional
}

// Strapi future type: certification (collection)
```

```typescript
// apps/client/src/app/data/models/education.model.ts

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

// Strapi future type: education (collection or component)
```

```typescript
// apps/client/src/app/data/models/testimonial.model.ts

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatarUrl?: string;
}

// Strapi future type: testimonial (collection)
// MVP: empty array; UI shows placeholder when length === 0
```

```typescript
// apps/client/src/app/data/models/site-config.model.ts

export interface SiteConfig {
  siteName: string;
  siteUrl: string;         // https://{user}.github.io/{repo}/
  defaultMetaDescription: string;
  ogImage?: string;
  linkedInUrl?: string;
  githubUrl?: string;
}

// Strapi future type: site-config (single type)
```

---

## File layout

```text
apps/client/src/app/data/
├── models/
│   ├── profile.model.ts
│   ├── service.model.ts
│   ├── skill-group.model.ts
│   ├── experience.model.ts
│   ├── project.model.ts
│   ├── case-study.model.ts
│   ├── certification.model.ts
│   ├── education.model.ts
│   ├── testimonial.model.ts
│   └── site-config.model.ts
├── content/
│   ├── profile.content.ts
│   ├── services.content.ts
│   ├── skills.content.ts
│   ├── experience.content.ts
│   ├── projects.content.ts
│   ├── case-studies/
│   │   ├── financial-mvp-sdd.content.ts
│   │   ├── ness-angular-enterprise.content.ts
│   │   └── getir-logistics.content.ts
│   ├── certifications.content.ts
│   ├── education.content.ts
│   ├── testimonials.content.ts   # export const TESTIMONIALS: Testimonial[] = []
│   └── site-config.content.ts
└── content.service.ts              # aggregates all content
```

---

## ContentService API

```typescript
@Injectable({ providedIn: 'root' })
export class ContentService {
  getProfile(): Profile;
  getServices(): Service[];
  getSkillGroups(): SkillGroup[];
  getExperience(): Experience[];
  getProjects(): Project[];
  getFeaturedProjects(): Project[];
  getCaseStudy(slug: string): CaseStudy | undefined;
  getCaseStudySlugs(): string[];
  getCertifications(): Certification[];
  getEducation(): Education[];
  getTestimonials(): Testimonial[];
  getSiteConfig(): SiteConfig;
}
```

### CaseStudyService

```typescript
@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  getBySlug(slug: string): CaseStudy | null;
  getAllSlugs(): string[];
}
```

**404 behavior:** `CaseStudyComponent` calls resolver; unknown slug → navigate to `/` with optional toast, or dedicated `NotFoundComponent` (prerender `/404` optional).

---

## Seed data — case study slugs

| slug | maps to PRD case study |
|------|------------------------|
| `financial-mvp-sdd` | Codecraft financial MVP |
| `ness-angular-enterprise` | Ness Angular 17 |
| `getir-logistics` | Getir delivery dashboards |

---

## Strapi migration contract

When Strapi is introduced (step 11+):

| Static method | Future endpoint |
|---------------|-----------------|
| `getProfile()` | `GET /api/profile?populate=*` |
| `getServices()` | `GET /api/services` |
| `getProjects()` | `GET /api/projects?populate=case_study` |
| `getCaseStudy(slug)` | `GET /api/case-studies?filters[slug][$eq]={slug}` |
| `getTestimonials()` | `GET /api/testimonials` |

**Adapter pattern:**

```typescript
interface ContentProvider {
  getProfile(): Observable<Profile>;
  // ...
}

// StaticContentProvider  — MVP
// StrapiContentProvider  — post-MVP
```

Swap provider in `app.config.ts` without changing components.

---

## Meta / SEO per route

| Route | `metaTitle` source |
|-------|-------------------|
| `/` | `SiteConfig.siteName + default description` |
| `/projects/:slug` | `CaseStudy.metaTitle` |

Use Angular `Title` and `Meta` services in route resolvers or component `ngOnInit`.

---

## Structured data

Inject JSON-LD for `Person` schema on home page from `Profile` + `SiteConfig`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Linford Royan",
  "jobTitle": "Senior Software Engineer",
  "email": "linfordroyan05@gmail.com",
  "url": "{siteUrl}"
}
```

---

## Validation rules

| Field | Rule |
|-------|------|
| `slug` | kebab-case; unique; matches route param |
| `email` | valid email format |
| `phoneTel` | digits only after `+` for `tel:` href |
| `featured` | if `true`, matching `CaseStudy` must exist |
| `endDate` | `null` displays as "Present" |
