import { Routes } from '@angular/router';
import { DataClassifiersComponent } from './data-classifiers.component';

export const DataClassifiersRoutes: Routes = [
  {
    path: '',
    component: DataClassifiersComponent,
    data: {
      title: 'Data Classifiers',
      urls: [
        { title: 'Data' },
        { title: 'Data Classifiers' },
      ],
    },
  },
];

