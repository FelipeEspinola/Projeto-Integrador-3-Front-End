import { Component, OnInit } from '@angular/core';
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
export class Sacola implements OnInit {

  itens: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.itens = this.cartService.getItens();
  }

  aumentar(id: number) {
    this.cartService.alterarQuantidade(id, 1);
    this.carregar();
  }

  diminuir(id: number) {
    this.cartService.alterarQuantidade(id, -1);
    this.carregar();
  }

  remover(id: number) {
    this.cartService.removerItem(id);
    this.carregar();
  }

  limpar() {
    this.cartService.limparCarrinho();
    this.carregar();
  }

  get total() {
    return this.cartService.getTotal();
  }
}