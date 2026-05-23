import { Routes } from '@angular/router';
import { PublicLayout } from './core/layouts/public/public-layout/public-layout';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailComponent } from './features/pages/public/product-detail-component/product-detail-component';

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
      { path: 'products/:id', component: ProductDetailComponent },

      {
        path: 'about',
        loadComponent: () =>
          import('./features/pages/public/about-us-component/about-us-component').then(
            (m) => m.AboutUsComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/pages/public/contact-us-component/contact-us-component').then(
            (m) => m.ContactUsComponent,
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
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/pages/private/cart-management-component/cart-management-component').then(
            (m) => m.CartManagementComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
