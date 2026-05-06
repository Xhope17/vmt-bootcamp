import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../interfaces/employees.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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
    const empleado = this.employees().find((e) => e.id === id);
    if (empleado) {
      this.employeeFound = empleado;
      console.log('se encontró el empleado: ' + this.employeeFound);
    } else {
      console.log('no se encontró');
    }
  }


  agregarEmpleado() {
    const payload: Partial<Employee> = {
      name: 'Juanito Perez',
      email: 'jj@gmail.com',
      phone: '0999999999',
      position: 'Gerente',
      department: 'idk',
      salary: '9999.99',
    };

    this._employeesService.addEmployee(payload).subscribe({
      next: (data) => {
        console.log('Empleado agregado: ' + data);
        // this.employees = [...this.employees, data];
        this.employees.set([...this.employees(), data]); //como es signal se pone ()
      },
      error: (err) => {
        console.log('Error al agregar empleado: ' + err);
      },
    });
  }

  actualizarEmpleado(id: string) {
    const empleado = this.employees()[0]; // Obtener el primer empleado de la lista

    if (!empleado) return;

    const payload: Partial<Employee> = {
      name: 'Juanito Perez',
      email: 'jj@gmail.com',
      phone: '0999999999',
      position: 'Gerente',
      department: 'idk',
      salary: '9999.99',
      avatar: 'https://i.pravatar.cc/150?img=69',
    };

    this._employeesService.updateEmployee(id, payload).subscribe({
      next: (data) => {
        this.employees.set(this.employees().map((e) => (e.id === id ? data : e))); // Actualizar el empleado en la lista
      },
      error: (err) => {
        console.log('Error al actualizar empleado: ' + err);
      },
    });
  }

  eliminarEmpleado(id: string) {
    this._employeesService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees.set(this.employees().filter((e) => e.id !== id)); // Eliminar el empleado de la lista
      },
      error: (err) => {
        console.log('Error al eliminar empleado: ' + err);
      },
    });
  }
}
