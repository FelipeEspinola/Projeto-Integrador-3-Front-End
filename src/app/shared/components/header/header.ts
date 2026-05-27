import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Service
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  itens: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.itens = this.cartService.getItens();
  }

  get contador(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

}