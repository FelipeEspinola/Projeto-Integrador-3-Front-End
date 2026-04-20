import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Service
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-sacola',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sacola.html',
  styleUrls: ['./sacola.css']
})
export class Sacola {

  itens: any[] = [];

  constructor(private cartService: CartService) {
    this.itens = this.cartService.getItens();
  }

  aumentar(id: number) {
  this.cartService.alterarQuantidade(id, 1);
  this.itens = this.cartService.getItens();
  }

  diminuir(id: number) {
    this.cartService.alterarQuantidade(id, -1);
  }

  remover(id: number) {
    this.cartService.removerItem(id);
  }

  get total() {
    return this.cartService.getTotal();
  }

  limpar() {
    this.cartService.limparCarrinho();
    this.itens = [];
  }
}