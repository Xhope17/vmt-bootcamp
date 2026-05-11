import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-student-detail-page',
  imports: [],
  templateUrl: './student-detail-page.html',
  styleUrl: './student-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailPage implements OnInit {
  private _route = inject(ActivatedRoute);
  private _studentsService = inject(StudentsService); // Usa el nombre de tu servicio

  student = signal<any | null>(null); // Cambia "any" por tu interfaz Student
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    const idParam = this._route.snapshot.paramMap.get('id');

    if (idParam) {
      this.buscarEstudiante(idParam);
    } else {
      this.error.set('No se proporcionó un ID válido en la URL');
      this.loading.set(false);
    }
  }

  buscarEstudiante(id: string) {
    this._studentsService.getById(id).subscribe({
      next: (data) => {
        this.student.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la información del estudiante');
        this.loading.set(false);
      },
    });
  }
}
