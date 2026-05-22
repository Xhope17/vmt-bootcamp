import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  // getProducts(): Observable<Product[]> {
  //   return this._http.get<Product[]>(`${this.apiUrl}/products`).pipe(map((response: any) => response.products));
  // }

  getProducts(): Observable<Product[]> {
    // 2. Tipamos el get() con la nueva interfaz y el map ya no necesita 'any'
    return this._http.get<ApiResponse>(`${this.apiUrl}/products`).pipe(
      map(response => response.products)
    );
  }

  getById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  update(id: number, payload: Partial<Product>): Observable<Product> {
    return this._http.put<Product>(`${this.apiUrl}/products/${id}`, payload);
  }

  create(payload: Partial<Product>): Observable<Product> {
    return this._http.post<Product>(`${this.apiUrl}/products`, payload);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/products/${id}`);
  }
}
