import { Injectable } from '@angular/core';
import { Produto } from '../../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || '[]');

  // Retorna TODOS (inclusive deletados)
  getAll(): Produto[] {
    return this.produtos;
  }

  // retorna apenas ativos (usar no admin/listas)
  getAtivos(): Produto[] {
    return this.produtos.filter(p => p.status !== 3);
  }

  
  getAtivosPorCategoria(categoriaId: number): Produto[] {
    return this.produtos.filter(p =>
      p.status === 1 &&
      p.categoriaId === categoriaId
    );
  }

  add(produto: Produto) {
    produto.id = Date.now();

    // garante status padrão
    produto.status = produto.status ?? 1;

    this.produtos.push(produto);
    this.salvar();
  }

  update(produto: Produto) {
    this.produtos = this.produtos.map(p =>
      p.id === produto.id ? produto : p
    );

    this.salvar();
  }

  // SOFT DELETE
  delete(id: number) {
    this.produtos = this.produtos.map(p =>
      p.id === id
        ? { ...p, status: 3 }
        : p
    );

    this.salvar();
  }

  // Restaurar produto deletado
  restore(id: number) {
    this.produtos = this.produtos.map(p =>
      p.id === id
        ? { ...p, status: 1 }
        : p
    );

    this.salvar();
  }

  private salvar() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }
}