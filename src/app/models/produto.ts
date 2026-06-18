// Soft delete: 1 = ativo | 0 = inativo | -1 = deletado
export type ProdutoStatus = 1 | 0 | -1;

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
  status: ProdutoStatus;
  categoriaId: number;
}
