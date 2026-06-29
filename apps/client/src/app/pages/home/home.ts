import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ContentService } from '../../core/services/content';
import { AnalyticsService } from '../../core/services/analytics';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ButtonModule, CardModule, ChipModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly content = inject(ContentService);
  private readonly analytics = inject(AnalyticsService);

  readonly profile = this.content.getProfile();
  readonly services = this.content.getServices();
  readonly skillGroups = this.content.getSkillGroups();
  readonly experience = this.content.getExperience();
  readonly projects = this.content.getProjects();
  readonly featured = this.content.getFeaturedProjects();
  readonly certifications = this.content.getCertifications();
  readonly education = this.content.getEducation();
  readonly testimonials = this.content.getTestimonials();

  readonly mailto =
    'mailto:linfordroyan05@gmail.com?subject=Freelance%20inquiry%20—%20Linfordroyan';

  trackMailto(location: string): void {
    this.analytics.trackEvent('mailto_click', { location });
  }

  trackResume(): void {
    this.analytics.trackEvent('resume_download');
  }
}
