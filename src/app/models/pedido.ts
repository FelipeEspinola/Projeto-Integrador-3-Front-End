import { ItemPedido } from './item-pedido';

export interface Pedido {
  pedidos_id: number;
  pedido_data: Date;
  pedido_total: number;
  pedido_status: string;
  itens: ItemPedido[];
}