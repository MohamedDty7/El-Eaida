import { Routes } from '@angular/router';

export const sharedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent)
      },
      {


      },
    ]
  }
  
]; 