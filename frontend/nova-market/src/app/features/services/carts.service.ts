import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse, Cart } from '../interfaces/private/cart.interface';
// Asegúrate de importar tus interfaces desde la ruta correcta

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getCarts(): Observable<Cart[]> {
    return this._http
      .get<ApiResponse>(`${this.apiUrl}/carts`)
      .pipe(map((response) => response.carts));
  }

  getById(id: number): Observable<Cart> {
    return this._http.get<Cart>(`${this.apiUrl}/carts/${id}`);
  }

  update(id: number, payload: Partial<Cart>): Observable<Cart> {
    return this._http.put<Cart>(`${this.apiUrl}/carts/${id}`, payload);
  }


  create(payload: Partial<Cart>): Observable<Cart> {
    return this._http.post<Cart>(`${this.apiUrl}/carts/add`, payload);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/carts/${id}`);
  }
}
