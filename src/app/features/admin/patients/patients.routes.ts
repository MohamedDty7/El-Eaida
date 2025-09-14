import { Routes } from '@angular/router';

export const patientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./patients-list/patients-list.component').then(m => m.PatientsListComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./patients-list/patients-list.component').then(m => m.PatientsListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-patient/add-patient.component').then(m => m.AddPatientComponent)
  }
];