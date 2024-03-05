import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      // No autenticado, permitir acceso a la ruta
      return true;
    } else {
      // Usuario autenticado, redirigir al dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
