import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,   // ← necessário para *ngIf funcionar
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  usuario    = '';
  senha      = '';
  carregando = false;
  erro       = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  entrar() {
    if (!this.usuario || !this.senha) {
      this.erro = 'Preencha usuário e senha.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.auth.login(this.usuario, this.senha).then(ok => {
      this.carregando = false;
      if (ok) {
        this.router.navigate(['/admin']);
      } else {
        this.erro = 'Usuário ou senha inválidos.';
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
