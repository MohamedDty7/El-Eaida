import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./print-reports/print-reports.component').then(m => m.PrintReportsComponent)
  },
  {
    path: 'print',
    loadComponent: () => import('./print-reports/print-reports.component').then(m => m.PrintReportsComponent)
  }
];









