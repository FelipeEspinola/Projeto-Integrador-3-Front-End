import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemPedidoService {

  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/${environment.ITENS_PEDIDOS_PATH}`;

  
}