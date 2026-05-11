import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-course-detail-page',
  imports: [],
  templateUrl: './course-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailPage implements OnInit {
  private _route = inject(ActivatedRoute);
  private _coursesService = inject(CoursesService); // Usa el nombre de tu servicio

  course = signal<any | null>(null); // Cambia "any" por tu interfaz CourseDetailPage
  loading = signal(true);
  error = signal('');

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
