import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;

  // Session-only list for display until a GET /api/product/ endpoint exists
  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  createProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/product/`, productData).pipe(
      tap(res => {
        const created: Product = { ...productData, id: res?.id ?? this.products().length + 1 };
        this.products.update(list => [...list, created]);
      })
    );
  }

  // Prepare for future integrations
  // getProducts(): Observable<Product[]> { ... }
}
