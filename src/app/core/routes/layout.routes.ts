import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../../features/admin/admin.routes').then(m => m.adminRoutes)
      },
      {
        path: 'doctor',
        loadChildren: () => import('../../features/doctor/doctor.routes').then(m => m.doctorRoutes)
      },
      {
        path: 'receptionist',
        loadChildren: () => import('../../features/receptionist/receptionist.routes').then(m => m.receptionistRoutes)
      },
      {
        path: 'patient',
        loadChildren: () => import('../../features/patient/patient.routes').then(m => m.patientRoutes)
      }
    ]
  }
];
