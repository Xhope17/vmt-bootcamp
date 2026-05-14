import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from '../../services/students.service';
import { Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

interface GenericDialogData {
  title: string; // Obligatorio
  component?: Type<unknown>; // Tipado estricto para componentes de Angular
  message?: string; // Opcional
  subMessage?: string; // Opcional
  btnText?: string; // Opcional
  btnColor?: 'primary' | 'accent' | 'warn'; // Solo acepta colores nativos de Material
  action?: 'save' | 'delete' | 'edit'; // Restringido a acciones específicas
  id?: string | null; // Opcional
  onSave?: Subject<void>; // Tipado correcto del canal de RxJS
}

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './student-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDialog implements OnInit {
  private _fb = inject(FormBuilder);
  private _studentsService = inject(StudentsService);
  private _snackBar = inject(MatSnackBar);
  private _dialogRef = inject(MatDialogRef<any>);
  public data = inject<GenericDialogData>(MAT_DIALOG_DATA);

  loading = signal(false);

  studentForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    avatar: [''], // Opcional
    courseId: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.data?.onSave) {
      this.data.onSave.subscribe(() => {
        if (this.data?.action === 'delete') {
          this.eliminarEstudiante();
        } else {
          this.guardar();
        }
      });
    }

    if (this.data?.action == 'edit') {
      console.log('Editando estudiante...');
      this.cargarDatos(this.data.id ?? '');
    } else if (this.data?.action == 'save') {
      console.log('Guardando estudiante...');
    } else if (this.data?.action == 'delete') {
      console.log('Eliminando estudiante...');
    }
  }

  cargarDatos(id: string) {
    this.loading.set(true);
    this._studentsService.getById(id).subscribe({
      next: (student) => {
        // Llenamos el formulario con los datos del backend
        this.studentForm.patchValue(student);
        this.loading.set(false);
      },
      error: () => {
        this._snackBar.open('Error al obtener los datos', 'Cerrar');
        this.loading.set(false);
      },
    });
  }

  guardar() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const payload = this.studentForm.value;
    const id = this.data?.id; //si es editar

    const request = id //si hay id se actualiza
      ? this._studentsService.update(id, payload)
      : this._studentsService.create(payload);

    request.subscribe({
      next: () => {
        this._snackBar.open(`Estudiante ${id ? 'actualizado' : 'creado'} con éxito`, 'OK', {
          duration: 3000,
        });
        // Cerramos el modal avisando que fue exitoso
        this._dialogRef.close(true);
      },
      error: (err) => {
        this._snackBar.open('Error al procesar la solicitud', 'Cerrar');
        this.loading.set(false);
      },
    });
  }

  eliminarEstudiante() {
    const id = this.data?.id;
    if (!id) {
      this._snackBar.open('ID de estudiante no válido', 'Cerrar');
      return;
    }

    this.loading.set(true);
    this._studentsService.delete(id).subscribe({
      next: () => {
        this._snackBar.open('Estudiante eliminado con éxito', 'OK', { duration: 3000 });
        this._dialogRef.close(true);
        console.log('se eliminó correctamente');
      },
      error: () => {
        this._snackBar.open('Error al eliminar', 'Cerrar');
        this.loading.set(false);
        console.log('error al eliminar student-dialog');
      },
    });
  }
}
