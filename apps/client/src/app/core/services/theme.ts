import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'theme';
  private readonly themeSignal = signal<Theme>('light');

  readonly theme = computed(() => this.themeSignal());

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme: Theme = saved ?? (systemDark ? 'dark' : 'light');
    this.apply(theme, false);
  }

  toggle(): void {
    const next: Theme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.apply(next, true);
  }

  private apply(theme: Theme, persist: boolean): void {
    this.themeSignal.set(theme);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem(this.storageKey, theme);
    }
  }
}
