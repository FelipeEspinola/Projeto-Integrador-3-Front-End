import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Produto } from '../../../models/produto';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  // MatSnackBarModule removido — substituído pelo modal inline
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {

  @Input() produto!: Produto;

  mostrarModal = false;
  private timer: any;

  constructor(private cartService: CartService) {}

  adicionar() {
    this.cartService.addItem(this.produto);
    this.exibirModal();
  }

  private exibirModal() {
    // cancela timer anterior se o usuário clicar muito rápido
    if (this.timer) clearTimeout(this.timer);
    this.mostrarModal = true;
    this.timer = setTimeout(() => { this.mostrarModal = false; }, 500);
  }
}
