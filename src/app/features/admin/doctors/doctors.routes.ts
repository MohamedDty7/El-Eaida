import { Routes } from '@angular/router';

export const doctorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./doctors-list/doctors-list.component').then(m => m.DoctorsListComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./doctors-list/doctors-list.component').then(m => m.DoctorsListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-doctor/add-doctor.component').then(m => m.AddDoctorComponent)
  }
];