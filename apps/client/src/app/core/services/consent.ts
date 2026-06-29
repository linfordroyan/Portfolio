import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ConsentStatus = 'accepted' | 'declined' | null;

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'analytics_consent';
  private readonly statusSignal = signal<ConsentStatus>(null);

  readonly status = computed(() => this.statusSignal());

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const saved = localStorage.getItem(this.storageKey) as ConsentStatus;
    if (saved === 'accepted' || saved === 'declined') {
      this.statusSignal.set(saved);
    }
  }

  hasAnswered(): boolean {
    return this.statusSignal() !== null;
  }

  accept(): void {
    this.statusSignal.set('accepted');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, 'accepted');
    }
  }

  decline(): void {
    this.statusSignal.set('declined');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, 'declined');
    }
  }
}
