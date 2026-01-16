import api from './api';
import type { WishlistItem } from '../types';

export interface Wishlist {
  items: WishlistItem[];
  total: number;
}

export const wishlistService = {
  async getWishlist(): Promise<Wishlist> {
    const response = await api.get<Wishlist>('/wishlist');
    return response.data;
  },

  async addToWishlist(productId: string): Promise<Wishlist> {
    const response = await api.post<Wishlist>('/wishlist', { product_id: productId });
    return response.data;
  },

  async removeFromWishlist(productId: string): Promise<Wishlist> {
    const response = await api.delete<Wishlist>(`/wishlist/${productId}`);
    return response.data;
  },

  async toggleWishlist(productId: string): Promise<{ inWishlist: boolean; wishlist: Wishlist }> {
    const response = await api.post<{ inWishlist: boolean; wishlist: Wishlist }>(`/wishlist/toggle/${productId}`);
    return response.data;
  },

  async clearWishlist(): Promise<void> {
    await api.delete('/wishlist');
  },

  async moveToCart(productId: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/wishlist/${productId}/move-to-cart`);
    return response.data;
  },

  async moveAllToCart(): Promise<{ message: string; itemsMoved: number }> {
    const response = await api.post<{ message: string; itemsMoved: number }>('/wishlist/move-all-to-cart');
    return response.data;
  },

  async shareWishlist(): Promise<{ shareUrl: string; shareCode: string }> {
    const response = await api.post<{ shareUrl: string; shareCode: string }>('/wishlist/share');
    return response.data;
  },

  async getSharedWishlist(shareCode: string): Promise<Wishlist> {
    const response = await api.get<Wishlist>(`/wishlist/shared/${shareCode}`);
    return response.data;
  },
};
