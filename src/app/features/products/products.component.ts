import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { BrandService } from '../../core/services/brand.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="products-grid animate-fade-in">
      <div class="card">
        <div class="card-header">
          <h3>Add Product</h3>
          <p class="text-secondary" style="font-size: 0.875rem; margin: 0;">Create a new product under a brand.</p>
        </div>
        <div class="card-body">
          @if (brandService.brands().length === 0) {
            <div class="inline-warning">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v4M12 17h.01M10.3 3.9 2.7 17a1.8 1.8 0 0 0 1.6 2.7h15.4A1.8 1.8 0 0 0 21.3 17L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Add a brand first so products can be assigned to one.
            </div>
          }

          <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="form-label" for="name">Product Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                [ngClass]="{'is-invalid': submitted && f['name'].errors}"
                formControlName="name"
                placeholder="Enter product name"
              />
              @if (submitted && f['name'].errors?.['required']) {
                <div class="error-message">Product name is required</div>
              }
            </div>

            <div class="form-row">
              <div class="form-group half-width">
                <label class="form-label" for="brand">Brand</label>
                <select
                  id="brand"
                  class="form-control"
                  [ngClass]="{'is-invalid': submitted && f['brand'].errors}"
                  formControlName="brand"
                >
                  <option value="" disabled>Select a brand</option>
                  @for (brand of brandService.brands(); track brand.id) {
                    <option [value]="brand.id">{{ brand.name }}</option>
                  }
                </select>
                @if (submitted && f['brand'].errors?.['required']) {
                  <div class="error-message">Please select a brand</div>
                }
              </div>
              <div class="form-group half-width">
                <label class="form-label" for="productCode">Product Code</label>
                <input
                  id="productCode"
                  type="text"
                  class="form-control"
                  formControlName="productCode"
                  placeholder="e.g. SKU-1024"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="description">Description</label>
              <textarea
                id="description"
                class="form-control"
                rows="3"
                formControlName="description"
                placeholder="Short description of the product"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="toggle-row">
                <input type="checkbox" formControlName="isActive" class="sr-only-checkbox" />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
                <span class="toggle-label">Active</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary w-100 mt-2" [disabled]="isLoading">
              @if (isLoading) {
                <span class="spinner" aria-hidden="true"></span>
              }
              {{ isLoading ? 'Saving...' : 'Add Product' }}
            </button>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Products</h3>
          <p class="text-secondary" style="font-size: 0.875rem; margin: 0;">{{ productService.products().length }} added this session</p>
        </div>
        <div class="card-body no-pad">
          @if (productService.products().length === 0) {
            <div class="empty-state">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h13v9H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 10h3.5L21 12.5V16h-5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/></svg>
              <p>No products added yet</p>
            </div>
          } @else {
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Code</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (product of productService.products(); track product.id) {
                  <tr>
                    <td class="cell-strong">{{ product.name }}</td>
                    <td class="cell-muted">{{ brandName(product.brand) }}</td>
                    <td class="cell-muted">{{ product.productCode || '—' }}</td>
                    <td>
                      <span class="badge" [ngClass]="product.isActive ? 'badge-success' : 'badge-danger'">
                        {{ product.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    .no-pad { padding: 0; }

    .form-row {
      display: flex;
      gap: 1rem;
    }

    .half-width {
      flex: 1;
    }

    .inline-warning {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      margin-bottom: 1.25rem;
      background: var(--warning-light);
      color: #92400e;
      border-radius: var(--border-radius);
      font-size: 0.8125rem;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      cursor: pointer;
      width: fit-content;
    }

    .sr-only-checkbox {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
    }

    .toggle-track {
      width: 38px;
      height: 22px;
      border-radius: 999px;
      background: var(--border-color);
      position: relative;
      transition: background var(--transition);
      flex-shrink: 0;
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition);
    }

    .sr-only-checkbox:checked + .toggle-track {
      background: var(--primary-color);
    }

    .sr-only-checkbox:checked + .toggle-track .toggle-thumb {
      transform: translateX(16px);
    }

    .toggle-label {
      font-size: 0.875rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 3rem 1.5rem;
      color: var(--text-muted);
    }

    .empty-state p {
      font-size: 0.875rem;
      margin: 0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .data-table td {
      padding: 0.875rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.875rem;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    .cell-strong {
      font-weight: 600;
      color: var(--text-primary);
    }

    .cell-muted {
      color: var(--text-secondary);
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      display: inline-block;
      margin-right: 0.5rem;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 900px) {
      .products-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        flex-direction: column;
        gap: 0;
      }
    }
  `]
})
export class ProductsComponent {
  private fb = inject(FormBuilder);
  productService = inject(ProductService);
  brandService = inject(BrandService);
  private toast = inject(ToastService);

  productForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      productCode: [''],
      description: [''],
      isActive: [true]
    });
  }

  get f() { return this.productForm.controls; }

  brandName(brandId: number): string {
    return this.brandService.brands().find(b => b.id === brandId)?.name || 'Unknown';
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = { ...this.productForm.value, brand: Number(this.productForm.value.brand) };
    this.productService.createProduct(formValue).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = false;
        this.toast.success('Success', 'Product added successfully.');
        this.productForm.reset({ name: '', brand: '', productCode: '', description: '', isActive: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('Failed to add product', err.message);
      }
    });
  }
}
