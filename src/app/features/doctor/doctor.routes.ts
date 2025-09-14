import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layout/doctor-layout.component';

export const doctorRoutes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.routes').then(m => m.appointmentsRoutes)
      },
      {
        path: 'medications',
        loadChildren: () => import('./medications/medications.routes').then(m => m.medicationsRoutes)
      },
      {
        path: 'patients',
        loadChildren: () => import('./patients/patients.routes').then(m => m.patientsRoutes)
      }
    ]
  }
];