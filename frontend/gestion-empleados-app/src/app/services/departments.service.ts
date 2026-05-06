import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/departments.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.apiUrl}/departments`);
  }

  getById(id: string): Observable<Department> {
    return this._http.get<Department>(`${this.apiUrl}/departments/${id}`);
  }

  addDepartment(department: Partial<Department>): Observable<Department> {
    return this._http.post<Department>(`${this.apiUrl}/departments`, department);
  }

  updateDepartment(id: string, department: Partial<Department>): Observable<Department> {
    return this._http.put<Department>(`${this.apiUrl}/departments/${id}`, department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/departments/${id}`);
  }
}
