import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Material
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

  selecionarMetodo(metodo: string) {
    this.metodoSelecionado = metodo;
  }

  finalizarPedido() {
    if (!this.metodoSelecionado) {
      alert('Selecione uma forma de pagamento');
      return;
    }

    // Simulação de envio para backend
    const pedido = {
      itens: this.cartService.getItens(),
      total: this.cartService.getTotal(),
      metodoPagamento: this.metodoSelecionado,
      data: new Date()
    };

    console.log('Pedido finalizado:', pedido);

    // Limpa carrinho
    this.cartService.limparCarrinho();

    // Redireciona para sucesso
    this.router.navigate(['/sucesso']);
  }
}