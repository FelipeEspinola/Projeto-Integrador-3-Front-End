import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Menu } from './features/menu/menu';
import { Sacola } from './features/sacola/sacola';
import { Pagamento } from './features/pagamento/pagamento';
import { Login } from './features/login/login';
import { Admin } from './features/admin/admin';
import { AdminForm } from './features/admin-form/admin-form';

import { authGuard } from './core/guards/auth-guard';
import { Sucesso } from './features/sucesso/sucesso';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu },
  { path: 'sacola', component: Sacola },
  { path: 'pagamento', component: Pagamento },
  { path: 'sucesso', component: Sucesso },
  { path: 'login', component: Login },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard]
  },
  {
    path: 'admin/novo',
    component: AdminForm,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' }
];