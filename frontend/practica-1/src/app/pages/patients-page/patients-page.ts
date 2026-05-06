import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { FormsModule } from '@angular/forms';
import { Patients } from '../../interfaces/patients';
@Component({
  selector: 'app-patients-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './patients-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsPage implements OnInit {
  private _patientsService = inject(PatientsService);
  patients = signal<Patients[]>([]);
  loading = signal(false);
  error = signal('');

  search: string = '';
  patientFound: Patients | null = null;

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.loading.set(true);
    this.error.set('');
    this._patientsService.getPatients().subscribe({
      next: (data) => {
        this.patients.set(data);
        this.loading.set(false);
        console.log(this.patients()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los pacientes');
        this.loading.set(false);
      },
    });
  }

  buscarPaciente(id: string) {
    const paciente = this.patients().find((p) => p.id === id);
    if (paciente) {
      this.patientFound = paciente;
    } else {
      this.patientFound = null;
    }
  }

  agregarPaciente() {
    const payload: Partial<Patients> = {
      name: 'bm-paciente1',
      avatar: 'https://i.pravatar.cc/150?img=1',
      age: 23,
      phone: '1234567890',
    };

    this._patientsService.addPatient(payload).subscribe({
      next: (data) => {
        this.patients.set([...this.patients(), data]);
      },
      error: (err) => {
        console.log('Error al agregar el paciente');
      },
    });
  }

  actualizarPaciente(id: string) {
    const payload: Partial<Patients> = {
      name: 'bm-paciente1-editado',
    };

    this._patientsService.updatePatient(id, payload).subscribe({
      next: (data) => {
        this.patients.set(this.patients().map((p) => (p.id === id ? data : p))); //actualiza al paciente en la lista
      },
      error: (err) => {
        console.log('Error al actualizar el paciente');
      },
    });
  }

  eliminarPaciente(id: string) {
    this._patientsService.deletePatient(id).subscribe({
      next: () => {
        //elimina al paciente de la lista
        this.patients.set(this.patients().filter((p) => p.id !== id));
      },
      error: (err) => {
        console.log('Error al eliminar el paciente');
      },
    });
  }

}
