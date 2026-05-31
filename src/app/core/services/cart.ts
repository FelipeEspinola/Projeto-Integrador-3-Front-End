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
    const item = this.itens.find(i => i.produtoId === produto.id);

    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({
        produtoId: produto.id, // 🔥 CORREÇÃO AQUI
        nome: produto.nome,
        preco: produto.preco,
        imagemUrl: produto.imagemUrl,
        quantidade: 1
      });
    }

    this.salvar();
  }

  removerItem(produtoId: number) {
    this.itens = this.itens.filter(i => i.produtoId !== produtoId);
    this.salvar();
  }

  alterarQuantidade(produtoId: number, delta: number) {
    const item = this.itens.find(i => i.produtoId === produtoId);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
      this.removerItem(produtoId);
      return; // evita salvar duas vezes
    }

    this.salvar();
  }

  getTotal(): number {
    return this.itens.reduce((total, i) => {

      let preco = i.preco;

      if (typeof preco === 'string') {
        preco = Number(
          preco
            .replace(/[^\d,]/g, '')
            .replace(/\./g, '')
            .replace(',', '.')
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