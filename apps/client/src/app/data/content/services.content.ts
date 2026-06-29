import { Service } from '../models';

export const SERVICES: Service[] = [
  {
    id: 'angular',
    title: 'Angular Development',
    description:
      'Enterprise SPAs, design systems, Signals/RxJS, performance tuning, and WCAG-aware UI delivery with Angular 7–17.',
    keywords: ['Angular', 'TypeScript', 'PrimeNG'],
    featured: true,
  },
  {
    id: 'vue',
    title: 'Vue.js Applications',
    description:
      'Component architecture, state management, and API integration for maintainable Vue.js applications.',
    keywords: ['Vue.js', 'Composition API'],
  },
  {
    id: 'nodejs',
    title: 'Node.js / NestJS Backends',
    description:
      'RESTful APIs, MongoDB integration, and full-stack vertical slices from database to UI.',
    keywords: ['NestJS', 'Express', 'MongoDB'],
  },
  {
    id: 'leadership',
    title: 'Technical Leadership',
    description:
      'Architecture, PRD/spec writing, estimation, mentoring, and code quality initiatives in Agile teams.',
    keywords: ['SDD', 'Agile', 'Monorepo'],
  },
];
