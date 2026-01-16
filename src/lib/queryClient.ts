import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
  },
  products: {
    all: ['products'] as const,
    list: (params?: Record<string, unknown>) => ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    trending: ['products', 'trending'] as const,
    bestSellers: ['products', 'best-sellers'] as const,
    newArrivals: ['products', 'new-arrivals'] as const,
    related: (id: string) => ['products', 'related', id] as const,
    reviews: (id: string) => ['products', 'reviews', id] as const,
    search: (query: string) => ['products', 'search', query] as const,
  },
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', slug] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  wishlist: {
    all: ['wishlist'] as const,
    shared: (code: string) => ['wishlist', 'shared', code] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: (page?: number) => ['orders', 'list', page] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    track: (orderNumber: string) => ['orders', 'track', orderNumber] as const,
  },
  quotations: {
    all: ['quotations'] as const,
    list: (params?: Record<string, unknown>) => ['quotations', 'list', params] as const,
    detail: (id: string) => ['quotations', 'detail', id] as const,
  },
  addresses: {
    all: ['addresses'] as const,
    detail: (id: string) => ['addresses', 'detail', id] as const,
  },
} as const;
