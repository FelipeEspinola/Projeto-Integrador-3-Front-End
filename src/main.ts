import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/pages/home/home';
import { MenuComponent } from './app/pages/menu/menu';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'ofertas', component: MenuComponent },
      { path: 'carnes', component: MenuComponent },
      { path: 'frango', component: MenuComponent },
      { path: 'acompanhamentos', component: MenuComponent },
      { path: 'sobremesas', component: MenuComponent },
      { path: 'bebidas', component: MenuComponent }

    ])
  ]
})
.catch(err => console.error(err));