import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuLateralComponent } from '../../shared/components/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../../shared/components/cart/cart';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, CartComponent], // ✅ AQUI
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {

  categoria = '';
  produtos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService // ✅ AQUI
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.categoria = url[0]?.path || 'ofertas';
      this.carregarProdutos();
    });
  }

  carregarProdutos() {
    const todos = [
      { nome: 'Hamburger', preco: 25.90, img: 'burger.png', categoria: 'carnes' },
      { nome: 'Hamburger de Frango', preco: 23.90, img: 'frango.png', categoria: 'frango' },
      { nome: 'Batata Frita', preco: 14.90, img: 'batata.png', categoria: 'acompanhamentos' },
      { nome: 'Sundae de Chocolate', preco: 19.90, img: 'sundae.png', categoria: 'sobremesas' }
    ];

    this.produtos = todos.filter(p =>
      this.categoria === 'ofertas' || p.categoria === this.categoria
    );
  }

  adicionar(produto: any) {
    this.cartService.adicionar(produto);
  }
}