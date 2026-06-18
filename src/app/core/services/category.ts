import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Categoria } from '../../models/categoria';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}${environment.CATEGORIAS_PATH}`;

  private toArray(r: any): Categoria[] {
    if (Array.isArray(r)) return r;
    if (Array.isArray(r?.data)) return r.data;
    if (Array.isArray(r?.categorias)) return r.categorias;
    return [];
  }

  getAll(): Observable<Categoria[]> {
    return this.http.get<any>(this.base).pipe(
      map((r) => this.toArray(r)),
      catchError(() => of([] as Categoria[]))
    );
  }

  getAtivas(): Observable<Categoria[]> {
    return this.getAll().pipe(
      map((lista) => lista.filter((c) => c.status === undefined || Number(c.status) !== -1))
    );
  }

  add(cat: Categoria): Observable<Categoria> {
    const payload: any = { ...cat, status: cat.status ?? 1 };
    delete payload.id;
    return this.http.post<any>(this.base, payload).pipe(map((r) => (r?.data ?? r) as Categoria));
  }

  update(cat: Categoria): Observable<Categoria> {
    return this.http
      .put<any>(`${this.base}/${cat.id}`, cat)
      .pipe(map((r) => (r?.data ?? r) as Categoria));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`).pipe(
      catchError(() => this.http.put<any>(`${this.base}/${id}`, { id, status: -1 }))
    );
  }
}
