import { Doctors } from './../../interfaces/doctors';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './doctors-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsPage implements OnInit {
  private _doctorsService = inject(DoctorsService);
  doctors = signal<Doctors[]>([]);
  loading = signal(false);
  error = signal('');

  search: string = '';
  doctorFound: Doctors | null = null;

  ngOnInit() {
    this.cargarDoctores();
  }

  cargarDoctores() {
    this.loading.set(true);
    this.error.set('');
    this._doctorsService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
        this.loading.set(false);
        console.log(this.doctors()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los doctores');
        this.loading.set(false);
      },
    });
  }

  buscarDoctor(id: string) {
    const doctor = this.doctors().find((d) => d.id === id);
    if (doctor) {
      this.doctorFound = doctor;
    } else {
      this.doctorFound = null;
      console.log('Doctor no encontrado');
    }
  }

  agregarDoctor() {
    const payload: Partial<Doctors> = {
      name: 'bm-doctor',
      lastName: '-' + (this.doctors().length + 1),
      gender: 'Male',
      address: 'Calle Falsa 123',
    };

    this._doctorsService.addDoctor(payload).subscribe({
      next: (data) => {
        this.doctors.set([...this.doctors(), data]);
      },
      error: (err) => {
        console.log('Error al agregar el doctor');
      },
    });
  }

  actualizarDoctor(id: string) {
    const payload: Partial<Doctors> = {
      name: 'bm-doctor',
      lastName: '-editado' + (this.doctors().length + 1),
    };

    this._doctorsService.updateDoctor(id, payload).subscribe({
      next: (data) => {
        this.doctors.set(this.doctors().map((d) => (d.id === id ? data : d))); //actualiza al doctor en la lista
      },
      error: (err) => {
        console.log('Error al actualizar el doctor');
      },
    });
  }

  eliminarDoctor(id: string) {
    this._doctorsService.deleteDoctor(id).subscribe({
      next: () => {
        //elimina al doctor de la lista
        this.doctors.set(this.doctors().filter((d) => d.id !== id));
      },
      error: (err) => {
        console.log('Error al eliminar el doctor');
      },
    });
  }
}
