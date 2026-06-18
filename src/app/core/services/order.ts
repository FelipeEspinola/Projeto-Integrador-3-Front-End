import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Pedido } from '../../models/pedido';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}${environment.PEDIDOS_PATH}`;

  private toArray(r: any): Pedido[] {
    if (Array.isArray(r)) return r;
    if (Array.isArray(r?.data)) return r.data;
    if (Array.isArray(r?.pedidos)) return r.pedidos;
    return [];
  }

  getAll(): Observable<Pedido[]> {
    return this.http.get<any>(this.base).pipe(
      map((r) => this.toArray(r)),
      catchError(() => of([] as Pedido[]))
    );
  }

  getAtivos(): Observable<Pedido[]> {
    return this.getAll().pipe(map((l) => l.filter((p) => Number(p.status) !== -1)));
  }

  add(pedido: Pedido): Observable<Pedido> {
    const payload: any = { ...pedido, status: pedido.status ?? 1 };
    delete payload.id;
    // ⚠️ Não usar "r?.data ?? r" aqui: o próprio Pedido tem um campo chamado
    // "data" (a data do pedido), então isso pegava a string de data no lugar
    // do objeto inteiro e fazia o pedidoId chegar como undefined/NaN.
    return this.http.post<Pedido>(this.base, payload);
  }

  update(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.base}/${pedido.id}`, pedido);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`).pipe(
      catchError(() => this.http.put<any>(`${this.base}/${id}`, { id, status: -1 }))
    );
  }
}
