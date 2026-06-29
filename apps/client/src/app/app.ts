import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { ThemeService } from './core/services/theme';
import { ConsentService } from './core/services/consent';
import { AnalyticsService } from './core/services/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly consentService = inject(ConsentService);
  private readonly analyticsService = inject(AnalyticsService);

  readonly consent = this.consentService.status;

  ngOnInit(): void {
    this.themeService.init();
    this.consentService.init();
    if (this.consentService.status() === 'accepted') {
      this.analyticsService.init();
    }
  }

  acceptAnalytics(): void {
    this.consentService.accept();
    this.analyticsService.init();
  }

  declineAnalytics(): void {
    this.consentService.decline();
  }
}
