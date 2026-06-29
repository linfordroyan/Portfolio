# Tech Spec — Analytics

Google Analytics 4 with consent-gated loading.

---

## Requirements (from PRD)

- GA4 for traffic and CTA tracking
- No tracking before user consent
- Consent choice persisted
- Works on static GitHub Pages (no server)

---

## Configuration

| Item | Value |
|------|-------|
| Provider | Google Analytics 4 |
| Measurement ID | `G-XXXXXXXX` via `environment.prod.ts` or CI secret |
| Consent storage key | `analytics_consent` |
| Consent values | `'accepted'` \| `'declined'` \| unset |

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  gaMeasurementId: 'G-XXXXXXXX',  // replaced at CI from secret
};
```

---

## ConsentService

```typescript
type ConsentStatus = 'accepted' | 'declined' | null;

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly KEY = 'analytics_consent';

  status(): Signal<ConsentStatus>;
  accept(): void;
  decline(): void;
  hasAnswered(): boolean;
}
```

On `accept()` → persist → call `AnalyticsService.init()`.  
On `decline()` → persist → ensure GA not loaded.

---

## AnalyticsService

```typescript
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private loaded = false;

  /** Load gtag script once after consent */
  init(): void;

  /** Track custom events */
  trackEvent(name: string, params?: Record<string, string>): void;
}
```

### Script injection (after consent only)

```typescript
init(): void {
  if (this.loaded || !environment.gaMeasurementId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaMeasurementId}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: unknown[]) { (window as any).dataLayer.push(args); }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', environment.gaMeasurementId, { anonymize_ip: true });

  this.loaded = true;
}
```

If `gaMeasurementId` is empty, service no-ops (local dev).

---

## Consent banner component

```text
┌────────────────────────────────────────────────────────────┐
│  We use cookies for analytics to improve this site.        │
│  [Accept]  [Decline]                                       │
└────────────────────────────────────────────────────────────┘
```

| Behavior | Spec |
|----------|------|
| Show when | `analytics_consent` not set |
| Position | Fixed bottom bar; `z-50` |
| Dismiss | On Accept or Decline |
| Re-open | Not required for MVP |
| Keyboard | Buttons focusable; Escape does not dismiss without choice |

Use PrimeNG `p-button` for actions.

---

## Tracked events (MVP)

| Event name | Trigger | Params |
|------------|---------|--------|
| `mailto_click` | Email CTA clicked | `location: hero \| contact \| case_study` |
| `resume_download` | Resume link clicked | — |
| `case_study_view` | Case study page loaded | `slug: string` |
| `phone_click` | tel: link clicked | — |
| `theme_toggle` | Theme switched | `theme: light \| dark` |

```typescript
trackEvent('mailto_click', { location: 'contact' });
```

### Case study page view

Fire in `CaseStudyComponent.ngOnInit` after consent check, or use GA automatic page_view if gtag config handles route changes. For prerendered static pages, manual event on component init is reliable.

---

## App bootstrap flow

```text
App start
  → ConsentService reads localStorage
  → if accepted → AnalyticsService.init()
  → if unset → show ConsentBanner
  → if declined → no GA
```

---

## Privacy

| Item | MVP approach |
|------|--------------|
| IP anonymization | `anonymize_ip: true` in gtag config |
| Privacy policy | Optional footer link; one paragraph sufficient for MVP |
| GDPR | Best-effort consent banner; not legal advice |

Footer copy example: “This site uses Google Analytics with your consent. No personal data is sold.”

---

## Development

| Environment | GA loaded? |
|-------------|------------|
| `environment.ts` (dev) | No — empty measurement ID |
| `environment.prod.ts` | Only after consent |

Never load GA in unit tests. Mock `AnalyticsService` in specs.

---

## CI / secrets

```yaml
# deploy.yml build step
env:
  GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
```

Replace placeholder in environment file at build:

```bash
sed -i "s/G-XXXXXXXX/${GA_MEASUREMENT_ID}/" src/environments/environment.prod.ts
```

Or use `fileReplacements` with a generated file.

---

## Acceptance criteria

- [ ] GA network requests absent before Accept
- [ ] GA loads after Accept; persists across sessions
- [ ] Decline prevents GA for session + future visits
- [ ] Events fire for mailto, resume, case study views
- [ ] No console errors when measurement ID empty (dev)
