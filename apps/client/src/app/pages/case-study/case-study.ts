import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { CaseStudyService } from '../../core/services/case-study';
import { CaseStudy as CaseStudyModel } from '../../data/models';
import { AnalyticsService } from '../../core/services/analytics';
import { ContentService } from '../../core/services/content';

@Component({
  selector: 'app-case-study',
  imports: [RouterLink, ButtonModule, ChipModule, CardModule],
  templateUrl: './case-study.html',
  styleUrl: './case-study.scss',
})
export class CaseStudy implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly caseStudyService = inject(CaseStudyService);
  private readonly title = inject(Title);
  private readonly analytics = inject(AnalyticsService);
  private readonly content = inject(ContentService);

  study: CaseStudyModel | null = null;
  readonly mailto =
    'mailto:linfordroyan05@gmail.com?subject=Freelance%20inquiry%20—%20Linfordroyan';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.study = this.caseStudyService.getBySlug(slug);
    if (!this.study) {
      void this.router.navigate(['/']);
      return;
    }
    this.title.setTitle(`${this.study.metaTitle} | ${this.content.getSiteConfig().siteName}`);
    this.analytics.trackEvent('case_study_view', { slug });
  }
}
