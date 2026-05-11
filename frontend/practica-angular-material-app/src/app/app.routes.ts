import { Routes } from '@angular/router';
import { DashboardPage } from './features/pages/dashboard-page/dashboard-page';
import { StudentListPage } from './features/pages/student/student-list-page/student-list-page';
import { StudentDetailPage } from './features/pages/student/student-detail-page/student-detail-page';
import { CourseListPage } from './features/pages/course/course-list-page/course-list-page';
import { HomePage } from './features/pages/home-page/home-page';
import { CourseDetailPage } from './features/pages/course/course-detail-page/course-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        component: HomePage,
        pathMatch: 'full',
      },
      { path: 'students', component: StudentListPage },
      { path: 'students/:id', component: StudentDetailPage },
      { path: 'courses', component: CourseListPage },
      { path: 'courses/:id', component: CourseDetailPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
