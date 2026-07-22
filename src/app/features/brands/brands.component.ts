import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandService } from '../../core/services/brand.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="brands-grid animate-fade-in">
      <div class="card">
        <div class="card-header">
          <h3>Add Brand</h3>
          <p class="text-secondary" style="font-size: 0.875rem; margin: 0;">Create a new brand for the catalog.</p>
        </div>
        <div class="card-body">
          <form [formGroup]="brandForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="form-label" for="name">Brand Name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                [ngClass]="{'is-invalid': submitted && f['name'].errors}"
                formControlName="name"
                placeholder="Enter brand name"
              />
              @if (submitted && f['name'].errors?.['required']) {
                <div class="error-message">Brand name is required</div>
              }
            </div>

            <div class="form-group">
              <label class="form-label" for="description">Description</label>
              <textarea
                id="description"
                class="form-control"
                rows="3"
                formControlName="description"
                placeholder="Short description of the brand"
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
              {{ isLoading ? 'Saving...' : 'Add Brand' }}
            </button>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Brands</h3>
          <p class="text-secondary" style="font-size: 0.875rem; margin: 0;">{{ brandService.brands().length }} added this session</p>
        </div>
        <div class="card-body no-pad">
          @if (brandService.brands().length === 0) {
            <div class="empty-state">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V10l8-6 8 6v10h-5v-6H9v6H4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
              <p>No brands added yet</p>
            </div>
          } @else {
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (brand of brandService.brands(); track brand.id) {
                  <tr>
                    <td class="cell-strong">{{ brand.name }}</td>
                    <td class="cell-muted">{{ brand.description || '—' }}</td>
                    <td>
                      <span class="badge" [ngClass]="brand.isActive ? 'badge-success' : 'badge-danger'">
                        {{ brand.isActive ? 'Active' : 'Inactive' }}
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
    .brands-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    .no-pad { padding: 0; }

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
      .brands-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BrandsComponent {
  private fb = inject(FormBuilder);
  brandService = inject(BrandService);
  private toast = inject(ToastService);

  brandForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor() {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true]
    });
  }

  get f() { return this.brandForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.brandForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.brandService.createBrand(this.brandForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = false;
        this.toast.success('Success', 'Brand added successfully.');
        this.brandForm.reset({ name: '', description: '', isActive: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('Failed to add brand', err.message);
      }
    });
  }
}
