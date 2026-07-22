import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-grid animate-fade-in">
      <!-- Admin Stats Cards -->
      @if (authService.getRole() === 'Admin') {
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.7 0 4.75-2.05 4.75-4.75S14.7 2.5 12 2.5 7.25 4.55 7.25 7.25 9.3 12 12 12Zm0 2.25c-3.15 0-9.25 1.58-9.25 4.75v2.5h18.5v-2.5c0-3.17-6.1-4.75-9.25-4.75Z" fill="currentColor"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">Total Users</div>
            <div class="stat-value">1,248</div>
          </div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-violet">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V10l8-6 8 6v10h-5v-6H9v6H4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">Active Brands</div>
            <div class="stat-value">42</div>
          </div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h13v9H3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 10h3.5L21 12.5V16h-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.8"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">Total Products</div>
            <div class="stat-value">856</div>
          </div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M17 6H9.5a2.5 2.5 0 0 0 0 5H14a2.5 2.5 0 0 1 0 5H6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">Revenue</div>
            <div class="stat-value">$124,500</div>
          </div>
        </div>
      } @else {
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9L4 7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 7V5a4 4 0 1 1 8 0v2" stroke="currentColor" stroke-width="1.8"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">My Orders</div>
            <div class="stat-value">12</div>
          </div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-icon icon-amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m12 2 2.9 6.26L22 9.27l-5 4.73L18.2 21 12 17.27 5.8 21 7 14l-5-4.73 7.1-1.01L12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-title">Reward Points</div>
            <div class="stat-value">450</div>
          </div>
        </div>
      }
    </div>

    <div class="dashboard-content mt-4 animate-fade-in" style="animation-delay: 0.1s;">
      <div class="card hover-lift">
        <div class="card-header">
          <h3>Welcome to CRM {{ authService.getRole() }}</h3>
        </div>
        <div class="card-body">
          <p>This is a placeholder for the dashboard content. Future updates will include interactive charts and tables tailored for your role.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--surface-color);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }

    .stat-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius);
    }

    .stat-icon.icon-blue { background: var(--primary-light); color: var(--primary-color); }
    .stat-icon.icon-violet { background: #f3e8ff; color: #7c3aed; }
    .stat-icon.icon-amber { background: var(--warning-light); color: var(--warning); }
    .stat-icon.icon-green { background: var(--success-light); color: var(--success); }

    .stat-body {
      min-width: 0;
    }

    .stat-title {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.1;
    }

    .card-body p {
      color: var(--text-secondary);
      line-height: 1.6;
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
}

