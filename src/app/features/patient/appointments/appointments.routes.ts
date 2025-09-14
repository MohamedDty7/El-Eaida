import { Routes } from '@angular/router';

export const appointmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
  },
  {
    path: 'my-appointments',
    loadComponent: () => import('./my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
  }
];