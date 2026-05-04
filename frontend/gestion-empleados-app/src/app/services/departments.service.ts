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
}
