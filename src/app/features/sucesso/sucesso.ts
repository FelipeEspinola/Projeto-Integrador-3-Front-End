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

  // ⚠️ O pedido (e os itens dele) já são criados na API dentro de
  // Pagamento.pagar(). Esta tela só EXIBE a confirmação — antes ela
  // criava o pedido de novo aqui (com um número local desencontrado
  // do número real), duplicando o pedido e os itens no banco.
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.pedido = nav?.extras?.state?.['pedido'];

    if (!this.pedido) {
      const salvo = localStorage.getItem('ultimoPedido');
      this.pedido = salvo ? JSON.parse(salvo) : null;
    } else {
      localStorage.setItem('ultimoPedido', JSON.stringify(this.pedido));
    }

    this.numeroPedido = this.pedido?.numero ?? 0;
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }
}
