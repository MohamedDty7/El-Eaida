import { Routes } from '@angular/router';
import { ReceptionistLayoutComponent } from './layout/receptionist-layout.component';

export const receptionistRoutes: Routes = [
  {
    path: '',
    component: ReceptionistLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/receptionist-dashboard.component').then(m => m.ReceptionistDashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/receptionist-dashboard.component').then(m => m.ReceptionistDashboardComponent)
      },
      {
        path: 'patients',
        loadChildren: () => import('./patients/patients.routes').then(m => m.patientsRoutes)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.routes').then(m => m.appointmentsRoutes)
      }
    ]
  }
];