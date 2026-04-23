import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {

  @Input() produto!: Produto;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  adicionar() {
    this.cartService.addItem(this.produto);

    this.snackBar.open(
      'Produto adicionado à sacola 🛍️',
      'OK',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }
}