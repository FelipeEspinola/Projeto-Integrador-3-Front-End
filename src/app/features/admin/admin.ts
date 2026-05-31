import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Services
import { ProductService } from '../../core/services/product';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  produtos: any[] = [];
  produtosOriginais: any[] = [];
  filtro: string = '';

  constructor(
    private service: ProductService,
    private router: Router,
    private auth: AuthService
  ) {
    this.carregar();
  }

 carregar() {
    this.produtosOriginais = this.service.getAtivos();

    this.produtos = [...this.produtosOriginais];
  }

  filtrar() {
  const termo = this.filtro.toLowerCase();

  this.produtos = this.produtosOriginais.filter(p =>
    p.status !== 3 && (
      (p.nome && p.nome.toLowerCase().includes(termo)) ||
      (p.descricao && p.descricao.toLowerCase().includes(termo))
    )
  );
  }

  novo() {
    this.router.navigate(['/admin/novo']);
  }

  editar(produto: any) {
    this.router.navigate(['/admin/novo'], { state: produto });
  }

  deletar(produto: any) {
    const confirmar = confirm(`Deseja deletar "${produto.nome}"?`);
    if (!confirmar) return;

    this.service.delete(produto.id);
    this.carregar();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getStatusTexto(status: number): string {
    switch (status) {
      case 1: return 'Ativo';
      case 2: return 'Inativo';
      case 3: return 'Deletado';
      default: return 'Desconhecido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'ativo';
      case 2: return 'inativo';
      case 3: return 'deletado';
      default: return '';
    }
  }
}