import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Student } from '../../../interfaces/student';
import { StudentsService } from '../../../services/students.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-student-list-page',
  imports: [MatCardModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './student-list-page.html',
  styleUrl: './student-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListPage implements OnInit {
  private _studentsService = inject(StudentsService);
  loading = signal(false);

  students = signal<Student[]>([]);
  error = signal('');

  search: string = '';
  studentFound: Student | null = null;

  ngOnInit() {
    this.cargarStudents();
  }

  cargarStudents() {
    this.loading.set(true);
    this.error.set('');
    this._studentsService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
        console.log(this.students()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los estudiantes');
        this.loading.set(false);
      },
    });
  }
}
