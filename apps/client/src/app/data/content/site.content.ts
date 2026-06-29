import { Certification, Education, SiteConfig } from '../models';

export const CERTIFICATIONS: Certification[] = [
  { id: 'mean', name: 'Angular & NodeJS — The MEAN Stack Guide' },
  { id: 'copilot', name: 'Introduction to GitHub Copilot' },
  { id: 'ms-copilot', name: 'Microsoft Copilot Bootcamp', date: '2025-02-01' },
  { id: 'game-dev', name: 'Introduction to Game Development' },
  { id: 'game-design', name: 'Principles of Game Design' },
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.E. Computer Science',
    institution: 'Visvesvaraya Technological University, India',
    year: 2018,
  },
];

export const SITE_CONFIG: SiteConfig = {
  siteName: 'Linford Royan',
  siteUrl: 'https://linfordroyan.github.io/Portfolio/',
  defaultMetaDescription:
    'Senior Software Engineer with 7+ years building scalable web apps with Angular, Vue.js, and Node.js. Available for freelance.',
};
