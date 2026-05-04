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
    this._departmentsService.getById(id).subscribe({
      next: (data) => {
        this.departmentFound = data;
        console.log('se encontró el departamento: ' + this.departmentFound);
      },
      error: (err) => {},
    });
  }
}
