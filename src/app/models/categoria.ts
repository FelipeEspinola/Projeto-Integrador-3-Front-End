export type CategoriaStatus = 1 | 0 | -1;

export interface Categoria {
  id: number;
  nome: string;
  status?: CategoriaStatus;
}
