import { Injectable } from '@angular/core';
import { Produto } from '../../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itens: any[] = [];

  constructor() {
    const dados = sessionStorage.getItem('sacola');
    this.itens = dados ? JSON.parse(dados) : [];
  }

  getItens() {
    return this.itens;
  }

  addItem(produto: Produto) {
    const item = this.itens.find(i => i.produtos_id === produto.produtos_id);

    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({ ...produto, quantidade: 1 });
    }

    this.salvar();
  }

  removerItem(produtoId: number) {
    this.itens = this.itens.filter(i => i.produtos_id !== produtoId);
    this.salvar();
  }

  alterarQuantidade(produtoId: number, delta: number) {
    const item = this.itens.find(i => i.produtos_id === produtoId);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
      this.removerItem(produtoId);
    }

    this.salvar();
  }

getTotal(): number {
  return this.itens.reduce((total, i) => {

    let preco = i.preco;

    // se vier como string, converte
    if (typeof preco === 'string') {
      preco = Number(
        preco
          .replace(/[^\d,]/g, '') // remove R$, espaços etc
          .replace(/\./g, '')     // remove milhar
          .replace(',', '.')      // decimal
      );
    }

    return total + (preco * i.quantidade);

  }, 0);
}
  limparCarrinho() {
    this.itens = [];
    sessionStorage.removeItem('sacola');
  }

  private salvar() {
    sessionStorage.setItem('sacola', JSON.stringify(this.itens));
  }
}