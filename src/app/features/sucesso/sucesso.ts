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
  numeroPedido: number = 0;

  constructor(private router: Router) {

    const nav = this.router.getCurrentNavigation();

    // tenta pegar da navegação
    this.pedido = nav?.extras?.state?.['pedido'];

    // fallback (se der F5)
    if (!this.pedido) {
      const salvo = localStorage.getItem('ultimoPedido');
      this.pedido = salvo ? JSON.parse(salvo) : null;
    } else {
      // salva para persistência
      localStorage.setItem('ultimoPedido', JSON.stringify(this.pedido));
    }

    // número do pedido (só gera se existir pedido)
    if (this.pedido) {
      const ultimo = Number(localStorage.getItem('numeroPedido')) || 0;
      this.numeroPedido = ultimo + 1;
      localStorage.setItem('numeroPedido', String(this.numeroPedido));
    }
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }
}