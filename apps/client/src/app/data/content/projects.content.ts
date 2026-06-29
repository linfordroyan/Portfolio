import { Project } from '../models';
import { CASE_STUDIES } from './case-studies';

export const PROJECTS: Project[] = [
  ...CASE_STUDIES,
  {
    slug: 'simplilearn-elearning',
    title: 'Global E-Learning Platform',
    company: 'Simplilearn',
    role: 'SDE III',
    stack: ['Angular', 'RxJS'],
    oneLiner: 'High-engagement learning modules with robust API integration.',
    featured: false,
    tags: ['Angular', 'E-learning'],
  },
  {
    slug: 'moonraft-hybrid',
    title: 'Enterprise Hybrid Applications',
    company: 'Moonraft Innovation Labs',
    role: 'Software Engineer',
    stack: ['Angular', 'Ionic', 'Firebase'],
    oneLiner: 'Cross-platform web/mobile apps with real-time Firebase sync.',
    featured: false,
    tags: ['Angular', 'Ionic', 'Firebase'],
  },
];
