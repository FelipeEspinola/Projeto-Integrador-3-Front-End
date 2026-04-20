import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

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
    { id: 1, nome: 'Ofertas', icone: 'assets/imagens/ofertas.png' },
    { id: 2, nome: 'Carnes', icone: 'assets/imagens/carne.png' },
    { id: 3, nome: 'Frango', icone: 'assets/imagens/frango.png' },
    { id: 4, nome: 'Acompanhamento', icone: 'assets/imagens/batata.png' },
    { id: 5, nome: 'Sobremesa', icone: 'assets/imagens/sobremesa.png' },
    { id: 6, nome: 'Bebidas', icone: 'assets/imagens/bebida.png' }
  ];

  selecionar(id: number) {
    this.categoriaAtiva = id;
    this.categoriaSelecionada.emit(id);
  }
}