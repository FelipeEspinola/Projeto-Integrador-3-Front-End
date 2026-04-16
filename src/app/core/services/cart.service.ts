import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itens: any[] = [];

  adicionar(produto: any) {
    const item = this.itens.find(i => i.nome === produto.nome);

    if (item) {
      item.qtd++;
    } else {
      this.itens.push({ ...produto, qtd: 1 });
    }
  }

  remover(produto: any) {
    this.itens = this.itens.filter(i => i.nome !== produto.nome);
  }

  aumentar(item: any) {
    item.qtd++;
  }

  diminuir(item: any) {
    if (item.qtd > 1) {
      item.qtd--;
    } else {
      this.remover(item);
    }
  }

  total() {
    return this.itens.reduce((t, i) => t + (i.preco * i.qtd), 0);
  }
}