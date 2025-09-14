import { Routes } from '@angular/router';

export const medicationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-medications/my-medications.component').then(m => m.MyMedicationsComponent)
  },
  {
    path: 'my-medications',
    loadComponent: () => import('./my-medications/my-medications.component').then(m => m.MyMedicationsComponent)
  }
];