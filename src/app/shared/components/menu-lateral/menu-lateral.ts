import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

// SERVICE
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.html',
  styleUrls: ['./menu-lateral.css']
})
export class MenuLateral {

  @Output() categoriaSelecionada = new EventEmitter<number>();

  categoriaAtiva = 1;

  categorias = [
    { id: 1, nome: 'Ofertas', icone: 'assets/imagens/Megafone.png' },
    { id: 2, nome: 'Carnes', icone: 'assets/imagens/Carne.png' },
    { id: 3, nome: 'Frango', icone: 'assets/imagens/Frango.png' },
    { id: 4, nome: 'Acompanhamento', icone: 'assets/imagens/BatataFrita.png' },
    { id: 5, nome: 'Sobremesa', icone: 'assets/imagens/Sundae.png' },
    { id: 6, nome: 'Bebidas', icone: 'assets/imagens/Refrigerante.png' }
  ];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  selecionar(id: number) {
    this.categoriaAtiva = id;
    this.categoriaSelecionada.emit(id);
  }

  cancelarPedido() {
    this.cartService.limparCarrinho();
    this.router.navigate(['/']); // 👈 volta pra home
  }
}