import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logado = false;

  login(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === '123') {
      this.logado = true;
      sessionStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  isLogado(): boolean {
    return sessionStorage.getItem('auth') === 'true';
  }

  logout() {
    sessionStorage.removeItem('auth');
  }
}