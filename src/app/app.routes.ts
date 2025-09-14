import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'doctor',
    loadChildren: () => import('./features/doctor/doctor.routes').then(m => m.doctorRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'receptionist',
    loadChildren: () => import('./features/receptionist/receptionist.routes').then(m => m.receptionistRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.routes').then(m => m.patientRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
