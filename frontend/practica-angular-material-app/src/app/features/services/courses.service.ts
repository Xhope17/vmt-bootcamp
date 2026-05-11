import { inject, Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getById(id: string): Observable<Course> {
    return this._http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }
}
