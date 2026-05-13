import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getStudents(): Observable<Student[]> {
    return this._http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getById(id: string): Observable<Student> {
    return this._http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  update(id: string, payload: Partial<Student>): Observable<Student> {
    return this._http.put<Student>(`${this.apiUrl}/students/${id}`, payload);
  }

  create(payload: Partial<Student>): Observable<Student> {
    return this._http.post<Student>(`${this.apiUrl}/students`, payload);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/students/${id}`);
  }
}
