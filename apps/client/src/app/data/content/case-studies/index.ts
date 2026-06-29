import { CaseStudy } from '../../models';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'financial-mvp-sdd',
    title: 'Financial Domain MVP — Specification-Driven Development',
    company: 'Codecraft Technologies',
    role: 'Technical Lead',
    stack: ['Angular', 'Vue.js', 'Node.js', 'NestJS', 'Claude AI', 'SDD'],
    oneLiner: 'Accelerated financial MVP delivery with SDD and AI-assisted development.',
    featured: true,
    tags: ['Angular', 'SDD', 'AI-augmented', 'MVP'],
    problem:
      'Deliver a financial-domain MVP quickly without sacrificing architecture quality or maintainability.',
    approach:
      'Applied Specification-Driven Development with Claude AI for spec generation and implementation support, with clear boundaries and vertical slices.',
    outcomes: [
      'Accelerated development cycles while maintaining high-quality deliverables',
      'Scalable, maintainable architecture for the financial domain',
      'Improved documentation and stakeholder alignment via PRD-led delivery',
    ],
    responsibilities: [
      'Led architecture decisions across Angular, Vue, and NestJS',
      'Drove SDD workflow and AI-augmented development practices',
      'Mentored team and conducted code reviews',
    ],
    metaTitle: 'Financial MVP with SDD',
    metaDescription:
      'How Linford Royan delivered a financial domain MVP using Specification-Driven Development and AI-assisted tooling.',
  },
  {
    slug: 'ness-angular-enterprise',
    title: 'Enterprise Angular 17 Applications',
    company: 'Ness Digital Engineering',
    role: 'Senior Software Engineer',
    stack: ['Angular 17', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Signals'],
    oneLiner: 'Enterprise-scale Angular apps with design systems and WCAG compliance.',
    featured: true,
    tags: ['Angular', 'Design System', 'WCAG', 'Performance'],
    problem:
      'Scale frontend delivery for enterprise applications with strict performance and accessibility requirements.',
    approach:
      'Built reusable high-performance UI components, advanced state management with RxJS and Signals, and integrated REST APIs with robust error handling.',
    outcomes: [
      'Improved application performance and cross-device responsiveness',
      'Enhanced accessibility aligned with WCAG standards',
      'Faster feature delivery via shared component library',
    ],
    responsibilities: [
      'Led frontend development on Angular 17 applications',
      'Architected reusable UI components',
      'Contributed to technical design reviews and Agile ceremonies',
    ],
    metaTitle: 'Enterprise Angular 17',
    metaDescription:
      'Enterprise Angular 17 delivery with design systems, Signals, and WCAG-aware performance optimization.',
  },
  {
    slug: 'getir-logistics',
    title: 'Delivery Management Dashboards',
    company: 'Getir India',
    role: 'Engineer I',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit'],
    oneLiner: 'High-traffic logistics dashboards for large-scale operational workflows.',
    featured: true,
    tags: ['React', 'Node.js', 'Full-stack', 'Logistics'],
    problem:
      'Operational teams needed responsive dashboards and tools for high-traffic delivery management at scale.',
    approach:
      'Delivered full-stack features with React and Node.js, optimized state management, and built reusable component libraries for consistency.',
    outcomes: [
      'Reduced data-fetch latency through API and frontend optimization',
      'Consistent UI across large-scale logistics workflows',
      'Improved maintainability via modular components',
    ],
    responsibilities: [
      'Developed full-stack features for delivery management systems',
      'Built and consumed RESTful APIs',
      'Participated in performance optimization initiatives',
    ],
    metaTitle: 'Getir Logistics Dashboards',
    metaDescription:
      'Full-stack React and Node.js dashboards for high-traffic logistics operations at Getir India.',
  },
];
