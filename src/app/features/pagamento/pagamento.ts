import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Services
import { CartService } from '../../core/services/cart';
import { OrderService } from '../../core/services/order';
import { ItemPedidoService } from '../../core/services/item-pedido';
import { Pedido } from '../../models/pedido';

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
  processando = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private itemPedidoService: ItemPedidoService,
    private router: Router
  ) {}

  pagar(metodo: string) {
    if (this.processando) return; // evita clique duplo / pedido duplicado

    this.metodoSelecionado = metodo;
    this.processando = true;

    const itens = this.cartService.getItens();

    const pedidoApi: Pedido = {
      numero: Math.floor(Math.random() * 10000),
      data: new Date().toISOString(),
      total: this.cartService.getTotal(),
      status: 1
    };

    this.orderService.add(pedidoApi).subscribe({
      next: (pedidoSalvo: Pedido) => {

        const pedidoId = pedidoSalvo?.id;
        const pedidoNumero = pedidoSalvo?.numero;

        if (!pedidoId) {
          console.error('ERRO: pedidoId não veio na resposta da API', pedidoSalvo);
          this.processando = false;
          alert('Erro ao finalizar pedido');
          return;
        }

        // monta a requisição de cada item do pedido
        const requisicoesItens = itens.map((item: any) => {
          const preco = Number(item.preco);

          const itemPedido = {
            quantidade: Number(item.quantidade),
            precoUnitario: preco,
            subtotal: preco * Number(item.quantidade),
            status: 1,
            pedidoId: Number(pedidoId),
            pedidoNumero: Number(pedidoNumero),
            produtoId: Number(item.produtoId),
            produtoNome: item.nome
          };

          return this.itemPedidoService.add(itemPedido).pipe(
            catchError((err) => {
              console.error('Erro item:', err, itemPedido);
              return of(null); // não trava os outros itens se um falhar
            })
          );
        });

        // só navega para "sucesso" depois que TODOS os itens
        // terminarem de ser salvos (antes disso a navegação
        // acontecia em paralelo, sem esperar a resposta da API)
        const todosOsItens = requisicoesItens.length ? requisicoesItens : [of(null)];

        forkJoin(todosOsItens).subscribe(() => {
          const pedidoFront = {
            numero: pedidoNumero,
            itens,
            total: pedidoApi.total,
            data: new Date(),
            tipoPedido: localStorage.getItem('tipoPedido'),
            metodoPagamento: metodo
          };

          this.cartService.limparCarrinho();
          this.processando = false;

          this.router.navigate(['/sucesso'], {
            state: { pedido: pedidoFront }
          });
        });
      },

      error: (err) => {
        console.error('Erro ao salvar pedido:', err);
        this.processando = false;
        alert('Erro ao finalizar pedido');
      }
    });
  }

  cancelarPedido() {
    const confirmar = confirm('Deseja cancelar o pedido?');

    if (confirmar) {
      this.cartService.limparCarrinho();
      this.router.navigate(['/']);
    }
  }
}
