import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Material (pode manter ou remover depois)
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Service
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './pagamento.html',
  styleUrls: ['./pagamento.css']
})
export class Pagamento {

  metodoSelecionado: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  pagar(metodo: string) {
    this.metodoSelecionado = metodo;

    // pequeno delay pra dar feedback visual
    setTimeout(() => {

      const pedido = {
      itens: this.cartService.getItens(),
      total: this.cartService.getTotal(),
      metodoPagamento: metodo,
      tipoPedido: localStorage.getItem('tipoPedido'), // 👈 ESSENCIAL
      data: new Date()
    };

      console.log('Pedido finalizado:', pedido);

      // limpa carrinho
      this.cartService.limparCarrinho();

      // redireciona
      this.router.navigate(['/sucesso'], {
      state: { pedido }
    });

    }, 300);
  }

  cancelarPedido() {
    const confirmar = confirm('Deseja cancelar o pedido?');

    if (confirmar) {
      this.cartService.limparCarrinho();
      this.router.navigate(['/']);
    }
  }
}