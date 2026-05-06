import { Routes } from '@angular/router';
import { ClinicManagementLayout } from './layouts/clinic-management-layout/clinic-management-layout';
import { HomePage } from './pages/home-page/home-page';
import { PatientsPage } from './pages/patients-page/patients-page';
import { DoctorsPage } from './pages/doctors-page/doctors-page';

export const routes: Routes = [
  {
    path: '',
    component: ClinicManagementLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      { path: 'patients', component: PatientsPage },
      { path: 'doctors', component: DoctorsPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
