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
      <!-- Mobile overlay -->
      @if (sidebarOpen) {
        <div class="sidebar-overlay" (click)="sidebarOpen = false"></div>
      }

      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="sidebarOpen">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-mark">CR</span>
            <span>CRM {{ authService.getRole() }}</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link" (click)="sidebarOpen = false">
                <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12 12 4l8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10.5V20h12v-9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>Dashboard</span>
              </a>
            </li>
            <!-- Admin Only Links -->
            @if (authService.getRole() === 'Admin') {
              <li class="nav-item">
                <a routerLink="/create-user" routerLinkActive="active" class="nav-link" (click)="sidebarOpen = false">
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="8" r="3.25" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 20c0-3.3 2.9-5.5 5.5-5.5s5.5 2.2 5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 8h4M19 6v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                  <span>Create User</span>
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/brands" routerLinkActive="active" class="nav-link" (click)="sidebarOpen = false">
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V10l8-6 8 6v10h-5v-6H9v6H4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                  <span>Brands</span>
                </a>
              </li>
              <li class="nav-item">
                <a routerLink="/products" routerLinkActive="active" class="nav-link" (click)="sidebarOpen = false">
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h13v9H3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 10h3.5L21 12.5V16h-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" stroke-width="1.8"/></svg>
                  <span>Products</span>
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
            <button class="menu-toggle" (click)="sidebarOpen = !sidebarOpen" aria-label="Toggle navigation menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
            <h2 class="page-title">Dashboard</h2>
          </div>
          <div class="topbar-right">
            <div class="user-profile">
              <span class="user-avatar">{{ authService.getRole()?.charAt(0) }}</span>
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
      flex-shrink: 0;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      z-index: 20;
      transition: transform var(--transition);
    }

    .sidebar-overlay {
      display: none;
    }

    .sidebar-header {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .logo-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      border-radius: 8px;
      background: var(--primary-gradient);
      color: white;
      font-size: 0.8125rem;
      font-weight: 800;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0.75rem;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.875rem;
      border-radius: var(--border-radius);
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: all var(--transition);
    }

    .nav-icon {
      flex-shrink: 0;
    }

    .nav-link:hover {
      background-color: var(--bg-color);
      color: var(--text-primary);
    }

    .nav-link.active {
      color: var(--primary-color);
      background-color: var(--primary-light);
      font-weight: 600;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
    }

    /* Topbar */
    .topbar {
      height: 64px;
      flex-shrink: 0;
      background-color: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      z-index: 5;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      border-radius: var(--border-radius);
      cursor: pointer;
    }

    .menu-toggle:hover {
      background: var(--bg-color);
      color: var(--text-primary);
    }

    .page-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary-light);
      color: var(--primary-color);
      font-weight: 700;
      font-size: 0.875rem;
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

    @media (max-width: 1024px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        transform: translateX(-100%);
        box-shadow: var(--shadow-xl);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        z-index: 15;
      }

      .menu-toggle {
        display: flex;
      }
    }

    @media (max-width: 640px) {
      .page-content {
        padding: 1.25rem;
      }

      .user-role {
        display: none;
      }

      .topbar {
        padding: 0 1rem;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  authService = inject(AuthService);
  sidebarOpen = false;

  logout() {
    this.authService.logout();
  }
}
