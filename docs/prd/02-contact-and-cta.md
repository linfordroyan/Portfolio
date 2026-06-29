# PRD — Contact & CTAs

Contact strategy for the Linfordroyan portfolio MVP.

---

## Contact strategy

**No contact form for MVP.** Visitors initiate contact via displayed details and mailto links. Rationale: GitHub Pages is static hosting; a form requires a third-party service or backend. Mailto is zero-dependency and sufficient for early freelance lead generation.

---

## Contact details (canonical)

| Field | Value |
|-------|-------|
| **Name** | Linford Royan |
| **Email** | linfordroyan05@gmail.com |
| **Phone** | +91 7795867758 |
| **Location** | India |
| **Availability** | Freelance / contract — remote-friendly |

---

## Primary CTA — Get in touch

### Location

- Hero section (button)
- Sticky nav (“Contact”)
- End of each case study page
- Contact section (full details)

### Behavior

| Action | Behavior |
|--------|----------|
| “Email me” button | Opens `mailto:linfordroyan05@gmail.com?subject=Freelance%20inquiry%20—%20Linfordroyan` |
| Email text link | Same mailto |
| Phone text link | `tel:+917795867758` |
| “Get in touch” scroll CTA | Smooth scroll to `#contact` |

### Mailto prefill

```
To: linfordroyan05@gmail.com
Subject: Freelance inquiry — Linfordroyan
```

Body prefill optional (keep minimal to avoid client-specific breakage):

```
Hi Linford,

I'm interested in discussing a project.

[Describe your project here]

Best regards,
[Your name]
```

---

## Secondary CTA — Download resume

| Element | Spec |
|---------|------|
| Label | “Download resume” / “Download CV” |
| File | `/assets/CV_LINFORDROYAN.pdf` (or copied to `apps/client/public/` at build) |
| Behavior | `download` attribute or open in new tab |
| Locations | Hero, Contact section, optional nav |

### Acceptance criteria

- [ ] PDF opens/downloads on desktop and mobile
- [ ] File size reasonable (< 2 MB); current CV at repo root is source of truth

---

## Contact section layout

```text
┌─────────────────────────────────────────────┐
│  Let's work together                        │
│                                             │
│  I typically reply within 24 hours.         │
│                                             │
│  ✉  linfordroyan05@gmail.com  [Email me]   │
│  📞  +91 7795867758           [Call]       │
│  📍  India · Remote-friendly               │
│                                             │
│  [Download resume]                          │
└─────────────────────────────────────────────┘
```

### Copy

| Element | Text |
|---------|------|
| Heading | Let's work together |
| Subheading | Have a project in mind? I'd love to hear about it. |
| Response time | I typically reply within **24 hours**. |
| Email prompt | Prefer email? Click below or write to linfordroyan05@gmail.com |

---

## CTA hierarchy

| Priority | CTA | Placement |
|----------|-----|-----------|
| 1 | Get in touch (scroll) | Hero |
| 2 | Email me (mailto) | Contact section |
| 3 | Download resume | Hero + Contact |
| 4 | View projects | Hero optional secondary |

---

## Out of scope

| Item | Notes |
|------|-------|
| Contact form | Revisit post-MVP if mailto conversion is insufficient |
| Calendly embed | Optional future enhancement |
| Live chat | Not planned |
| CAPTCHA / spam protection | N/A without form |

---

## Accessibility

- [ ] Mailto and tel links have descriptive accessible names (not just “click here”)
- [ ] Contact section reachable via keyboard from nav
- [ ] Phone number formatted for screen readers (`+91` read correctly)
- [ ] Color contrast meets WCAG 2.1 AA in both themes
