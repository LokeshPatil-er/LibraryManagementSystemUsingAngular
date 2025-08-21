import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private toast: ToastService) { }

  private tokenKey = 'AuthToken';
  private userIdKey = 'UserId';

  private hasLocalStorage(): boolean {
    return (typeof window !== 'undefined' && !!window.localStorage);
  }

  setAuthData(token: string, userId: number): void {
    if (this.hasLocalStorage()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userIdKey, userId.toString());
    }
  }

  getToken(): string | null {
    if (this.hasLocalStorage()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getUserId(): number | null {
    if (this.hasLocalStorage()) {
      const id = localStorage.getItem(this.userIdKey);
      return id ? +id : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (this.hasLocalStorage()) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
    this.toast.showSuccessToast("Logout successfully..", "Logout success");
  }
}
