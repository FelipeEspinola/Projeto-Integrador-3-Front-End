import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Produto, ProdutoStatus } from '../../models/produto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}${environment.PRODUTOS_PATH}`;

  // 🔁 BACK → FRONT
  private toFront(p: any): Produto {
    return {
      id: Number(p.produto_id ?? p.id),
      nome: p.produto_nome ?? p.nome,
      descricao: p.produto_descricao ?? p.descricao,
      preco: Number(p.produto_preco ?? p.preco) || 0,
      imagemUrl: p.produto_imagem_url ?? p.imagemUrl,
      status: Number(p.produto_status ?? p.status) as ProdutoStatus, // ✅ FIX
      categoriaId: Number(p.categoria_id ?? p.categoriaId)
    };
  }

  // 🔁 FRONT → BACK não é usado: a API de produtos aceita os mesmos nomes
  // de campo que o front já usa (nome, descricao, preco, imagemUrl...),
  // então add()/update() montam o payload direto, sem precisar desse passo.

  private toArray(resp: any): Produto[] {
    let lista: any[] = [];

    if (Array.isArray(resp)) lista = resp;
    else if (Array.isArray(resp?.data)) lista = resp.data;
    else if (Array.isArray(resp?.produtos)) lista = resp.produtos;
    else if (Array.isArray(resp?.result)) lista = resp.result;

    return lista.map((p) => this.toFront(p));
  }

  getAll(): Observable<Produto[]> {
    return this.http.get<any>(this.base).pipe(
      map((r) => this.toArray(r)),
      catchError((err) => {
        console.error('Erro ao buscar produtos', err);
        return of([] as Produto[]);
      })
    );
  }

  getById(id: number): Observable<Produto | null> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(
      map((r) => this.toFront(r?.data ?? r)),
      catchError(() => of(null))
    );
  }

  // ✅ VOLTOU
  getAtivos(): Observable<Produto[]> {
    return this.getAll().pipe(
      map((lista) => lista.filter((p) => p.status !== -1))
    );
  }

  // ✅ VOLTOU
  getAtivosPorCategoria(categoriaId: number): Observable<Produto[]> {
    return this.getAll().pipe(
      map((lista) =>
        lista.filter(
          (p) =>
            p.status === 1 &&
            p.categoriaId === Number(categoriaId)
        )
      )
    );
  }

  add(produto: Produto): Observable<Produto> {
  const payload = {
    nome: produto.nome?.trim(),
    descricao: produto.descricao?.trim(),
    preco: Number(produto.preco) || 0,
    imagemUrl: produto.imagemUrl?.trim(),
    status: Number(produto.status),
    categoriaId: Number(produto.categoriaId)
  };

  console.log('ENVIANDO (ADD CORRIGIDO):', payload);

  return this.http
    .post<any>(this.base, payload)
    .pipe(map((r) => this.toFront(r?.data ?? r)));
}

  update(produto: Produto): Observable<Produto> {
  const payload = {
    id: Number(produto.id),
    nome: produto.nome?.trim(),
    descricao: produto.descricao?.trim(),
    preco: Number(produto.preco) || 0,
    imagemUrl: produto.imagemUrl?.trim(),
    status: Number(produto.status),
    categoriaId: Number(produto.categoriaId)
  };

  console.log('ENVIANDO (UPDATE CORRIGIDO):', payload);

  return this.http
    .put<any>(`${this.base}/${produto.id}`, payload)
    .pipe(map((r) => this.toFront(r?.data ?? r)));
}

// 🔁 delete() é, na prática, um soft delete: equivalente a inativar().
// Antes tinha sua própria cópia da montagem do payload, idêntica à de
// alterarStatus(), só que duplicada.
delete(produto: Produto): Observable<any> {
  return this.inativar(produto);
}

private payloadComStatus(produto: Produto, status: number): any {
  return {
    id: Number(produto.id),
    nome: produto.nome?.trim(),
    descricao: produto.descricao?.trim(),
    preco: Number(produto.preco) || 0,
    imagemUrl: produto.imagemUrl?.trim(),
    status: Number(status),
    categoriaId: Number(produto.categoriaId)
  };
}

 alterarStatus(produto: Produto, status: number): Observable<any> {
  const payload = this.payloadComStatus(produto, status);
  return this.http.put(`${this.base}/${produto.id}`, payload);
  }

inativar(produto: Produto): Observable<any> {
  return this.alterarStatus(produto, -1);
}

restore(produto: Produto): Observable<any> {
  return this.alterarStatus(produto, -1);
}
 
}