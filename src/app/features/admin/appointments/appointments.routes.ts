import { Routes } from '@angular/router';

export const appointmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./appointments-list/appointments-list.component').then(m => m.AppointmentsListComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./appointments-list/appointments-list.component').then(m => m.AppointmentsListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-appointment/add-appointment.component').then(m => m.AddAppointmentComponent)
  }
];

