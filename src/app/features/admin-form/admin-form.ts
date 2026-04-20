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
    produtos_nome: '',
    preco: 0,
    imagem_url: '',
    descricao: '',
    categoria_id: 1,
    status: 1,
  };

  editando = false;

  constructor(
    private service: ProductService,
    private router: Router
  ) {
    const state = history.state;

    if (state && state.produtos_id) {
      this.produto = state;
      this.editando = true;
    }
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