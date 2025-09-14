import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'patients',
        loadChildren: () => import('./patients/patients.routes').then(m => m.patientsRoutes)
      },
      {
        path: 'doctors',
        loadChildren: () => import('./doctors/doctors.routes').then(m => m.doctorsRoutes)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.routes').then(m => m.settingsRoutes)
      }
    ]
  }
];
