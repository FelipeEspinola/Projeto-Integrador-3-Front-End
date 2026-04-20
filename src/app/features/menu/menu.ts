import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES
import { Header } from '../../shared/components/header/header';
import { MenuLateral } from '../../shared/components/menu-lateral/menu-lateral';
import { ProductCard } from '../../shared/components/product-card/product-card';

// SERVICE
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule, // 👈 ngFor, ngIf
    Header,
    MenuLateral,
    ProductCard
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {

  categoriaSelecionada = 1;
  produtosFiltrados: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  trocarCategoria(categoriaId: number) {
    this.categoriaSelecionada = categoriaId;
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtosFiltrados =
      this.productService.getAtivosPorCategoria(this.categoriaSelecionada);
  }
}