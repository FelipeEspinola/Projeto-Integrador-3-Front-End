import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sucesso.html',
  styleUrls: ['./sucesso.css']
})
export class Sucesso {

  pedido: any;
  numeroPedido: number = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.pedido = nav?.extras?.state?.['pedido'];

    // gera número incremental
    const ultimo = Number(localStorage.getItem('numeroPedido')) || 0;
    this.numeroPedido = ultimo + 1;
    localStorage.setItem('numeroPedido', String(this.numeroPedido));
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }
}