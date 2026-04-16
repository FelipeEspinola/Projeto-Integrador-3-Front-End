export interface OrderItem {
  id: number;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
  pedidoId: number;
  produtoId: number;
}