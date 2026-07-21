import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout-wrapper">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">CRM {{ authService.getRole() }}</div>
        </div>
        
        <nav class="sidebar-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                Dashboard
              </a>
            </li>
            <!-- Admin Only Links -->
            @if (authService.getRole() === 'Admin') {
              <li class="nav-item">
                <a routerLink="/create-user" routerLinkActive="active" class="nav-link">
                  Create User
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/brands" routerLinkActive="active" class="nav-link">
                  Brands
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/products" routerLinkActive="active" class="nav-link">
                  Products
                </a>
              </li>
            }
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Top Navbar -->
        <header class="topbar">
          <div class="topbar-left">
            <h2 class="page-title">Dashboard</h2>
          </div>
          <div class="topbar-right">
            <div class="user-profile">
              <span class="user-role">{{ authService.getRole() }}</span>
              <button class="btn btn-secondary logout-btn" (click)="logout()">Logout</button>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background-color: var(--bg-color);
    }

    /* Sidebar */
    .sidebar {
      width: 260px;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      z-index: 10;
      backdrop-filter: blur(10px);
    }

    .sidebar-header {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .sidebar-nav {
      flex: 1;
      padding: 1.5rem 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 0.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .nav-link:hover {
      background-color: var(--bg-color);
      color: var(--text-primary);
    }

    .nav-link.active {
      color: var(--text-primary);
      background-color: rgba(91, 33, 182, 0.2);
      border-right: 3px solid var(--primary-hover);
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Topbar */
    .topbar {
      height: 64px;
      background-color: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 5;
      backdrop-filter: blur(10px);
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-role {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .logout-btn {
      padding: 0.375rem 1rem;
      font-size: 0.875rem;
    }

    /* Page Content */
    .page-content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }
  `]
})
export class DashboardLayoutComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
