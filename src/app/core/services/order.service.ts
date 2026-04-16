import { Injectable, signal } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { OrderItem } from '../../shared/models/order-item.model';

export type ConsumptionType = 'local' | 'viagem' | null;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Order[] = [];

  // 🆕 NOVO: tipo de consumo
  private consumptionType = signal<ConsumptionType>(null);

  // 🆕 SET
  setConsumptionType(type: ConsumptionType) {
    this.consumptionType.set(type);
  }

  // 🆕 GET
  getConsumptionType() {
    return this.consumptionType();
  }

  // 🆕 RESET (útil depois do pagamento)
  clearConsumptionType() {
    this.consumptionType.set(null);
  }

  // 🔥 SEU CÓDIGO ORIGINAL (mantido)
  createOrder(items: OrderItem[]): Order {

    const total = items.reduce((sum, i) => sum + i.subtotal, 0);

    const order: Order = {
      id: this.orders.length + 1,
      numero: Math.floor(Math.random() * 10000),
      dataHora: new Date(),
      valorTotal: total,
      status: 'CRIADO'
    };

    this.orders.push(order);

    return order;
  }
}