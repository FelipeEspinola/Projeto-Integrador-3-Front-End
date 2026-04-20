import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    MatIconModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  produtos: any[] = [];

  constructor(
    private service: ProductService,
    private router: Router,
    private auth: AuthService
  ) {
    this.carregar();
  }

  // 🔄 Carrega produtos
  carregar() {
    this.produtos = this.service.getAll();
  }

  // ➕ Novo produto
  novo() {
    this.router.navigate(['/admin/novo']);
  }

  // ✏️ Editar
  editar(produto: any) {
    this.router.navigate(['/admin/novo'], { state: produto });
  }

  // 🗑️ Soft delete
  deletar(produto: any) {
    const confirmar = confirm(`Deseja deletar "${produto.produtos_nome}"?`);
    if (!confirmar) return;

    this.service.delete(produto.produtos_id);
    this.carregar();
  }

  // 🔐 Logout
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // 📊 Texto do status
  getStatusTexto(status: number): string {
    switch (status) {
      case 1: return 'Ativo';
      case 2: return 'Inativo';
      case 3: return 'Deletado';
      default: return 'Desconhecido';
    }
  }

  // 🎨 Classe CSS do status
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'ativo';
      case 2: return 'inativo';
      case 3: return 'deletado';
      default: return '';
    }
  }

}