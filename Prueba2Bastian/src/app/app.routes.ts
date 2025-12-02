import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./productos/productos.page').then(m => m.ProductosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-producto',
    loadComponent: () =>
      import('./detalle-producto/detalle-producto.page').then(m => m.DetalleProductoPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./carrito/carrito.page').then(m => m.CarritoPage),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
