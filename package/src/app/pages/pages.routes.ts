import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: 'data-classifiers',
    loadChildren: () => import('./data-classifiers/data-classifiers.routes').then(m => m.DataClassifiersRoutes),
  },
];
