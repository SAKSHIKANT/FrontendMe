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
          <div class="stat-title">Total Users</div>
          <div class="stat-value">1,248</div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-title">Active Brands</div>
          <div class="stat-value">42</div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-title">Total Products</div>
          <div class="stat-value">856</div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-title">Revenue</div>
          <div class="stat-value">$124,500</div>
        </div>
      } @else {
        <div class="stat-card hover-lift">
          <div class="stat-title">My Orders</div>
          <div class="stat-value">12</div>
        </div>
        <div class="stat-card hover-lift">
          <div class="stat-title">Reward Points</div>
          <div class="stat-value">450</div>
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
      background: var(--surface-color);
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
    }
    
    .stat-title {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .card {
      background: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      backdrop-filter: blur(10px);
    }

    .card-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.125rem;
    }

    .card-body {
      padding: 1.5rem;
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
}

