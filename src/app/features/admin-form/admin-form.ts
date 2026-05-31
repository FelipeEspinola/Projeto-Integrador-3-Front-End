import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

// Service
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
  RouterModule,
  CommonModule,
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule
],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.css']
})
export class AdminForm {

  produto: any = {
    nome: '',
    preco: 0,
    imagemUrl: '',
    descricao: '',
    categoriaId: 1,
    status: 1,
  };

  editando = false;

  constructor(
    private service: ProductService,
    private router: Router
  ) {
    const state = history.state;

    if (state && state.id) {
      this.produto = state;
      this.editando = true;
    }
  }

converterPreco(valor: any): number {
  if (!valor) return 0;

  // Se já for número, retorna direto
  if (typeof valor === 'number') {
    return valor;
  }

  // Remove tudo que não for número ou vírgula
  let limpo = valor
    .toString()
    .replace(/[^\d,]/g, '') // remove R$, espaços, etc
    .replace(/\./g, '')     // remove milhar
    .replace(',', '.');     // decimal

  const numero = Number(limpo);

  return isNaN(numero) ? 0 : numero;
}


  salvar() {
    if (this.editando) {
      this.service.update(this.produto);
    } else {
      this.service.add(this.produto);
    }

    this.router.navigate(['/admin']);
  }
}