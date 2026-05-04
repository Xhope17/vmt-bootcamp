import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../interfaces/employees.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePage implements OnInit {
  private _employeesService = inject(EmployeesService);
  employees = signal<Employee[]>([]);
  loading = signal(false);
  error = signal('');

  search: string = '';
  employeeFound: Employee | null = null;

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.loading.set(true);
    this.error.set('');
    this._employeesService.getEmployees().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
        console.log(this.employees()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los empleados');
        this.loading.set(false);
      },
    });
  }

  buscarEmpleado(id: string) {
    this._employeesService.getById(id).subscribe({
      next: (data) => {
        this.employeeFound = data;
        console.log('se encontró el empleado: ' + this.employeeFound);
      },
      error: (err) => {},
    });
  }
}
