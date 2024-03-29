import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    if (user) {
      // Usuario autenticado, permitir acceso
      return true;
    } else {
      // No autenticado, redirigir a login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
