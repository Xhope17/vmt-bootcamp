import { Routes } from '@angular/router';
import { PublicLayout } from './core/layouts/public/public-layout/public-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/public/home-component/home-component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/public/catalog-component/catalog-component').then(
            (m) => m.CatalogComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/pages/private/login-component/login-component').then(
            (m) => m.LoginComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layouts/private/private-layout/private-layout').then((m) => m.PrivateLayout),
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/pages/private/dashboard-component/dashboard-component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/private/product-management-component/product-management-component').then(
            (m) => m.ProductManagementComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
