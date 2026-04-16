import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user: any = null;

  login(login: string, senha: string) {
    if (login === 'admin' && senha === '123') {
      this.user = { nome: 'Admin' };
      return true;
    }
    return false;
  }

  isAuthenticated() {
    return this.user !== null;
  }

  logout() {
    this.user = null;
  }
}