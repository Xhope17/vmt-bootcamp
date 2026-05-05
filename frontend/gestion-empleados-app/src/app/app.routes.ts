import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { EmployeePage } from './pages/employee-page/employee-page';
import { ManagementLayout } from './layouts/management-layout/management-layout';

export const routes: Routes = [
  {
    path: '',
    component: ManagementLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      { path: 'employees', component: EmployeePage },
      { path: 'departments', component: EmployeePage },
    ],
  },
  { path: '**', redirectTo: '' },
];
