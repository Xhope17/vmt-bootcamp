import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Doctors } from '../interfaces/doctors';
import { Observable } from 'rxjs';
import { Patients } from '../interfaces/patients';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  //devuelve todos los doctores de la base de datos
  getDoctors(): Observable<Doctors[]> {
    return this._http.get<Doctors[]>(`${this.apiUrl}/doctors`);
  }

  //busca a un doctor por su id y lo devuelve
  getById(id: string): Observable<Doctors> {
    return this._http.get<Doctors>(`${this.apiUrl}/doctors/${id}`);
  }

  //Agrega un nuevo doctor
  addDoctor(doctor: Partial<Doctors>): Observable<Doctors> {
    return this._http.post<Doctors>(`${this.apiUrl}/doctors`, doctor);
  }

  //actualiza los datos de un doctor existente
  updateDoctor(id: string, doctor: Partial<Doctors>): Observable<Doctors> {
    return this._http.put<Doctors>(`${this.apiUrl}/doctors/${id}`, doctor);
  }

  //borra un doctor de la base de datos por su id
  deleteDoctor(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/doctors/${id}`);
  }
}
