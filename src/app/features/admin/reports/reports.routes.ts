import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reports-dashboard/reports-dashboard.component').then(m => m.ReportsDashboardComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./reports-dashboard/reports-dashboard.component').then(m => m.ReportsDashboardComponent)
  },
  {
    path: 'appointments',
    loadComponent: () => import('./appointments-report/appointments-report.component').then(m => m.AppointmentsReportComponent)
  },
  {
    path: 'patients',
    loadComponent: () => import('./patients-report/patients-report.component').then(m => m.PatientsReportComponent)
  },
  {
    path: 'financial',
    loadComponent: () => import('./financial-report/financial-report.component').then(m => m.FinancialReportComponent)
  }
];

