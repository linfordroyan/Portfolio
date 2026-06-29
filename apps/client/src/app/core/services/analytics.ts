import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private loaded = false;

  init(): void {
    if (this.loaded || !environment.gaMeasurementId || environment.gaMeasurementId === 'G-XXXXXXXX') {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaMeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', environment.gaMeasurementId, { anonymize_ip: true });

    this.loaded = true;
  }

  trackEvent(name: string, params?: Record<string, string>): void {
    if (!this.loaded || !window.gtag) {
      return;
    }
    window.gtag('event', name, params);
  }
}
