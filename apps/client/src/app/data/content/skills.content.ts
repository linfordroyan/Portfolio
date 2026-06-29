import { SkillGroup } from '../models';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      'Angular (7–17)',
      'React.js',
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'PrimeNG',
      'Responsive Design',
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express.js', 'RESTful APIs', 'MongoDB'],
  },
  {
    id: 'state',
    name: 'State & Data',
    skills: ['RxJS', 'Angular Signals', 'NgRx', 'Redux Toolkit'],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    skills: [
      'Solution Design',
      'System Architecture',
      'PRD Generation',
      'Mentoring',
      'Agile/Scrum',
    ],
  },
  {
    id: 'ai',
    name: 'AI-Assisted Development',
    skills: ['Claude AI', 'GitHub Copilot', 'Cursor', 'SDD'],
  },
  {
    id: 'testing',
    name: 'Testing & Quality',
    skills: ['Jasmine', 'Karma', 'Jest', 'Unit Testing', 'Performance Optimization'],
  },
];
