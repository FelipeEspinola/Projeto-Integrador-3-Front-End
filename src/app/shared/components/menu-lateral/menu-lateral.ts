import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-lateral.html',
  styleUrls: ['./menu-lateral.css']
})
export class MenuLateralComponent {

  constructor(private router: Router) {}

  navegar(rota: string) {
    this.router.navigate([rota]);
  }

  isActive(rota: string): boolean {
    return this.router.url.includes(rota);
  }
}