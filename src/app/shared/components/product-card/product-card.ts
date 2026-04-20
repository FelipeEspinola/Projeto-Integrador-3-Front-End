import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// MODEL
import { Produto } from '../../../models/produto';

// SERVICE
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {

  @Input() produto!: Produto;

  constructor(private cartService: CartService) {}

  adicionar() {
    this.cartService.addItem(this.produto);
    console.log('Adicionado ao carrinho');
  }
}