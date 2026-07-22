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
      <div class="auth-shell animate-fade-in">
        <!-- Branding panel -->
        <div class="brand-panel">
          <h1>Manage your business, effortlessly.</h1>
          <p>One workspace for brands, products and your entire customer pipeline.</p>
        </div>

        <!-- Form panel -->
        <div class="form-panel">
          <div class="auth-card">
            <div class="auth-header">
              <h2>Welcome back</h2>
              <p>Please enter your details to sign in.</p>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label class="form-label" for="username">Username</label>
                <div class="input-with-icon">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.7 0 4.75-2.05 4.75-4.75S14.7 2.5 12 2.5 7.25 4.55 7.25 7.25 9.3 12 12 12Zm0 2.25c-3.15 0-9.25 1.58-9.25 4.75v2.5h18.5v-2.5c0-3.17-6.1-4.75-9.25-4.75Z" fill="currentColor"/>
                  </svg>
                  <input
                    id="username"
                    type="text"
                    class="form-control has-icon"
                    [ngClass]="{'is-invalid': submitted && f['username'].errors}"
                    formControlName="username"
                    placeholder="Enter your username"
                  />
                </div>
                @if (submitted && f['username'].errors) {
                  <div class="error-message">Username is required</div>
                }
              </div>

              <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <div class="input-with-icon">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h8V8a4 4 0 1 0-8 0v2Z" fill="currentColor"/>
                  </svg>
                  <input
                    id="password"
                    type="password"
                    class="form-control has-icon"
                    [ngClass]="{'is-invalid': submitted && f['password'].errors}"
                    formControlName="password"
                    placeholder="Enter your password"
                  />
                </div>
                @if (submitted && f['password'].errors) {
                  <div class="error-message">Password is required</div>
                }
              </div>

              <button type="submit" class="btn btn-primary w-100 mt-2" [disabled]="isLoading">
                @if (isLoading) {
                  <span class="spinner" aria-hidden="true"></span>
                }
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
              </button>
            </form>
          </div>
        </div>
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
      padding: 1.5rem;
    }

    .auth-shell {
      width: 100%;
      max-width: 880px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-radius: var(--border-radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      background: var(--surface-color);
    }

    .brand-panel {
      background: var(--primary-gradient);
      color: white;
      padding: 3rem 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }

    .brand-panel h1 {
      font-size: 1.75rem;
      line-height: 1.25;
      margin-bottom: 0.75rem;
    }

    .brand-panel p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .form-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 2rem;
    }

    .auth-card {
      width: 100%;
      max-width: 340px;
    }

    .auth-header {
      margin-bottom: 2rem;
    }

    .auth-header h2 {
      color: var(--text-primary);
      margin-bottom: 0.375rem;
    }

    .auth-header p {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .input-with-icon {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .form-control.has-icon {
      padding-left: 2.5rem;
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

    @media (max-width: 760px) {
      .auth-shell {
        grid-template-columns: 1fr;
      }
      .brand-panel {
        padding: 2rem;
        text-align: center;
        align-items: center;
      }
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
