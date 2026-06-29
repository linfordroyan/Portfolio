import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'financial-mvp-sdd' },
        { slug: 'ness-angular-enterprise' },
        { slug: 'getir-logistics' },
      ];
    },
  },
];
