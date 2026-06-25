import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario } from '../../models/usuario';

/**
 * ⚠️ LIMITAÇÃO IMPORTANTE:
 * O endpoint real (GET /api/usuarios) devolve { id, nome, login, status }
 * — sem nenhum campo de senha. Ou seja, o backend hoje não tem como o
 * front validar uma senha de verdade (e nem deveria expor isso numa
 * lista pública de usuários).
 *
 * Solução atual, dado o que existe hoje:
 *  1) Busca a lista real de usuários na API e confirma que o "login"
 *     digitado existe e está ativo (status === 1) — isso É validado
 *     contra o backend de verdade.
 *  2) Como a senha não vem da API, ela é comparada com um hash SHA-256
 *     guardado localmente (a senha em claro nunca fica no código).
 *
 * Quando o backend ganhar um endpoint de login de verdade (ex: POST
 * /api/auth/login recebendo { login, senhaHash } e respondendo 200/401),
 * troque o passo 2 por uma chamada a esse endpoint e pode remover o
 * HASH_ESPERADO local.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private base = `${environment.apiUrl}${environment.USUARIOS_PATH}`;

  // Hash SHA-256 da senha "123" — troque aqui se mudar a senha.
  // Gerar novo hash: https://emn178.github.io/online-tools/sha256.html
  private readonly HASH_ESPERADO =
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';

  async login(login: string, senha: string): Promise<boolean> {
    let usuarios: Usuario[] = [];

    try {
      usuarios = await firstValueFrom(this.http.get<Usuario[]>(this.base));
    } catch (err) {
      console.error('Erro ao consultar usuários:', err);
      return false;
    }

    const usuario = usuarios.find(
      u => u.login?.toLowerCase() === login.toLowerCase() && u.status === 1
    );

    if (!usuario) return false;

    const hashDigitado = await this.sha256(senha);
    const ok = hashDigitado === this.HASH_ESPERADO;

    if (ok) sessionStorage.setItem('auth', 'true');
    return ok;
  }

  isLogado(): boolean {
    return sessionStorage.getItem('auth') === 'true';
  }

  logout() {
    sessionStorage.removeItem('auth');
  }

  /** SHA-256 via Web Crypto API (nativa no browser, sem dependência externa) */
  private async sha256(texto: string): Promise<string> {
    const buffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(texto)
    );
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
