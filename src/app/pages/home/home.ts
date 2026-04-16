import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../core/services/order.service'; // 👈 IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private orderService: OrderService // 👈 INJETOU AQUI
  ) {}

  comerAqui() {
    this.orderService.setConsumptionType('local');
    this.router.navigate(['/ofertas']); // mantém padrão que você definiu antes
  }

  paraLevar() {
    this.orderService.setConsumptionType('viagem');
    this.router.navigate(['/ofertas']);
  }

  admin() {
    this.router.navigate(['/admin-login']);
  }
}