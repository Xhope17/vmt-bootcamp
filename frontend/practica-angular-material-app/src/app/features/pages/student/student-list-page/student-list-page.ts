import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Student } from '../../../interfaces/student';
import { StudentsService } from '../../../services/students.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Dialog } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';
import { Subject } from 'rxjs';
import { StudentDialog } from '../../../components/student-dialog/student-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-student-list-page',
  imports: [
    MatCardModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './student-list-page.html',
  styleUrl: './student-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListPage implements OnInit {
  private _studentsService = inject(StudentsService);
  loading = signal(false);

  students = signal<Student[]>([]);
  error = signal('');

  studentFound: Student | null = null;
  _dialog = inject(MatDialog);

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

  abrirModal(id: string | null = null) {
    const title = id ? 'Editar Estudiante' : 'Registrar Estudiante';
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '500px',
      disableClose: true,
      data: {
        title: title,
        component: StudentDialog,
        id: id,
        onSave: saveSubject,
        action: "save",
      },
    });
    // Escuchamos cuando el modal se cierre
    dialogRef.afterClosed().subscribe((result) => {
      // Destruimos el canal para no dejar fugas de memoria
      saveSubject.complete();

      // Si el formulario mandó "true" (se guardó con éxito), recargamos la tabla
      if (result) {
        this.cargarStudents();
      }
    });
  }

  eliminarEstudiante(id: string) {
    //abre un modal puede usar el generic dialog pero crea toda la logica aqui yya que no tengo logica en student-dialog quiero decir al generic solo manda el titulo y la id para eliminar o lo que haga falta
    const title = 'Eliminar Estudiante';
    const saveSubject = new Subject<void>();

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '400px',
      data: {
        title: title,
        id: id,
        onSave: saveSubject,
        action: "delete",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result) {
        // Aquí iría la lógica para eliminar el estudiante usando el servicio
        // this._studentsService.delete(id).subscribe(() => {
          this.cargarStudents(); // Recarga la lista después de eliminar
        // });
      }
    });
  }
}
