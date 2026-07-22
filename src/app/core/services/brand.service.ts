import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = environment.apiUrl;

  // Session-only list for display until a GET /api/brand/ endpoint exists
  brands = signal<Brand[]>([]);

  constructor(private http: HttpClient) {}

  createBrand(brandData: Brand): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/brand/`, brandData).pipe(
      tap(res => {
        const created: Brand = { ...brandData, id: res?.id ?? this.brands().length + 1 };
        this.brands.update(list => [...list, created]);
      })
    );
  }

  // Prepare for future integrations
  // getBrands(): Observable<Brand[]> { ... }
  // updateBrand(id: number, data: Brand): Observable<any> { ... }
}
