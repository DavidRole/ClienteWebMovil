// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth {
  constructor(private router: Router) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get tokenExpiration(): Date | null {
    const exp = localStorage.getItem('expiration');
    return exp ? new Date(exp) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('expiration');
    return !!token && !!exp && new Date() < new Date(exp);
  }

  ensureLoggedIn(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/profile']);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
  }
}
