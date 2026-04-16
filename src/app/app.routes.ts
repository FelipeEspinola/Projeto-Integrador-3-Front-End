import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MenuComponent } from './pages/menu/menu';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
        { path: 'ofertas', component: MenuComponent },
        { path: 'carnes', component: MenuComponent },
        { path: 'frango', component: MenuComponent },
        { path: 'acompanhamentos', component: MenuComponent },
        { path: 'sobremesas', component: MenuComponent },
        { path: 'bebidas', component: MenuComponent }
  
];