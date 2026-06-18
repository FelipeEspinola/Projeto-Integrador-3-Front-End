import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { Header } from '../../shared/components/header/header';
import { MenuLateral } from '../../shared/components/menu-lateral/menu-lateral';
import { ProductCard } from '../../shared/components/product-card/product-card';

// SERVICE
import { ProductService } from '../../core/services/product';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, Header, MenuLateral, ProductCard],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit {
  categoriaSelecionada = 1;
  produtosFiltrados: Produto[] = [];
  carregando = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  trocarCategoria(categoriaId: number) {
    this.categoriaSelecionada = categoriaId;
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;

    this.productService
      .getAtivosPorCategoria(this.categoriaSelecionada)
      .subscribe({
        next: (lista: Produto[]) => {
          this.produtosFiltrados = lista;
          this.carregando = false;
        },
        error: (err: any) => {
          console.error('Erro ao carregar produtos do menu:', err);
          this.produtosFiltrados = [];
          this.carregando = false;
        },
      });
  }
}