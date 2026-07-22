import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card animate-fade-in" style="max-width: 640px; margin: 0 auto;">
      <div class="card-header">
        <h3>Create New User</h3>
        <p class="text-secondary" style="font-size: 0.875rem; margin: 0;">Create an account for a Customer or Distributor.</p>
      </div>
      <div class="card-body">
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <input 
              id="username" 
              type="text" 
              class="form-control" 
              [ngClass]="{'is-invalid': submitted && f['username'].errors}"
              formControlName="username" 
              placeholder="Choose a username"
            />
            @if (submitted && f['username'].errors?.['required']) {
              <div class="error-message">Username is required</div>
            }
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label" for="firstName">First Name</label>
              <input 
                id="firstName" 
                type="text" 
                class="form-control" 
                formControlName="firstName" 
                placeholder="First name"
              />
            </div>
            <div class="form-group half-width">
              <label class="form-label" for="lastName">Last Name</label>
              <input 
                id="lastName" 
                type="text" 
                class="form-control" 
                formControlName="lastName" 
                placeholder="Last name"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              class="form-control" 
              [ngClass]="{'is-invalid': submitted && f['email'].errors}"
              formControlName="email" 
              placeholder="Enter your email"
            />
            @if (submitted && f['email'].errors?.['email']) {
              <div class="error-message">Enter a valid email address</div>
            }
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input 
              id="password" 
              type="password" 
              class="form-control"
              [ngClass]="{'is-invalid': submitted && f['password'].errors}"
              formControlName="password" 
              placeholder="Create a password"
            />
            @if (submitted && f['password'].errors?.['required']) {
              <div class="error-message">Password is required</div>
            }
            @if (submitted && f['password'].errors?.['minlength']) {
              <div class="error-message">Password must be at least 6 characters</div>
            }
          </div>

          <div class="form-group role-selection">
            <label class="form-label">Select User Role</label>
            <div class="radio-group mt-2">
              <label class="radio-card" [class.selected]="registerForm.get('role')?.value === 'Admin'">
                <input type="radio" formControlName="role" value="Admin" class="sr-only">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
                <span class="role-title">Admin</span>
              </label>

              <label class="radio-card" [class.selected]="registerForm.get('role')?.value === 'Customer'">
                <input type="radio" formControlName="role" value="Customer" class="sr-only">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.7 0 4.75-2.05 4.75-4.75S14.7 2.5 12 2.5 7.25 4.55 7.25 7.25 9.3 12 12 12Zm0 2.25c-3.15 0-9.25 1.58-9.25 4.75v2.5h18.5v-2.5c0-3.17-6.1-4.75-9.25-4.75Z" fill="currentColor"/>
                </svg>
                <span class="role-title">Customer</span>
              </label>

              <label class="radio-card" [class.selected]="registerForm.get('role')?.value === 'Distributor'">
                <input type="radio" formControlName="role" value="Distributor" class="sr-only">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7h13v9H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                  <path d="M16 10h3.5L21 12.5V16h-5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                  <circle cx="7.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/>
                  <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/>
                </svg>
                <span class="role-title">Distributor</span>
              </label>
            </div>
            @if (submitted && f['role'].errors?.['required']) {
              <div class="error-message">You must select a role for the new user.</div>
            }
          </div>

        <button type="submit" class="btn btn-primary w-100 mt-4" [disabled]="isLoading">
          @if (isLoading) {
            <span class="spinner" aria-hidden="true"></span>
          }
          {{ isLoading ? 'Creating...' : 'Create User' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-row {
      display: flex;
      gap: 1rem;
    }

    .half-width {
      flex: 1;
    }

    .radio-group {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    .radio-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1.25rem 1rem;
      border: 1.5px solid var(--border-color);
      border-radius: var(--border-radius);
      cursor: pointer;
      background: var(--surface-color);
      color: var(--text-secondary);
      transition: all var(--transition);
    }

    .radio-card:hover {
      border-color: var(--primary-color);
      background: var(--primary-light);
      color: var(--primary-color);
    }

    .radio-card.selected {
      border-color: var(--primary-color);
      background: var(--primary-light);
      color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    }

    .role-title {
      font-weight: 600;
      color: var(--text-primary);
    }

    .radio-card.selected .role-title {
      color: var(--primary-color);
    }

    @media (max-width: 560px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      .radio-group {
        grid-template-columns: 1fr;
      }
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
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  registerForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    // Map the single role back to the boolean flags the backend expects
    const formValue = this.registerForm.value;
    const apiPayload = {
      ...formValue,
      isAdmin: formValue.role === 'Admin',
      isCustomer: formValue.role === 'Customer',
      isDistributor: formValue.role === 'Distributor'
    };
    
    this.authService.register(apiPayload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if(res.status === 200 || res.message === 'success') {
          this.toast.success('Success', 'User created successfully.');
          this.router.navigate(['/dashboard']);
        } else {
          this.toast.error('Registration Failed', res.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('Registration Failed', err.message);
      }
    });
  }
}
