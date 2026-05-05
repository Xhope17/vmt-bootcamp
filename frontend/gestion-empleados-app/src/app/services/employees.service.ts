import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employees.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getById(id: string): Observable<Employee> {
    return this._http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  addEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this._http.post<Employee>(`${this.apiUrl}/employees`, employee);
  }
}
