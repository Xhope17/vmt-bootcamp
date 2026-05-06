import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Department } from '../../interfaces/departments.interface';
import { DepartmentsService } from '../../services/departments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './departments-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsPage implements OnInit {
  private _departmentsService = inject(DepartmentsService);
  department = signal<Department[]>([]);
  loading = signal(false);
  error = signal('');

  search: string = '';
  departmentFound: Department | null = null;

  ngOnInit() {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.loading.set(true);
    this.error.set('');
    this._departmentsService.getDepartments().subscribe({
      next: (data) => {
        this.department.set(data);
        this.loading.set(false);
        console.log(this.department()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los departamentos');
        this.loading.set(false);
      },
    });
  }

  buscarDepartamento(id: string) {
    const department = this.department().find((e) => e.id === id);
    if (department) {
      this.departmentFound = department;
      console.log('se encontró el departamento: ' + this.departmentFound);
    } else {
      console.log('no se encontró');
    }
  }

  agregarDepartamento() {
    const payload: Partial<Department> = {
      name: 'Test',
      description: 'aaaaaaa',
      managerName: 'bbbbbb',
      // avatar: 'https://i.pravatar.cc/150?img=1',
    };

    this._departmentsService.addDepartment(payload).subscribe({
      next: (data) => {
        console.log('Departamento agregado: ' + data);
        this.department.set([...this.department(), data]); //como es signal se pone ()
      },
      error: (err) => {
        console.log('Error al agregar departamento: ' + err);
      },
    });
  }

  actualizarDepartamento(id: string) {
    const departamento = this.department()[0]; // Obtener el primer departamento de la lista

    if (!departamento) return;

    const payload: Partial<Department> = {
      name: 'Jose Jose',
      description: '0999999999',
      managerName: 'idk',
    };

    this._departmentsService.updateDepartment(id, payload).subscribe({
      next: (data) => {
        this.department.set(this.department().map((d) => (d.id === id ? data : d))); // Actualizar el departamento en la lista
      },
      error: (err) => {
        console.log('Error al actualizar departamento: ' + err);
      },
    });
  }

  eliminarDepartamento(id: string) {
    this._departmentsService.deleteDepartment(id).subscribe({
      next: () => {
        this.department.set(this.department().filter((d) => d.id !== id)); // Eliminar el departamento de la lista
      },
      error: (err) => {
        console.log('Error al eliminar departamento: ' + err);
      },
    });
  }
}
