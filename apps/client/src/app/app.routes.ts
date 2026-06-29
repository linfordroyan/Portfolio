import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CaseStudy } from './pages/case-study/case-study';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'projects/:slug', component: CaseStudy },
];
