import api from './api';
import type { ShippingData, PaymentData } from '../types';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingData;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface CreateOrderData {
  shippingAddress: ShippingData;
  paymentMethod: string;
  paymentData?: PaymentData;
  shippingMethodId: string;
  notes?: string;
  couponCode?: string;
}

export interface PaginatedOrders {
  data: Order[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export const orderService = {
  async getOrders(page?: number): Promise<PaginatedOrders> {
    const response = await api.get<PaginatedOrders>('/orders', {
      params: { page },
    });
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await api.post<Order>('/orders', {
      shipping_address: data.shippingAddress,
      payment_method: data.paymentMethod,
      payment_data: data.paymentData,
      shipping_method_id: data.shippingMethodId,
      notes: data.notes,
      coupon_code: data.couponCode,
    });
    return response.data;
  },

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    const response = await api.post<Order>(`/orders/${id}/cancel`, { reason });
    return response.data;
  },

  async trackOrder(orderNumber: string): Promise<OrderTracking> {
    const response = await api.get<OrderTracking>(`/orders/track/${orderNumber}`);
    return response.data;
  },

  async reorder(orderId: string): Promise<{ cartId: string; itemsAdded: number }> {
    const response = await api.post<{ cartId: string; itemsAdded: number }>(`/orders/${orderId}/reorder`);
    return response.data;
  },

  async getInvoice(orderId: string): Promise<Blob> {
    const response = await api.get(`/orders/${orderId}/invoice`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export interface OrderTracking {
  orderNumber: string;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  timeline: OrderTrackingEvent[];
}

export interface OrderTrackingEvent {
  status: string;
  description: string;
  location?: string;
  timestamp: string;
  completed: boolean;
}
