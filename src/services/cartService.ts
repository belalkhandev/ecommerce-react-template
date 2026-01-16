import api from './api';
import type { CartItem, OrderSummary } from '../types';

export interface Cart {
  items: CartItem[];
  summary: OrderSummary;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get<Cart>('/cart');
    return response.data;
  },

  async addToCart(data: AddToCartData): Promise<Cart> {
    const response = await api.post<Cart>('/cart', {
      product_id: data.productId,
      quantity: data.quantity,
      color: data.color,
      size: data.size,
    });
    return response.data;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const response = await api.put<Cart>(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    const response = await api.delete<Cart>(`/cart/${itemId}`);
    return response.data;
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },

  async applyCoupon(code: string): Promise<Cart & { discount: number; couponMessage: string }> {
    const response = await api.post<Cart & { discount: number; couponMessage: string }>('/cart/coupon', { code });
    return response.data;
  },

  async removeCoupon(): Promise<Cart> {
    const response = await api.delete<Cart>('/cart/coupon');
    return response.data;
  },

  async syncCart(items: CartItem[]): Promise<Cart> {
    const response = await api.post<Cart>('/cart/sync', { items });
    return response.data;
  },
};
