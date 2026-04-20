import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Service
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  usuario = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  entrar() {
    const ok = this.auth.login(this.usuario, this.senha);

    if (ok) {
      this.router.navigate(['/admin']);
    } else {
      alert('Login inválido');
    }
  }
}