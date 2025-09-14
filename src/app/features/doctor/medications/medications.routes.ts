import { Routes } from '@angular/router';

export const medicationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./medications-list/medications-list.component').then(m => m.MedicationsListComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./medications-list/medications-list.component').then(m => m.MedicationsListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-medication/add-medication.component').then(m => m.AddMedicationComponent)
  }
];