import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { ProductService } from '../../core/services/product';
import { Produto } from '../../models/produto';
import { parseMoeda } from '../../shared/utils/money';

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
    MatCardModule,
  ],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.css'],
})
export class AdminForm {
  produto: Produto = {
    id: 0,
    nome: '',
    preco: 0,
    imagemUrl: '',
    descricao: '',
    categoriaId: 1,
    status: 1,
  };

  editando = false;
  salvando = false;

  constructor(private service: ProductService, private router: Router) {
    const state: any = history.state;
    if (state && state.id) {
      this.produto = { ...state };
      this.editando = true;
    }
  }

  salvar() {
    if (this.salvando) return;
    this.salvando = true;

    // ✅ monta payload LIMPO (sem sujeira do form)
    const payload: any = {
      nome: this.produto.nome?.trim(),
      descricao: this.produto.descricao?.trim(),
      preco: parseMoeda(this.produto.preco),
      imagemUrl: this.produto.imagemUrl?.trim(),
      categoriaId: Number(this.produto.categoriaId),
      status: Number(this.produto.status),
    };

    // 👉 só manda ID se for edição
    if (this.editando) {
      payload.id = this.produto.id;
    }

    console.log('ENVIANDO PAYLOAD CORRIGIDO:', payload);

    const obs = this.editando
      ? this.service.update(payload)
      : this.service.add(payload);

    obs.subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.salvando = false;
        console.error('Falha ao salvar produto:', err);

        alert(
          'Erro ao salvar produto.\n' +
            (err?.error?.message || 'Verifique os dados enviados.')
        );
      },
    });
  }
}