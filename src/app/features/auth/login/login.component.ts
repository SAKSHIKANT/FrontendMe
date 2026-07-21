import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card animate-fade-in hover-lift">
        <div class="auth-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <input 
              id="username" 
              type="text" 
              class="form-control" 
              [ngClass]="{'is-invalid': submitted && f['username'].errors}"
              formControlName="username" 
              placeholder="Enter your username"
            />
            @if (submitted && f['username'].errors) {
              <div class="error-message">Username is required</div>
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
              placeholder="Enter your password"
            />
            @if (submitted && f['password'].errors) {
              <div class="error-message">Password is required</div>
            }
          </div>
          
          <button type="submit" class="btn btn-primary w-100 mt-2" [disabled]="isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
        

      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: var(--bg-color);
      padding: 1rem;
    }

    .auth-card {
      width: 100%;
      max-width: 400px;
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      padding: 2.5rem 2rem;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h2 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .auth-footer p {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  loginForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status === 200 || res.message === 'success') {
          this.toast.success('Success', 'Logged in successfully');
          const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.toast.error('Login Failed', res.message || 'Invalid user or password');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('Login Failed', err.message);
      }
    });
  }
}
