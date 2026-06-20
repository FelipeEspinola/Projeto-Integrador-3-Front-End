import { Injectable } from '@angular/core';

/**
 * Gera e mantém um número sequencial de cupom de 00001 a 10000.
 * Quando chega a 10000 reinicia do 00001.
 * Persiste em localStorage para sobreviver a refresh mas,
 * por ser um totem de uso único, isso é suficiente.
 */
@Injectable({ providedIn: 'root' })
export class PedidoNumeroService {

  private readonly CHAVE = 'pedidoContador';

  /** Retorna o próximo número formatado (ex: "00042") e já incrementa */
  proximoNumero(): string {
    const atual = this.lerContador();
    const proximo = atual >= 10000 ? 1 : atual + 1;
    localStorage.setItem(this.CHAVE, String(proximo));
    return this.formatar(proximo);
  }

  /** Só formata sem incrementar — útil para exibição de preview */
  pegarAtual(): string {
    return this.formatar(this.lerContador());
  }

  private lerContador(): number {
    const salvo = parseInt(localStorage.getItem(this.CHAVE) ?? '0', 10);
    return isNaN(salvo) || salvo < 1 ? 0 : salvo;
  }

  private formatar(n: number): string {
    return String(n).padStart(5, '0');
  }
}
