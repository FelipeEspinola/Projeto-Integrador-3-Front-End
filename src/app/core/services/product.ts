import { Injectable } from '@angular/core';
import { Produto } from '../../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || '[]');

  getAll(): Produto[] {
    return this.produtos;
  }

  // 🔥 opcional (muito útil)
  getAtivosPorCategoria(categoriaId: number) {
  return this.produtos.filter(p =>
    p.status === 1 &&
    p.categoria_id === categoriaId
  );
}

  add(produto: Produto) {
    produto.produtos_id = Date.now();

    // padrão seguro
    produto.status = produto.status || 1;

    this.produtos.push(produto);
    this.salvar();
  }

  update(produto: Produto) {
    this.produtos = this.produtos.map(p =>
      p.produtos_id === produto.produtos_id ? produto : p
    );

    this.salvar();
  }

  // ✅ SOFT DELETE (CORRETO)
  delete(id: number) {
    this.produtos = this.produtos.map(p =>
      p.produtos_id === id
        ? { ...p, status: 3 }
        : p
    );

    this.salvar();
  }

  private salvar() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }

}