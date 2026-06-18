export type PedidoStatus = 1 | 0 | -1;

// Reflete o que a API de /api/pedidos realmente espera/retorna.
// Os campos usuarioId/itens/criadoEm não existiam de fato no fluxo
// (e por isso o front sempre precisava usar "as any" para conseguir
// montar o payload — o que escondia o bug do "data" do compilador).
export interface Pedido {
  id?: number;
  numero: number;
  data: string;
  total: number;
  status: PedidoStatus;
}
