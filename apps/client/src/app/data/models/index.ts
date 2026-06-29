export interface Profile {
  name: string;
  title: string;
  tagline: string;
  subline: string;
  location: string;
  email: string;
  phone: string;
  phoneTel: string;
  summary: string;
  highlights: string[];
  resumePath: string;
  responseTimeCopy: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  role: string;
  stack: string[];
  oneLiner: string;
  featured: boolean;
  tags: string[];
}

export interface CaseStudy extends Project {
  problem: string;
  approach: string;
  outcomes: string[];
  responsibilities: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Certification {
  id: string;
  name: string;
  date?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatarUrl?: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultMetaDescription: string;
  linkedInUrl?: string;
  githubUrl?: string;
}
