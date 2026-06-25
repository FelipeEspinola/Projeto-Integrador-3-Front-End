import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CartService } from '../../core/services/cart';
import { OrderService } from '../../core/services/order';
import { ItemPedidoService } from '../../core/services/item-pedido';
import { PedidoNumeroService } from '../../core/services/pedido-numero';
import { Pedido } from '../../models/pedido';
import { parseMoeda } from '../../shared/utils/money';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pagamento.html',
  styleUrls: ['./pagamento.css']
})
export class Pagamento {

  metodoSelecionado = '';
  processando = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private itemPedidoService: ItemPedidoService,
    private pedidoNumeroService: PedidoNumeroService,
    private router: Router
  ) {}

  pagar(metodo: string) {
    if (this.processando) return;

    this.metodoSelecionado = metodo;
    this.processando = true;

    const itens = this.cartService.getItens();

    // Número sequencial só para exibição no cupom/organização da cozinha (00001–10000)
    const numeroCupom = this.pedidoNumeroService.proximoNumero();

    const pedidoApi: Pedido = {
      // "numero" é NOT NULL no BD, então mandamos um valor provisório aqui
      // (o próprio número sequencial do cupom, já é inteiro). Assim que o
      // pedido existe e ganha um id de verdade, atualizamos numero = id.
      numero: Number(numeroCupom),
      data: new Date().toISOString(),
      total: this.cartService.getTotal(),
      status: 1
    };

    this.orderService.add(pedidoApi).pipe(
      // Assim que o pedido é criado e ganha um id, gravamos numero = id
      switchMap((pedidoCriado: Pedido) => {
        if (!pedidoCriado?.id) {
          throw new Error('pedidoId não veio na resposta da API');
        }
        return this.orderService.update({ ...pedidoCriado, numero: pedidoCriado.id });
      })
    ).subscribe({
      next: (pedidoSalvo: Pedido) => {
        const pedidoId = pedidoSalvo?.id ?? pedidoSalvo?.numero;

        if (!pedidoId) {
          console.error('ERRO: pedidoId não veio na resposta da API', pedidoSalvo);
          this.processando = false;
          alert('Erro ao finalizar pedido');
          return;
        }

        const requisicoesItens = itens.map((item: any) => {
          const preco = parseMoeda(item.preco);
          const qty   = Number(item.quantidade);

          const itemPedido = {
            quantidade:     qty,
            precoUnitario:  preco,
            subtotal:       preco * qty,
            status:         1,
            pedidoId:       Number(pedidoId),
            pedidoNumero:   Number(pedidoId), // numero do pedido = id
            produtoId:      Number(item.produtoId),
            produtoNome:    item.nome
          };

          return this.itemPedidoService.add(itemPedido).pipe(
            catchError((err) => { console.error('Erro item:', err); return of(null); })
          );
        });

        const todos = requisicoesItens.length ? requisicoesItens : [of(null)];

        forkJoin(todos).subscribe(() => {
          const pedidoFront = {
            pedidoId,               // = numero real gravado no BD
            numeroCupom,            // "00042" — destaque no topo do cupom (organização da cozinha)
            itens,
            total: pedidoApi.total,
            data: new Date(),
            tipoPedido: localStorage.getItem('tipoPedido'),
            metodoPagamento: metodo
          };

          this.cartService.limparCarrinho();
          this.processando = false;
          this.router.navigate(['/sucesso'], { state: { pedido: pedidoFront } });
        });
      },

      error: (err) => {
        console.error('Erro ao salvar pedido:', err?.error ?? err);
        this.processando = false;
        alert('Erro ao finalizar pedido');
      }
    });
  }

  cancelarPedido() {
    if (confirm('Deseja cancelar o pedido?')) {
      this.cartService.limparCarrinho();
      this.router.navigate(['/']);
    }
  }
}
