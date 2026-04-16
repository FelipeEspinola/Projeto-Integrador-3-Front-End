import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      nome: 'Hambúrguer',
      descricao: 'Hambúrguer artesanal',
      preco: 25,
      imagemUrl: 'assets/imagens/burger.png',
      ativo: true,
      categoriaId: 1
    },
    {
      id: 2,
      nome: 'Batata Frita',
      descricao: 'Porção média',
      preco: 15,
      imagemUrl: 'assets/imagens/fries.png',
      ativo: true,
      categoriaId: 2
    }
  ];

  getAll() {
    return this.products.filter(p => p.ativo);
  }

  getByCategory(categoriaId: number) {
    return this.products.filter(p => p.categoriaId === categoriaId);
  }
}