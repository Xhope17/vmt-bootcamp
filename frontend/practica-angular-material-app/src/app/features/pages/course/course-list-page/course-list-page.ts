import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../../../interfaces/course';
import { CoursesService } from '../../../services/courses.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-list-page',
  imports: [MatCardModule, RouterLink],
  templateUrl: './course-list-page.html',
  styleUrl: './course-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListPage implements OnInit {
  private _coursesService = inject(CoursesService);
  loading = signal(false);

  courses = signal<Course[]>([]);
  error = signal('');

  ngOnInit() {
    this.cargarCourses();
  }

  cargarCourses() {
    this.loading.set(true);
    this.error.set('');
    this._coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.loading.set(false);
        console.log(this.courses()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los cursos');
        this.loading.set(false);
      },
    });
  }
}
