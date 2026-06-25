import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sucesso.html',
  styleUrls: ['./sucesso.css']
})
export class Sucesso {

  pedido: any = null;
  numeroCupom = '00000';
  pedidoId: number | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.pedido = nav?.extras?.state?.['pedido'];

    if (!this.pedido) {
      const salvo = localStorage.getItem('ultimoPedido');
      this.pedido = salvo ? JSON.parse(salvo) : null;
    } else {
      localStorage.setItem('ultimoPedido', JSON.stringify(this.pedido));
    }

    this.numeroCupom = this.pedido?.numeroCupom ?? '00000';
    this.pedidoId    = this.pedido?.pedidoId    ?? null;
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }
}
