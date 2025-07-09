import { Routes } from '@angular/router';
import { Login }    from './pages/login/login';
import { Menu }     from './pages/menu/menu';
import { Register } from './pages/register/register';
import { Cart }     from './pages/cart/cart';
import { Update }   from './pages/update/update';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '',        component: Menu },
  { path: 'login',   component: Login },
  { path: 'menu',    component: Menu },
  { path: 'register',component: Register },
  { path: 'cart',    component: Cart },
  {
    path: 'profile',
    component: Update,
    canActivate: [ AuthGuard ]
  }
];
