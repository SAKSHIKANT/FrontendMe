import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBrand(brandData: Brand): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/brand/`, brandData);
  }
  
  // Prepare for future integrations
  // getBrands(): Observable<Brand[]> { ... }
  // updateBrand(id: number, data: Brand): Observable<any> { ... }
}
