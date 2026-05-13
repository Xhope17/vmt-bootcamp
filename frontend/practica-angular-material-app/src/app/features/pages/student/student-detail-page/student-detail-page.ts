import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { Student } from '../../../interfaces/student';


@Component({
  selector: 'app-student-detail-page',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './student-detail-page.html',
  styleUrl: './student-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailPage implements OnInit {
  private _route = inject(ActivatedRoute);
  private _studentsService = inject(StudentsService);

  student = signal<Student | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(private location: Location) {}

  backClicked() {
    this.location.back();
  }

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
    this.loading.set(true);
    this.error.set('');
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
