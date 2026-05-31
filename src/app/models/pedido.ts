import { ItemPedido } from './item-pedido';

export interface Pedido {
  id: number;
  data: Date;
  total: number;
  status: string;
  itens: ItemPedido[];
}