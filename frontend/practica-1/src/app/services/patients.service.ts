import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patients } from '../interfaces/patients';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  //devuelve todos los pacientes de la base de datos
  getPatients(): Observable<Patients[]> {
    return this._http.get<Patients[]>(`${this.apiUrl}/patients`);
  }

  //busca a un paciente por su id y lo devuelve
  getById(id: string): Observable<Patients> {
    return this._http.get<Patients>(`${this.apiUrl}/patients/${id}`);
  }

  //Agrega un nuevo paciente
  addPatient(patient: Partial<Patients>): Observable<Patients> {
    return this._http.post<Patients>(`${this.apiUrl}/patients`, patient);
  }

  //actualiza los datos de un paciente existente
  updatePatient(id: string, patient: Partial<Patients>): Observable<Patients> {
    return this._http.put<Patients>(`${this.apiUrl}/patients/${id}`, patient);
  }

  //borra un paciente de la base de datos por su id
  deletePatient(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/patients/${id}`);
  }
}
