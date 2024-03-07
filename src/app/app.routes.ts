import { Routes } from '@angular/router';
import { UnauthGuard } from './services/unauth.guard.service';
import { AuthGuard } from './services/authGuard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component'),
    canActivate: [UnauthGuard], // Solo permite acceder a usuarios no autenticados
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [AuthGuard], // Protege esta ruta con AuthGuard
    children: [
      {
        path: 'usuarios',
        title: 'Usuarios',
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component'),
        canActivate: [AuthGuard], // Repite este patrón para cada ruta que necesites proteger
      },
      {
        path: 'informes',
        title: 'Informes',
        data: { icon: 'fas fa-check-circle' },
        loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component'),
        canActivate: [AuthGuard],

      },
      {
        path: 'equipos',
        title: 'Equipos',
        loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'clientes',
        title: 'Clientes',
        loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'user/:id',
        title: 'User View',
        loadComponent: () => import('./dashboard/pages/user/user.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'tareas',
        title: 'Tareas',
        loadComponent: () => import('./dashboard/pages/users/users.component'),
        canActivate: [AuthGuard],

      },
      {
        path: 'lista',
        title: 'Lista',
        loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component'),
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'view-transition',
      //   title: 'View Transition',
      //   loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component'),
      //   canActivate: [AuthGuard],
      // },
      {
        path: '',
        redirectTo: 'informes',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
