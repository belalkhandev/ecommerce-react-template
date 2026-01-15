/**
 * Product-related type definitions
 */

export type ProductBadge = 'hot' | 'sale' | 'new';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: ProductBadge;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  inStock?: boolean;
  description?: string;
  sku?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export type ProductFilterCategory = 'all' | string;

export interface ProductFilters {
  category?: ProductFilterCategory;
  priceRange?: [number, number];
  colors?: string[];
  inStock?: boolean;
  sortBy?: ProductSortOption;
}

export type ProductSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';
