import api from './api';
import type { Product, Category, ProductFilters } from '../types';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export interface ProductsParams {
  page?: number;
  perPage?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  inStock?: boolean;
  sortBy?: string;
  search?: string;
}

export const productService = {
  async getProducts(params?: ProductsParams): Promise<PaginatedResponse<Product>> {
    const response = await api.get<PaginatedResponse<Product>>('/products', {
      params: {
        page: params?.page,
        per_page: params?.perPage,
        category: params?.category,
        min_price: params?.minPrice,
        max_price: params?.maxPrice,
        colors: params?.colors?.join(','),
        in_stock: params?.inStock,
        sort_by: params?.sortBy,
        search: params?.search,
      },
    });
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  async getCategory(slug: string): Promise<Category> {
    const response = await api.get<Category>(`/categories/${slug}`);
    return response.data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/search', {
      params: { q: query },
    });
    return response.data;
  },

  async getTrendingProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/trending');
    return response.data;
  },

  async getBestSellers(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/best-sellers');
    return response.data;
  },

  async getNewArrivals(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/new-arrivals');
    return response.data;
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const response = await api.get<Product[]>(`/products/${productId}/related`);
    return response.data;
  },

  async getProductReviews(productId: string, page?: number): Promise<PaginatedResponse<ProductReview>> {
    const response = await api.get<PaginatedResponse<ProductReview>>(`/products/${productId}/reviews`, {
      params: { page },
    });
    return response.data;
  },

  async submitReview(productId: string, data: {
    rating: number;
    title: string;
    comment: string;
  }): Promise<ProductReview> {
    const response = await api.post<ProductReview>(`/products/${productId}/reviews`, data);
    return response.data;
  },
};

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
  verified: boolean;
}
