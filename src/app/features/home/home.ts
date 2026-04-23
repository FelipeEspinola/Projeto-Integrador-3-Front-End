import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';

// Angular
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  constructor(private router: Router) {}

  comerAqui() {
    localStorage.setItem('tipoPedido', 'balcao'); // 👈 corrigido
    this.router.navigate(['/menu']);
  }

  viagem() {
    localStorage.setItem('tipoPedido', 'viagem');
    this.router.navigate(['/menu']);
  }

  admin() {
    this.router.navigate(['/login']);
  }
}