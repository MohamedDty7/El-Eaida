import { Routes } from '@angular/router';
import { PatientLayoutComponent } from './layout/patient-layout.component';

export const patientRoutes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.routes').then(m => m.appointmentsRoutes)
      },
      {
        path: 'medications',
        loadChildren: () => import('./medications/medications.routes').then(m => m.medicationsRoutes)
      }
    ]
  }
];
