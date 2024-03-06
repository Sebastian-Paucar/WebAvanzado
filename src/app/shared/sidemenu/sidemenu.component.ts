import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  // Corregido a styleUrls y asegurado que es un arreglo
})

export class SidemenuComponent {
  token!: string;
  constructor(public auth: AuthService, private router: Router) {}


  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .map(route => [
    route,
    ...(route.children ?? []).filter(childRoute => childRoute.path && !childRoute.path.includes(':'))
  ])
  .flat()
  .filter(route => route.path && !route.path.includes(':'));


  // Asume que `logout` está dentro de un componente o servicio que usa AuthService
async signOut() {
  this.auth.signOut();
  this.router.navigate(['/login']);
}


}
