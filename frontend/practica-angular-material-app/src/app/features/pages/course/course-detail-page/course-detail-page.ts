import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../../interfaces/course';

@Component({
  selector: 'app-course-detail-page',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './course-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailPage implements OnInit {
  private _route = inject(ActivatedRoute);
  private _coursesService = inject(CoursesService);

  course = signal<Course | null>(null);
  loading = signal(true);
  error = signal('');

  //método para volver a la pagina anterior
  constructor(private location: Location) {}

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    const idParam = this._route.snapshot.paramMap.get('id');

    if (idParam) {
      this.buscarCurso(idParam);
    } else {
      this.error.set('No se proporcionó un ID válido en la URL');
      this.loading.set(false);
    }
  }

  buscarCurso(id: string) {
    this._coursesService.getById(id).subscribe({
      next: (data) => {
        this.course.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la información del curso');
        this.loading.set(false);
      },
    });
  }
}
