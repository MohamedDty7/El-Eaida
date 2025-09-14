import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./general-settings/general-settings.component').then(m => m.GeneralSettingsComponent)
  },
  {
    path: 'general',
    loadComponent: () => import('./general-settings/general-settings.component').then(m => m.GeneralSettingsComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent)
  }
];