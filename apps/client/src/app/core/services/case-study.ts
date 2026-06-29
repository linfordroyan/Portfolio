import { Injectable } from '@angular/core';
import { CaseStudy } from '../../data/models';
import { ContentService } from './content';

@Injectable({
  providedIn: 'root',
})
export class CaseStudyService {
  constructor(private readonly content: ContentService) {}

  getBySlug(slug: string): CaseStudy | null {
    return this.content.getCaseStudy(slug) ?? null;
  }

  getAllSlugs(): string[] {
    return this.content.getCaseStudySlugs();
  }
}
