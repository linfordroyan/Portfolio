import { Injectable } from '@angular/core';
import {
  CaseStudy,
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  Service,
  SiteConfig,
  SkillGroup,
  Testimonial,
} from '../../data/models';
import { PROFILE } from '../../data/content/profile.content';
import { SERVICES } from '../../data/content/services.content';
import { SKILL_GROUPS } from '../../data/content/skills.content';
import { EXPERIENCE } from '../../data/content/experience.content';
import { PROJECTS } from '../../data/content/projects.content';
import { CASE_STUDIES } from '../../data/content/case-studies';
import {
  CERTIFICATIONS,
  EDUCATION,
  SITE_CONFIG,
} from '../../data/content/site.content';
import { TESTIMONIALS } from '../../data/content/testimonials.content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  getProfile(): Profile {
    return PROFILE;
  }

  getServices(): Service[] {
    return SERVICES;
  }

  getSkillGroups(): SkillGroup[] {
    return SKILL_GROUPS;
  }

  getExperience(): Experience[] {
    return EXPERIENCE;
  }

  getProjects(): Project[] {
    return PROJECTS;
  }

  getFeaturedProjects(): Project[] {
    return PROJECTS.filter((p) => p.featured);
  }

  getCaseStudy(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((c) => c.slug === slug);
  }

  getCaseStudySlugs(): string[] {
    return CASE_STUDIES.map((c) => c.slug);
  }

  getCertifications(): Certification[] {
    return CERTIFICATIONS;
  }

  getEducation(): Education[] {
    return EDUCATION;
  }

  getTestimonials(): Testimonial[] {
    return TESTIMONIALS;
  }

  getSiteConfig(): SiteConfig {
    return SITE_CONFIG;
  }
}
