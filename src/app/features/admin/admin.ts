import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from '../../core/services/product';
import { AuthService } from '../../core/services/auth';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin implements OnInit {
  produtos: Produto[] = [];
  produtosOriginais: Produto[] = [];
  filtro = '';
  carregando = false;

  constructor(
    private service: ProductService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;

    this.service.getAll().subscribe({
      next: (lista: Produto[]) => {
        const ordenada = this.ordenarPorNome(lista);
        this.produtosOriginais = ordenada;
        this.produtos = [...ordenada];
        this.carregando = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar admin:', err);
        this.produtos = [];
        this.produtosOriginais = [];
        this.carregando = false;
      },
    });
  }

  // ordena por nome (A-Z), respeitando acentos do português
  private ordenarPorNome(lista: Produto[]): Produto[] {
    return [...lista].sort((a, b) =>
      (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' })
    );
  }

  filtrar() {
    const termo = (this.filtro || '').toLowerCase().trim();

    if (!termo) {
      this.produtos = [...this.produtosOriginais];
      return;
    }

    this.produtos = this.produtosOriginais.filter((p) => {
      const nome = (p.nome || '').toLowerCase();
      const descricao = (p.descricao || '').toLowerCase();

      return nome.includes(termo) || descricao.includes(termo);
    });
  }

  novo() {
    this.router.navigate(['/admin/novo']);
  }

  editar(produto: Produto) {
    this.router.navigate(['/admin/novo'], { state: produto });
  }

  deletar(produto: Produto) {
    const ok = confirm(`Deseja deletar "${produto.nome}"?`);
    if (!ok) return;

    this.service.delete(produto).subscribe({
      next: () => {
        // 🔥 remove direto da lista (mais rápido que recarregar tudo)
        this.produtos = this.produtos.filter(p => p.id !== produto.id);
        this.produtosOriginais = this.produtosOriginais.filter(p => p.id !== produto.id);
      },
      error: (err: any) => {
        console.error('Falha ao deletar:', err);
        alert('Não foi possível deletar o produto.');
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}