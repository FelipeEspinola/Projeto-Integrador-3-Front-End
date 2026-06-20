export type UsuarioStatus = 1 | 0;

export interface Usuario {
  id: number;
  nome: string;
  login: string;
  status: UsuarioStatus;
}
