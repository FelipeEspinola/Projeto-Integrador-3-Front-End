export type PedidoStatus = 1 | 0 | -1;

export interface Pedido {
  id?: number;
  /**
   * Número do pedido no BD. Como o campo é Integer (e não aceita string/UUID),
   * usamos o próprio id auto-incrementado: após criar o pedido (POST sem
   * numero definitivo), fazemos um PUT setando numero = id.
   */
  numero?: number;
  data: string;
  total: number;
  status: PedidoStatus;
}
