import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/product/`, productData);
  }

  // Prepare for future integrations
  // getProducts(): Observable<Product[]> { ... }
}
