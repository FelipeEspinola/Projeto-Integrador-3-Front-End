import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ItemPedido } from '../../models/item-pedido';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemPedidoService {

  private http = inject(HttpClient);
  // Mesmo padrão usado em OrderService/ProductService/CategoryService
  // (antes havia uma "/" extra aqui, gerando barra duplicada em produção).
  private base = `${environment.apiUrl}${environment.ITENS_PEDIDOS_PATH}`;

  add(item: ItemPedido): Observable<ItemPedido> {
    return this.http.post<ItemPedido>(this.base, item);
  }
}